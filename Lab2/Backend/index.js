var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mysql = require('mysql');

var path=require('path');
var fs=require('fs');
var multer=require('multer');
var md5=require('md5');
var fs=require('fs');
const bcrypt = require('bcrypt');
var morgan = require('morgan');
var passport = require('passport');
var uuidv4 = require('uuid/v4');
var traveler = require('./models/traveler');
var listing = require('./models/property');
var booking = require('./models/booking');
var kafka = require('./kafka/client');
var question = require('./models/question');
var routes=require('./routes/login.js');
var profile_routes=require('./routes/profile.js');
var dashboard_routes=require('./routes/dashboard.js');

var property_routes=require('./routes/property.js');
var jwt = require('jsonwebtoken');
var maxSize=1000000*90;


// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});

//var {traveler} = require('./models/traveler');
var {mongoose} = require('./mongoose');

// Log requests to console
//app.use(morgan('dev'));

// Initialize passport for use
app.use(passport.initialize());


// Bring in defined Passport Strategy
require('./config/passport')(passport);





const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      console.log("req",req);
      
      const newFilename = md5(`${req.body.username}`) + `${path.extname(file.originalname)}`;
      
      cb(null, newFilename);
     
    },
  });

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database : "CMPE_273_Homeaway",
    port: '8889',

});

  const storageProperties = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './properties');
    },filename: (req, file, cb) => {
        console.log("req",req);
        
        const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
        
        cb(null, newFilename);
       
      }
    
  });

  const uploadProperties = multer({
    storage: storageProperties,
    limits: {
    fileSize: maxSize
    }
    });

  
  const upload = multer({
    storage: storage,
    limits: {
    fileSize: maxSize
    }
    });
//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());
app.use(session({
    secret: 'CMPEHomeaway273',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 10 * 60 * 1000
}));

app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
app.use(express.static(path.join(__dirname,'/properties')));
app.use(express.static(path.join(__dirname,'/uploads')));



 app.use(routes);
 app.use(profile_routes);
 app.use(property_routes);
 app.use(dashboard_routes);
//fetch properties for details view


//Profile Post
app.post('/addprofile',upload.single('photo'), function (req, res) {
    
   
    console.log("Inside Profile Request Handler");
//console.log(JSON.stringify(req.body));
console.log("Res : ",req.file);
console.log("Res 1: ",req.body);

if(req.file==undefined){
    

   req.body.profile_image="";

    kafka.make_request('add_traveler_profile',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })

            res.end("Login Unsuccessfull");
        }else{
            console.log("Inside else");
            console.log("Results",results);
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end('User successfully added');
            }
        
    });



}else{
    var profile_image=req.file.filename;
   
    req.body.profile_image=profile_image;
        // traveler.findOneAndUpdate({emailaddress:req.body.username,UserType:"traveler"},{$set:{firstName:req.body.firstname,lastName:req.body.lastname,aboutme:req.body.aboutme,citycountry:req.body.citycountry,country:req.body.country,school:req.body.school,hometown:req.body.hometown,languages:req.body.languages,gender:req.body.gender,profile_image:profile_image}},{new:true})
        // .then((doc)=>{
        //     res.writeHead(200, {
        //         'Content-Type': 'text/plain'
        //     })
        //     res.end('User successfully added');
        // }).catch((e)=>{
        //     res.writeHead(400, {
        //         'Content-Type': 'text/plain'
        //     })
    
        //     res.end("Error");
        // })


        kafka.make_request('add_traveler_profile',req.body, function(err,results){
            console.log('in result');
            console.log(results);
            if (err){
                console.log("Inside err");
                res.writeHead(400, {
                    'Content-Type': 'text/plain'
                })
    
                res.end("Login Unsuccessfull");
            }else{
                console.log("Inside else");
                console.log("Results",results);
                
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                })
                res.end('User successfully added');
                }
            
        });



}
    
});







