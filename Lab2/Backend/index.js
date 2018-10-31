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


// //Route to handle Post Request Call
// app.post('/travelerlogin', function (req, res) {

//     console.log("Inside Login Post Request");
//     var emailaddress = req.body.emailaddress;
//     console.log(req.body.emailaddress);

//     var password = req.body.password;
    

//     //Kafka request

//     kafka.make_request('traveler_login',req.body, function(err,results){
//         console.log('in result');
//         console.log(results);
//         if (err){
//             console.log("Inside err");
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })

//             res.end("Login Unsuccessfull");
//         }else{
//             console.log("Inside else");
//             console.log("Results",results);
//             res.writeHead(200, {
//                 'Content-Type': 'application/json'
//             })
//             res.end(JSON.stringify(results));
//             }
        
//     });
// });

 app.use(routes);
 app.use(profile_routes);
 app.use(property_routes);
 app.use(dashboard_routes);
//fetch properties for details view


// app.get('/fetchproperties', function (req, res) {
//     //console.log("in fetch");
//     //console.log(req.body);
//     //console.log(typeof(req.body.location));

// var obj={
//     start:req.query.start,
//     end:req.query.end,
//     accomodates:req.query.guests,
//     location:req.query.location
// }

//     var sql = "SELECT * FROM property_details WHERE accomodates >= " +
//         mysql.escape(req.query.guests) + " AND start <=" +
//         mysql.escape(req.query.start) + " AND end >=" +
//         mysql.escape(req.query.end) + "AND address LIKE " + mysql.escape("%" + req.query.location + "%"); //"'%San Carlos%'";
   


//     // listing.find({accomodates:{$gte:req.query.guests},start:{$lte:req.query.start},end:{$gte:req.query.end},address: { $regex: '.*' + req.query.location + '.*' ,$options:'i'}})
//     // .then((doc)=>{

//     //     let temp = JSON.stringify(doc);
//     //     temp=JSON.parse(temp);
        
//     //     var imgs = [];
//     //     for (var i = 0; i < temp.length; i++) {

//     //         if (temp[i].fileNames != "") {
//     //             let propimg = temp[i].fileNames.split('*');
//     //             propimg.pop();
//     //             let filN = propimg[0];
//     //             imgs.push(propimg);
//     //             temp[i].imageName = filN;
//     //         }
//     //     }
//     //     console.log("ssd",temp);
//     //     res.writeHead(200, {
//     //         'Content-Type': 'application/json'
//     //     })
//     //     res.end(JSON.stringify(temp));
//     // }).catch((e)=>{
//     //     res.writeHead(400, {
//     //         'Content-Type': 'text/plain'
//     //     })
//     //     res.end("Error while fetching properties");
//     // })


//     kafka.make_request('search_properties',obj, function(err,results){
//         console.log('in result');
//         console.log(results);
//         if (err){
//             console.log("Inside err");
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })

//             res.end("Error while fetching properties");
//         }else{
//             console.log("Inside else");
//             console.log("Results",results);
//             res.writeHead(200, {
//                 'Content-Type': 'application/json'
//             })
//             res.end(JSON.stringify(results));
//             }
        
//     });

// })




// //fetch properties for trips
// app.get('/mytrips', function(req,res){
//     console.log("in fetch trips");
//     console.log(req.query.username);
//     var username=req.query.username;
//     var sql = "SELECT * FROM booking WHERE username = " +
//     mysql.escape(username); 

// booking.find({traveler:username}).then((docs)=>{
//     console.log("bookings",docs);
//     let temp=JSON.stringify(docs);
//     temp=JSON.parse(temp);
//     if(temp.length!=0){

//         var ids=[];

//                     for(var i=0;i<temp.length;i++){
//                         ids.push(temp[i].property_id);
//                     }
//                     console.log("temp",temp);
        
//                     console.log('ids',ids);

//                     listing.find({"_id":{$in:ids}})
//                     .then((props)=>{
//                         let temp1=JSON.stringify(props);
//                         temp1=JSON.parse(temp1);
//                        // console.log("Properties",temp1)
//                         for (var i = 0; i < temp.length; i++) {
//                             for (var j = 0; j < temp1.length; j++) {
//                                 if (temp[i].property_id == temp1[j]._id) {
//                                     temp[i].headline = temp1[j].headline;
//                                     temp[i].guests = temp1[j].guests;
//                                     temp[i].currency = temp1[j].currency;
//                                     temp[i].rate = temp1[j].rate;
//                                     temp[i].imageName = temp1[j].fileNames.split('*')[1]
//                                     break;
//                                 }