//Profile Post for owner
app.post('/addprofileowner',upload.single('photo'), function (req, res) {
    
   
console.log("Inside Owner Profile Request Handler");
//console.log(JSON.stringify(req.body));
console.log("Res : ",res.file);
console.log("Res 1: ",req.body);
if(req.file==undefined){
    // traveler.findOneAndUpdate({emailaddress:req.body.username,UserType:"owner"},{$set:{firstName:req.body.firstname,lastName:req.body.lastname,aboutme:req.body.aboutme,citycountry:req.body.citycountry,company:req.body.company,school:req.body.school,hometown:req.body.hometown,languages:req.body.languages,gender:req.body.gender}},{new:true})
    // .then((doc)=>{
    //     console.log("update doc",doc);
    //     res.writeHead(200, {
    //         'Content-Type': 'text/plain'
    //     })
    //     res.end('User successfully added');
    // }).catch((e)=>{
    //     res.writeHead(400, {
    //         'Content-Type': 'text/plain'
    //     })

    //     res.end("Error");
    // })


    req.body.profile_image="";

    kafka.make_request('add_owner_profile',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })

            res.end("Login Unsuccessfull");
        }else{
            console.log("Inside else");
            console.log("Results",results);
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end('User successfully added');
            }
        
    });

}else{
    var profile_image=req.file.filename;
    req.body.profile_image=profile_image;

        // traveler.findOneAndUpdate({emailaddress:req.body.username,UserType:"owner"},{$set:{firstName:req.body.firstname,lastName:req.body.lastname,aboutme:req.body.aboutme,citycountry:req.body.citycountry,country:req.body.country,school:req.body.school,hometown:req.body.hometown,languages:req.body.languages,gender:req.body.gender,profile_image:profile_image}},{new:true})
        // .then((doc)=>{
        //     res.writeHead(200, {
        //         'Content-Type': 'text/plain'
        //     })
        //     res.end('User successfully added');
        // }).catch((e)=>{
        //     res.writeHead(400, {
        //         'Content-Type': 'text/plain'
        //     })
    
        //     res.end("Error");
        // })


        kafka.make_request('add_owner_profile',req.body, function(err,results){
            console.log('in result');
            console.log(results);
            if (err){
                console.log("Inside err");
                res.writeHead(400, {
                    'Content-Type': 'text/plain'
                })
    
                res.end("Login Unsuccessfull");
            }else{
                console.log("Inside else");
                console.log("Results",results);
                
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                })
                res.end('User successfully added');
                }
            
        });

}


    });








//Post Property



app.post('/postproperty',uploadProperties.array('photos'),function (req, res) {
    console.log("Inside Post Property Request Handler");
    console.log(JSON.stringify(req.body));
    console.log("Bedrooms",req.body.bedrooms);
    var emailaddress = req.body.username;
    console.log("emailadd",req.body.username);

    console.log(req.body.photos);
    console.log("File saved as ", req.files);
    var fileNames="";
    for (var i=0;i<req.files.length ;i++){
        fileNames+=req.files[i].filename + "*";
    }
    //console.log("All Files",fileNames);
    //req.body.start = null;
    //req.body.end = null;

    //var str = "select * from owner_login_data where emailaddress= " + mysql.escape(emailaddress);
    var sql = "INSERT INTO property_details VALUES ( " +
        mysql.escape(null) + " ," +
        mysql.escape(req.body.address) + " , " + mysql.escape(req.body.headline) + " , " +
        mysql.escape(req.body.publicinfo) + ", " + mysql.escape(req.body.propertytype) + " , " + mysql.escape(req.body.bedrooms) + ", " + mysql.escape(req.body.accomodates) + ", " + mysql.escape(req.body.bathrooms) + ", " + mysql.escape(req.body.start) + ", " + mysql.escape(req.body.end) + ", " + mysql.escape(req.body.currency) + ", " + mysql.escape(req.body.rate) + ", " + mysql.escape(req.body.nights) + ", " + mysql.escape(req.body.username) + ", " + mysql.escape(fileNames) + ") ";


        // let start=new Date(req.body.start);
        // let end=new Date(req.body.end);

        
        // let accomodates=Number(req.body.accomodates);
       
        // var prop=new listing({
           
        //     address:req.body.address,
        //     headline:req.body.headline,
        //     publicinfo:req.body.publicinfo,
        //     propertytype:req.body.propertytype,
        //     bedrooms:req.body.bedrooms,
        //     accomodates:accomodates,
        //    bathrooms:req.body.bathrooms,
        //     start:start,
        //     end:end,
        //     currency:req.body.currency,
        //     rate:req.body.rate,
        //     nights:req.body.nights,
        //     username:req.body.username,
        //     fileNames:fileNames

        // })
    
        // prop.save().then((doc)=>{
        //     console.log("Prop",doc);
        //     res.writeHead(200, {
        //         'Content-Type': 'text/plain'})
        //          res.end('User successfully added');
        // },(e)=>{
        //     res.writeHead(400, {
        //         'Content-Type': 'text/plain'})
        //         res.end("Unabele to save property");
        // })
     // })

     req.body.fileNames=fileNames;
     kafka.make_request('post_property',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })

            res.end("Unable to save property");
        }else{
            console.log("Inside else");
            console.log("Results",results);
            
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end('Property added successfully');
            }
        
    });



    })