//                             }

//                         }
//                         console.log("Final",temp);

//                         res.writeHead(200, {
//                             'Content-Type': 'application/json'
//                         })
//                         res.end(JSON.stringify(temp));

//                     }).catch((e)=>{
                        
//                                                 res.writeHead(400,{
//                                                     'Content-Type' : 'text/plain'
//                                                 })
//                                                 res.end("Error while retrieving Book Details");
//                     })

//     }


// }).catch((error)=>{
//     res.writeHead(400,{
//         'Content-Type' : 'text/plain'
//     })
//     res.end("Error while retrieving Booking Details");
// })






// var obj={
//     username:username
// }

// kafka.make_request('my_trips',obj, function(err,results){
//     console.log('in result');
//     console.log(results);
//     if (err){
//         console.log("Inside err");
//         res.writeHead(400, {
//             'Content-Type': 'text/plain'
//         })

//         res.end("Error while fetching trips");
//     }else{
//         console.log("Inside else");
//         console.log("Results",results);
//         res.writeHead(200, {
//             'Content-Type': 'application/json'
//         })
//         res.end(JSON.stringify(results));
//         }
    
// });

// })






//fetch owner properties


// app.get('/ownerproperties', function(req,res){
//     console.log("in fetch owner properties");
//     var owner=req.query.username;

//     var sql = "SELECT * FROM property_details WHERE username = " +
//     mysql.escape(owner);
    // listing.find({username:owner})
    // .then((doc)=>{

    //     let temp = JSON.stringify(doc);
    //     temp=JSON.parse(temp);
        
    //     var imgs = [];
    //     for (var i = 0; i < temp.length; i++) {

    //         if (temp[i].fileNames != "") {
    //             let propimg = temp[i].fileNames.split('*');
    //             propimg.pop();
    //             let filN = propimg[0];
    //             imgs.push(propimg);
    //             temp[i].imageName = filN;
    //         }
    //     }
    //     console.log("ssd",temp);
    //     res.writeHead(200, {
    //         'Content-Type': 'application/json'
    //     })
    //     res.end(JSON.stringify(temp));
    // }).catch((e)=>{
    //     res.writeHead(400, {
    //         'Content-Type': 'text/plain'
    //     })
    //     res.end("Error while fetching properties");
    // })


// var obj={
//     username:owner
// }
// kafka.make_request('my_properties',obj, function(err,results){
//     console.log('in result');
//     console.log(results);
//     if (err){
//         console.log("Inside err");
//         res.writeHead(400, {
//             'Content-Type': 'text/plain'
//         })

//         res.end("Error while fetching trips");
//     }else{
//         console.log("Inside else");
//         console.log("Results",results);
//         res.writeHead(200, {
//             'Content-Type': 'application/json'
//         })
//         res.end(JSON.stringify(results));
//         }
    
// });
// })







//get one property for specific property id for details view


//fetch properties for details view



//get listing---old


// app.get('/getlisting', function(req,res){
//     console.log("in get listing");
//     console.log("cbcb",req.query.property_id);
//     var id=req.query.property_id;

//     var obj={
//         id:id
//     }
    //console.log(typeof(req.body.location));

    
    