//Profile Post for owner
app.post('/postquestion', function (req, res) {
    
   
    console.log("Inside Post Question Request Handler");
//console.log(JSON.stringify(req.body));

console.log("Res 1: ",req.body);

var q=new question({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    emailaddress:req.body.emailaddress,
    message:req.body.message,
    owner:req.body.owner,
    contactno:req.body.contactno,
    reply:""

   
    

})

q.save().then((doc)=>{
    
console.log("ques",doc);
res.writeHead(200, {
    'Content-Type': 'text/plain'
})
res.end("Message sent to owner");
}).catch((e)=>{
    res.writeHead(400, {
        'Content-Type': 'text/plain'
    })
    res.end("Error in sending message");
})

});




app.get('/getownermessages', function (req, res) {
    
   
    console.log("Inside Post Question Request Handler");
//console.log(JSON.stringify(req.body));

console.log("Res 1: ",req.body);
var owner=req.query.owner;


question.find({owner:owner}).then((doc)=>{
    
console.log("ques",doc);
res.writeHead(200, {
    'Content-Type': 'application/json'
})
res.end(JSON.stringify(doc));
}).catch((e)=>{
    res.writeHead(400, {
        'Content-Type': 'text/plain'
    })
    res.end("Error in sending message");
})

});



app.post('/replytomessage', function (req, res) {
    
   
    console.log("Inside Post Question Request Handler");
//console.log(JSON.stringify(req.body));

console.log("Res 1: ",req.body);


question.findOneAndUpdate({_id:req.body.message_id},{$set:{reply:req.body.reply}},{new:true})
    .then((doc)=>{
        console.log("update doc",doc);

res.writeHead(200, {
    'Content-Type': 'text/plain'
})
res.end("Message sent to owner");
}).catch((e)=>{
    res.writeHead(400, {
        'Content-Type': 'text/plain'
    })
    res.end("Error in sending message");
})

});



app.get('/gettravelermessages', function (req, res) {
    
   
    console.log("Inside get owner replies");
//console.log(JSON.stringify(req.body));

console.log("Res 1: ",req.body);
var traveler=req.query.emailaddress;


question.find({emailaddress:traveler}).then((doc)=>{
    
console.log("ques",doc);
res.writeHead(200, {
    'Content-Type': 'application/json'
})
res.end(JSON.stringify(doc));
}).catch((e)=>{
    res.writeHead(400, {
        'Content-Type': 'text/plain'
    })
    res.end("Error in retrieving messages");
})

});


    app.listen(3001);
    console.log("Server Listening on port 3001");