//     var sql = "SELECT * FROM property_details WHERE property_id = " +
//     mysql.escape(req.query.property_id); 
//     pool.getConnection(function (err, con) {
//         if (err) {
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         } else {
//     con.query(sql,function(err,result){
//         console.log(sql);
       
//         if(err){
            // res.writeHead(400,{
            //     'Content-Type' : 'text/plain'
            // })
            // res.end("Error while retrieving Book Details");
//         }else{
//             //console.log(result);
//             let temp = JSON.stringify(result[0]);

//             temp = JSON.parse(temp);
        
//             var images=temp.images;
// var finalim="";
//             for(var i=0;i<images.length-1;i++){
// finalim+=images[i];
//             }
// temp.images=finalim;
//             res.writeHead(200,{
//                 'Content-Type' : 'application/json'
//             })
//             res.end(JSON.stringify(temp));
//         }
//     });
// }
    
// // })

// listing.findById(id).then((doc)=>{
//     console.log("Listing",doc);


//     let temp = JSON.stringify(doc);

//     temp = JSON.parse(temp);

//     var images=temp.fileNames;
// var finalim="";
//     for(var i=0;i<images.length-1;i++){
// finalim+=images[i];
//     }
// temp.images=finalim;
//     res.writeHead(200,{
//         'Content-Type' : 'application/json'
//     })
//     res.end(JSON.stringify(temp));


// }).catch((e)=>{
//     res.writeHead(400,{
//         'Content-Type' : 'text/plain'
//     })
//     res.end("Error while retrieving Book Details");
// })




// kafka.make_request('details_view',obj, function(err,results){
//     console.log('in result');
//     console.log(results);
//     if (err){
//         console.log("Inside err");
//         res.writeHead(400, {
//             'Content-Type': 'text/plain'
//         })

//         res.end("Login Unsuccessfull");
//     }else{
//         console.log("Inside else");
//         console.log("Results",results);
//         res.writeHead(200, {
//             'Content-Type': 'application/json'
//         })
//         res.end(JSON.stringify(results));
//         }
    
// });


// })










// //Route to handle Post Request Call
// app.post('/ownerlogin', function (req, res) {

//     console.log("Inside Owner Login Post Request");
//     var emailaddress = req.body.emailaddress;
//     var password = req.body.password;
//     var sql = "SELECT *  FROM owner_login_data WHERE emailaddress = " +
//         mysql.escape(emailaddress);



//    // traveler.findOne({ emailaddress: req.body.emailaddress,UserType:"owner" })

//         // .then((user) => {
//         //     console.log("user data from db",user );
//         //     if (user) {
//         //         user.comparePassword(req.body.password, function(err, isMatch) {

//         //             if (isMatch && !err) {
//         //             res.cookie('owner', user.emailaddress, { maxAge: 9000000, httpOnly: false, path: '/' });
//         //             var token = jwt.sign(user.toJSON(),"CMPE_273_Homeaway_secret", {
//         //                 expiresIn: 10080 // in seconds
//         //             });
//         //             //response.status(200).json({success: true, token: 'JWT ' + token});
//         //             console.log(res.cookie);
//         //             req.session.user = user.emailaddress;
//         //             console.log("Session", req.session.user);
//         //             res.writeHead(200, {
//         //                 'Content-Type': 'application/json'
//         //             })
//         //             var auth={
//         //                 username:user.emailaddress,
//         //             token:token
//         //             }

//         //             res.end(JSON.stringify(auth));
//         //         }else {
                    
//         //                 res.writeHead(400, {
//         //                     'Content-Type': 'text/plain'
//         //                 })

//         //                 res.end("Login Unsuccessfull");
                    
//         //         }
//         //         } );
//         //     } else{
//         //         res.writeHead(400, {
//         //             'Content-Type': 'text/plain'
//         //         })

//         //         res.end("Login Unsuccessfull");
//         //     }
//         // })



//     kafka.make_request('owner_login',req.body, function(err,results){
//         console.log('in result');
//         console.log(results);
//         if (err){
//             console.log("Inside err");
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })

//             res.end("Login Unsuccessfull");
//         }else{
//             console.log("Inside else");
//             console.log("Results",results);
//             res.writeHead(200, {
//                 'Content-Type': 'application/json'
//             })
//             res.end(JSON.stringify(results));
//             }
        
//     });

// });












// app.get('/gettravelerprofile',function (req, res) {

//     console.log("Inside Traveler Profile Get Request");
//     var emailaddress=req.query.emailaddress;
//     console.log("Email",emailaddress);
//     var sql = "SELECT *  FROM traveler_login_data WHERE emailaddress = " +
//         mysql.escape(emailaddress);


//         const testFolder = path.join(__dirname,'/uploads');

          

//     // pool.getConnection(function (err, con) {
//     //     if (err) {
//     //         res.writeHead(400, {
//     //             'Content-Type': 'text/plain'
//     //         })
//     //         res.end("Could Not Get Connection Object");
//     //     } else {
//     //         con.query(sql, function (err, result) {
//     //             console.log("req is", JSON.stringify(req.body));
//     //             console.log(result);
//     //             if (err || result.length == 0) {
//     //                 res.writeHead(400, {
//     //                     'Content-Type': 'text/plain'
//     //                 })
//     //                 res.end("Incorrect emailaddress");
//     //             } else {
//     //                 let temp = JSON.stringify(result[0]);

//     //                 temp = JSON.parse(temp);

//     //                 console.log("temp",temp);
//     //                 var data={
//     //                     firstname :temp.firstname,
//     //                     lastname :temp.lastname,
//     //                     aboutme:temp.aboutme,
//     //                     citycountry:temp.citycountry,
//     //                     company:temp.company,
//     //                     school:temp.school,
//     //   hometown:temp.school,
//     //   languages:temp.languages,
//     //   gender:temp.gender,
      
                        
//     //                 }
//     //                 if(temp.profile_image!=null){
//     //                 data.photo=new Buffer(fs.readFileSync(path.join(__dirname + '/uploads',temp.profile_image))).toString('base64');
//     //                 }
//     //                  res.writeHead(200, {
//     //                     'Content-Type': 'application/json'
//     //                 })

//     //                 res.end(JSON.stringify(data));

//     //             }
//     //         });
//     //     }
//     // });
//   var obj={
//       emailaddress:emailaddress
//   }

//     // traveler.findOne({emailaddress:emailaddress,UserType:"traveler"}).then((doc)=>{
//     //     console.log("Find",doc);

//     //     var data={
//     //                           firstname :doc.firstName,
//     //                            lastname :doc.lastName,
//     //                             aboutme:doc.aboutme,
//     //                             citycountry:doc.citycountry,
//     //                             company:doc.company,
//     //                             school:doc.school,
//     //            hometown:doc.hometown,
//     //            languages:doc.languages,
//     //            gender:doc.gender,
              
                                
//     //                         }
                            
//     //                         if(doc.profile_image!=""){
//     //                                           data.photo=new Buffer(fs.readFileSync(path.join(__dirname + '/uploads',doc.profile_image))).toString('base64');
//     //                                            }

                                               
//     //                                             res.writeHead(200, {
//     //                                                 'Content-Type': 'application/json'
//     //                            })
//     //                            res.end(JSON.stringify(data));

//     // }).catch((e)=>{
//     //     console.log("in catch");
//     //     res.writeHead(400, {
//     //                         'Content-Type': 'text/plain'
//     //                      })
//     //                          res.end("Incorrect emailaddress");
//     // })



//     kafka.make_request('get_traveler_profile',obj, function(err,results){
//         console.log('in result');
//         console.log(results);
//         if (err){
//             console.log("Inside err");
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })

//             res.end("Login Unsuccessfull");
//         }else{
//             console.log("Inside else");
//             console.log("Results",results);
//             if(results.image_find!=""){
//             var image=new Buffer(fs.readFileSync(path.join(__dirname + '/uploads',results.image_find))).toString('base64');
//             results.photo=image;
//             }
//             res.writeHead(200, {
//                 'Content-Type': 'application/json'
//             })
//             res.end(JSON.stringify(results));
//             }
        
//     });




// });

//Get Profile photo




// app.get('/getownerprofile', function (req, res) {

//     console.log("Inside Traveler Profile Get Request");
//     var emailaddress = req.query.username;
//     console.log(emailaddress);
//     var sql = "SELECT *  FROM owner_login_data WHERE emailaddress = " +
//         mysql.escape(emailaddress);


//     const testFolder = path.join(__dirname, '/uploads');


//     // traveler.findOne({ emailaddress: emailaddress, UserType: "owner" }).then((doc) => {
//     //     console.log("Find", doc);

//     //     var data = {
//     //         firstname: doc.firstName,
//     //         lastname: doc.lastName,
//     //         aboutme: doc.aboutme,
//     //         citycountry: doc.citycountry,
//     //         company: doc.company,
//     //         school: doc.school,
//     //         hometown: doc.hometown,
//     //         languages: doc.languages,
//     //         gender: doc.gender,


//     //     }

//     //     if (doc.profile_image) {
//     //         data.photo = new Buffer(fs.readFileSync(path.join(__dirname + '/uploads', doc.profile_image))).toString('base64');
//     //     }
//     //     res.writeHead(200, {
//     //         'Content-Type': 'application/json'
//     //     })
//     //     res.end(JSON.stringify(data));

//     // }).catch((e) => {
//     //     res.writeHead(400, {
//     //         'Content-Type': 'text/plain'
//     //     })
//     //     res.end("Incorrect emailaddress");
//     // })
//     var obj={
//         emailaddress:emailaddress
//     }

//     kafka.make_request('get_owner_profile',obj, function(err,results){
//         console.log('in result');
//         console.log(results);
//         if (err){
//             console.log("Inside err");
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })

//             res.end("Login Unsuccessfull");
//         }else{
//             console.log("Inside else");
//             console.log("Results",results);
//             if(results.image_find!=""){
//             var image=new Buffer(fs.readFileSync(path.join(__dirname + '/uploads',results.image_find))).toString('base64');
//             results.photo=image;
//             }
//             res.writeHead(200, {
//                 'Content-Type': 'application/json'
//             })
//             res.end(JSON.stringify(results));
//             }
        
//     });


// });

// //Get Profile photo










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


            


// //Traveler Sign Up
//     app.post('/signup', function (req, res) {
//         console.log("Inside Sign Up Request Handler");
//         console.log(req.body)
//         var emailaddress = req.body.emailaddress;
//         console.log(req.body.firstName);
//        // bcrypt.hash(req.body.password, 10, function(err, hash) {
//             // Store hash in database
            
//             // var str = "select * from traveler_login_data where emailaddress= " + mysql.escape(emailaddress);
//             // var sql = "INSERT INTO traveler_login_data VALUES ( " +
//             //     mysql.escape(null) + " ," +
//             //     mysql.escape(req.body.firstName) + " , " + mysql.escape(req.body.lastName) + " , " +
//             //     mysql.escape(req.body.emailaddress) + ", " + mysql.escape(hash) + " , " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") +") ";
    
//             // pool.getConnection(function (err, con) {
//             //     if (err) {
//             //         res.writeHead(400, {
    
//             //             'Content-Type': 'text/plain'
//             //         })
    
//             //         res.end("Could Not Get Connection Object");
//             //         console.log("got1");
//             //     }
//             //     else {
    
//             //         con.query(str, function (err, result) {
//             //             if (err || result.length === 1) {
    
//             //                 res.writeHead(201, {
//             //                     'Content-Type': 'text/plain'
//             //                 })
//             //                 res.end("User with this email address already exist");
    
//             //             } else {
    
//             //                 con.query(sql, function (err, result) {
    
//             //                     if (err) {
//             //                         console.log("got");
//             //                         res.writeHead(400, {
//             //                             'Content-Type': 'text/plain'
//             //                         })
    
//             //                         res.end("Error");
//             //                     } else {
//             //                         console.log("else");
//             //                         res.writeHead(200, {
//             //                             'Content-Type': 'text/plain'
//             //                         })
//             //                         res.end('User successfully added');
//             //                     }
//             //                 });
//             //             }
//             //         });
    
//             //     }
//             // });
//             // traveler.find({emailaddress:emailaddress,"UserType":"traveler"}).then((doc)=>{
//             //     console.log(doc);
//             //     if(doc.length!=0){
//             //         res.writeHead(400, {
//             //             'Content-Type': 'text/plain'})
//             //             res.end("User already exists");
//             //     }else{
//             //         var trav=new traveler({
//             //             UserType:'traveler',
//             //             firstName:req.body.firstName,
//             //             lastName:req.body.lastName,
//             //             emailaddress:req.body.emailaddress,
//             //             password:req.body.password,
//             //             aboutme:"",
//             //             citycountry:"",
//             //             company:"",
//             //             school:"",
//             //             hometown:"",
//             //             languages:"",
//             //             gender:"",
//             //             profile_image:""
        
//             //         })
                
//             //         trav.save().then((doc)=>{
//             //             res.writeHead(200, {
//             //                 'Content-Type': 'text/plain'})
//             //                  res.end('User successfully added');
//             //         },(e)=>{
//             //             res.writeHead(400, {
//             //                 'Content-Type': 'text/plain'})
//             //                 res.end("User already exists");
//             //         })
//             //     }
                
//             // }).catch((e)=>{
//             //     res.writeHead(400, {
//             //         'Content-Type': 'text/plain'})
//             //         res.end("User already exists");
//             //  // })
//             // })



//         kafka.make_request('traveler_sign_up',req.body, function(err,results){
//             console.log('in result');
//             console.log(results);
//             if (err){
//                 console.log("Inside err");
//                 res.writeHead(400, {
//                     'Content-Type': 'text/plain'
//                 })
    
//                 res.end("User already exists");
//             }else{
//                 console.log("Inside else");
//                 console.log("Results",results);
                
//                 res.writeHead(200, {
//                     'Content-Type': 'text/plain'
//                 })
//                 res.end('User successfully added');
//                 }
            
//         });
        
       
//     });




// //Owner Sign Up
// app.post('/ownersignup', function (req, res) {
//     console.log("Inside Owner Sign Up Request Handler");
//     console.log(req.body);
//     var emailaddress = req.body.emailaddress;
//     console.log(req.body.firstName);
//     //bcrypt.hash(req.body.password, 10, function(err, hash) {
//         // Store hash in database
        
//         // var str = "select * from owner_login_data where emailaddress= " + mysql.escape(emailaddress);
//         // var sql = "INSERT INTO owner_login_data VALUES ( " +
//         //     mysql.escape(null) + " ," +
//         //     mysql.escape(req.body.firstName) + " , " + mysql.escape(req.body.lastName) + " , " +
//         //     mysql.escape(req.body.emailaddress) + ", " + mysql.escape(hash) + " , " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") +") ";

//         // pool.getConnection(function (err, con) {
//         //     if (err) {
//         //         res.writeHead(400, {

//         //             'Content-Type': 'text/plain'
//         //         })

//         //         res.end("Could Not Get Connection Object");
//         //         console.log("got1");
//         //     }
//         //     else {

//         //         con.query(str, function (err, result) {
//         //             if (err || result.length === 1) {

//         //                 res.writeHead(201, {
//         //                     'Content-Type': 'text/plain'
//         //                 })
//         //                 res.end("User with this email address already exist");

//         //             } else {

//         //                 con.query(sql, function (err, result) {
//         //                     console.log(sql);

//         //                     if (err) {
//         //                         console.log("got");
//         //                         res.writeHead(400, {
//         //                             'Content-Type': 'text/plain'
//         //                         })

//         //                         res.end("Error");
//         //                     } else {
//         //                         console.log("else");
//         //                         res.writeHead(200, {
//         //                             'Content-Type': 'text/plain'
//         //                         })
//         //                         res.end('User successfully added');
//         //                     }
//         //                 });
//         //             }
//         //         });

//         //     }
//         // });
//         // var trav=new traveler({
//         //     UserType:'owner',
//         //     firstName:req.body.firstName,
//         //     lastName:req.body.lastName,
//         //     emailaddress:req.body.emailaddress,
//         //     password:req.body.password,
//         //     aboutme:"",
//         //     citycountry:"",
//         //     company:"",
//         //     school:"",
//         //     hometown:"",
//         //     languages:"",
//         //     gender:"",
//         //     profile_image:""

//         // })
    
//         // trav.save().then((doc)=>{
//         //     res.writeHead(200, {
//         //         'Content-Type': 'text/plain'})
//         //          res.end('User successfully added');
//         // },(e)=>{
//         //     res.writeHead(400, {
//         //         'Content-Type': 'text/plain'})
//         //         res.end("Error");
//         // })
    

//       //});

//       kafka.make_request('owner_sign_up',req.body, function(err,results){
//         console.log('in result');
//         console.log(results);
//         if (err){
//             console.log("Inside err");
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })

//             res.end("User already exists");
//         }else{
//             console.log("Inside else");
//             console.log("Results",results);
            
//             res.writeHead(200, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end('User successfully added');
//             }
        
//     });
    
   
// });


//Book Property

    // app.post('/bookproperty', function (req, res) {
    //     console.log("Inside Booking Request Handler");
    //     var emailaddress = req.body.username;
    //     console.log(req.body.property_id);
    //     var available= "select * from property_details where property_id= " + mysql.escape(req.body.property_id);
    //     // var str = "select * from booking where property_id= " + mysql.escape(req.body.property_id);
        // var sql = "INSERT INTO booking VALUES ( " +
        //     mysql.escape(null) + " ," +
        //     mysql.escape(req.body.property_id) + " , " + mysql.escape(req.body.start) + " , " +
        //     mysql.escape(req.body.end) + ", " + mysql.escape(req.body.guests) + " , " + mysql.escape(req.body.username) + ") ";

        //console.log("Data to book",req.body);


//         pool.getConnection(function (err, con) {
//             if (err) {
//                 res.writeHead(400, {

//                     'Content-Type': 'text/plain'
//                 })

//                 res.end("Could Not Get Connection Object");
//                 console.log("got1");
//             }
//             else{
                
//                 con.query(available, function (err, result) {
//                     if (err) {

//                         res.writeHead(400, {
//                             'Content-Type': 'text/plain'
//                         })
//                         res.end("DB error");

//                     }
            
//             else {
                
//                let temp3=JSON.stringify(result);
//                 temp3=JSON.parse(temp3);
// console.log("temp3",temp3);
//                 var st=new Date(temp3[0].start);
//                 var en= new Date(temp3[0].end);
//                 console.log("start",st);
//                 console.log("end",en);
               
//                  con.query(str, function (err, result) {
//                     if (err) {

//                         res.writeHead(400, {
//                             'Content-Type': 'text/plain'
//                         })
//                         res.end("DB error");

//                     } else {
//                         let temp=JSON.stringify(result);
//                         temp=JSON.parse(temp);
//                         console.log("booking data",temp);
//                         console.log("req start",req.body);
//                         var invalid=false;
//                         var collision=false;
//                         let startDate = new Date(req.body.start);
//                         let endDate = new Date(req.body.end);
//                         console.log("enddate",endDate);
//                         console.log("startdate",startDate);
//                         if(startDate<st || endDate>en){
//                             console.log("in invalid");
//                             invalid=true;
//                         }
//                         for(var i=0;i<temp.length;i++){
//                             let tempStartDate = new Date(temp[i].start);
//                             let tempEndDate = new Date(temp[i].end);
                            
//                             if(invalid==false){
//                                 if((startDate >= tempStartDate && endDate <= tempEndDate)||(startDate >= tempStartDate && endDate <= tempEndDate)||(startDate <= tempStartDate && endDate >= tempEndDate)){
//                                     console.log("Collision");
//                                     collision=true;
                                    
//                                     break;
//                             }
//                         }
//                         }
//                         if(collision==true){
                            
                            // res.writeHead(201, {
                            //     'Content-Type': 'text/plain'
                            // })
                            // res.end("Booking Collision");
//                         }else if(invalid==true){
                            // res.writeHead(202, {
                            //     'Content-Type': 'text/plain'
                            // })
                            // res.end("Booking Collision");

//                         }else{
//                         con.query(sql, function (err, result) {

//                             if (err) {
//                                 console.log("got");
//                                 res.writeHead(400, {
//                                     'Content-Type': 'text/plain'
//                                 })

//                                 res.end("Error");
//                             } else {
//                                 console.log("else");
                                // res.writeHead(200, {
                                //     'Content-Type': 'text/plain'
                                // })
                                // res.end('Booking successfully completed');
//                             }
//                         })};
//                     }
//                 });

//             }
//         })
//         };
//     })


    //   var booking_start=new Date(req.body.start);
    //   var booking_end=new Date(req.body.end);
    //   var prop_start=new Date(req.body.prop_start);
    //   var prop_end=new Date(req.body.prop_end);

    //   console.log(booking_start);
    //   if((booking_start < req.body.prop_start )|| (booking_end > req.body.prop_end)){
    //     res.writeHead(202, {
    //         'Content-Type': 'text/plain'
    //     })
    //     res.end("Booking Collision");
    //   }else{
    //       console.log("else");
    //       var id=req.body.property_id;
    //       booking.find({property_id:id}).then((docs)=>{
    //           let temp=JSON.stringify(docs);
    //           temp=JSON.parse(temp);
    //           console.log("temp",temp);
    //           if(temp.length!=0){
    //           for(var i=0;i<temp.length;i++){
    //             let tempStartDate = new Date(temp[i].start);
    //             let tempEndDate=new Date(temp[i].end);
    //             console.log(typeof(tempStartDate));
    //             if((booking_start >= tempStartDate && booking_end <= tempEndDate)||(booking_start <= tempStartDate && booking_end <= tempEndDate && booking_end>=tempStartDate)||(booking_start >= tempStartDate && booking_end >= tempEndDate && booking_start<=tempEndDate)){
    //                 res.writeHead(201, {
    //                     'Content-Type': 'text/plain'
    //                 })
    //                 res.end("Booking Collision");
    //                 break;
    //             }
    //             else{
    //                 var book=new booking({
    //                     property_id:req.body.property_id,
    //                     start:booking_start,
    //                     end:booking_end,
    //                     owner:req.body.username,
    //                     traveler:req.body.traveler,
                        

    //                 })

    //                 book.save().then((doc)=>{
    //                     console.log("df",doc);
    //                     res.writeHead(200, {
    //                         'Content-Type': 'text/plain'
    //                     })
    //                     res.end('Booking successfully completed');

    //                 })
    //             }}
    //           }else{
    //             var bo=new booking({
    //                 property_id:req.body.property_id,
    //                 start:booking_start,
    //                 end:booking_end,
    //                 owner:req.body.username,
    //                 traveler:req.body.traveler

    //             })

    //             bo.save().then((doc)=>{
    //                 console.log("df",doc);
    //                 res.writeHead(200, {
    //                     'Content-Type': 'text/plain'
    //                 })
    //                 res.end('Booking successfully completed');

    //             })
    //           }

    //       })
    //   }



    //   kafka.make_request('book_property',req.body, function(err,results){
    //     console.log('in result');
    //     console.log(results);
    //     if (err){
    //         console.log("Inside err");
    //         res.writeHead(400, {
    //             'Content-Type': 'text/plain'
    //         })

    //         res.end("Unable to book this property");
    //     }else{
    //         if(results.length==0){
    //             res.writeHead(201, {
    //                 'Content-Type': 'text/plain'
    //             })
    //             res.end("Booking Collision");
    //         }else{
    //             console.log("Inside else");
    //             console.log("Results",results);
    //             res.writeHead(200, {
    //                 'Content-Type': 'application/json'
    //             })
    //             res.end(JSON.stringify(results));
    //         }
            
    //         }
        
    // });

    // });
    


// //Get booked Travelers for a property
// app.get('/getpropertytravelers', function (req, res) {
//     console.log("Inside get property travelers Request Handler");
//     var property_id = req.query.property_id;
//     console.log(property_id);
    
//     var str = "select username from booking where property_id= " + mysql.escape(property_id);
    
// // booking.find({property_id:property_id}).then((docs)=>{
// //     console.log("bookings",docs)
// // if(docs.length==0){
// //     res.writeHead(201, {
// //         'Content-Type': 'text/plain'
// //     })
// //     res.end("Invalid property");
// // }else{
// //     let temp=JSON.stringify(docs);
// //     temp=JSON.parse(temp);
// //     var emailaddress=[];
// //     for (var i=0; i<temp.length;i++){
// //         emailaddress.push(temp[i].traveler);
// //     }
// //     traveler.find({"emailaddress":{$in:emailaddress},UserType:"traveler"}).select('-password')
// //     .then((travelers)=>{

// // console.log(travelers);
// //         let temp1=JSON.stringify(travelers)
// //         temp1=JSON.parse(temp1);
       

// //         res.writeHead(200, {
// //             'Content-Type': 'application/json'
// //         })

// //         res.end(JSON.stringify(temp1));


        
// //     })
// // }
// // }).catch((e)=>{
// //     res.writeHead(400, {
// //         'Content-Type': 'text/plain'
// //     })

// //     res.end("Error");
// // })


// obj={
//     property_id:property_id
// }
// kafka.make_request('property_travelers',obj, function(err,results){
//     console.log('in result');
//     console.log(results);
//     if (err){
//         console.log("Inside err");
//         res.writeHead(400, {
//             'Content-Type': 'text/plain'
//         })

//         res.end("Unable to find travelers");
//     }else{
//         if(results.length==0){
//             res.writeHead(201, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end("Invalid property");
//         }else{
//             console.log("Inside else");
//             console.log("Results",results);
//             res.writeHead(200, {
//                 'Content-Type': 'application/json'
//             })
//             res.end(JSON.stringify(results));
//         }
        
//         }
    
// });


// });

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
