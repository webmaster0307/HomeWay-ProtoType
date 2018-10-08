var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mysql = require('mysql');
var pool = require('./pool');
var path=require('path');
var fs=require('fs');
var multer=require('multer');
var md5=require('md5');
var fs=require('fs');
const bcrypt = require('bcrypt');

var uuidv4 = require('uuid/v4');

var maxSize=1000000*90;


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


//Route to handle Post Request Call
app.post('/travelerlogin', function (req, res) {

    console.log("Inside Login Post Request");
    var emailaddress = req.body.emailaddress;
    var password = req.body.password;
    var sql = "SELECT *  FROM traveler_login_data WHERE emailaddress = " +
        mysql.escape(emailaddress);

    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            con.query(sql, function (err, result) {
                console.log("req is", JSON.stringify(req.body));
                console.log(result);
                if (err || result.length == 0) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Incorrect emailaddress");
                } else {
                    let temp = JSON.stringify(result[0]);

                    temp = JSON.parse(temp);

                    let name = temp.firstname;
                    let hash=temp.password;
                    let username = temp.emailaddress;

                    if(bcrypt.compareSync(password, hash)) {
                        // Passwords match

                        console.log(name);


                    res.cookie('traveler', username, { maxAge: 9000000, httpOnly: false, path: '/' });
                    req.session.user = username;
                    console.log("Session",req.session.user);
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })

                    res.end("Successful Login");
                       } else {
                        res.writeHead(400, {
                            'Content-Type': 'text/plain'
                        })
    
                        res.end("Login Unsuccessfull");
                       }

                    

                }
            });
        }
    });

});


//fetch properties for details view


app.get('/fetchproperties', function(req,res){
    //console.log("in fetch");
    //console.log(req.body);
    //console.log(typeof(req.body.location));

    
    
    var sql = "SELECT * FROM property_details WHERE accomodates >= " +
    mysql.escape(req.query.guests) + " AND start <="+
    mysql.escape(req.query.start)+ " AND end >="+
    mysql.escape(req.query.end)+"AND address LIKE "+ mysql.escape("%" + req.query.location + "%") ; //"'%San Carlos%'";
    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
    con.query(sql,function(err,result){
        console.log(sql);
       
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Error while retrieving Book Details");
        }else{
            console.log("Properties",path.join(__dirname,'/properties'));
            let temp = JSON.stringify(result);

            temp = JSON.parse(temp);
            console.log(temp);
            var imgs=[];
            //console.log("temp",temp);
            for(var i=0;i<temp.length;i++){
                
                if(temp[i].images!=""){
                    let propimg=temp[i].images.split('*');
                    propimg.pop();
                    let filN=propimg[0];
                    imgs.push(propimg);
                    temp[i].imageName=filN;
                }
            }
            console.log("d",temp);
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(temp));
        }
    });
}
    
})
})




//fetch properties for trips


app.get('/mytrips', function(req,res){
    console.log("in fetch trips");
    console.log(req.query.username);
    var username=req.query.username;
    var sql = "SELECT * FROM booking WHERE username = " +
    mysql.escape(username); 
     
    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
    con.query(sql,function(err,result){
        console.log(sql);
       
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Error while retrieving Book Details");
        }else{
           // console.log("Properties",path.join(__dirname,'/properties'));
            let temp = JSON.stringify(result);

            temp = JSON.parse(temp);
           if(temp.length!=0){
console.log("temp",temp);

            var ids=[];

            for(var i=0;i<temp.length;i++){
                ids.push(temp[i].property_id);
            }
            console.log("temp",temp);

            console.log('ids',ids);
         
            var str="SELECT * FROM property_details WHERE property_id IN ( " +
            mysql.escape(ids) + ")"; 

            //console.log("temp",temp);
            con.query(str,function(err,result){
                console.log("str",str);
               
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Error while retrieving Book Details");
                }else{
                   // console.log("Properties",path.join(__dirname,'/properties'));
                    let temp1 = JSON.stringify(result);
        
                    temp1 = JSON.parse(temp1);
        
                    console.log("temp1",temp1);
                    console.log("temp1",temp1);

                    for(var i=0;i<temp.length;i++){
                        for(var j=0;j<temp1.length;j++){
                            if(temp[i].property_id==temp1[j].property_id){
                                temp[i].headline=temp1[j].headline;
                                temp[i].guests=temp1[j].guests;
                                temp[i].currency=temp1[j].currency;
                                temp[i].rate=temp1[j].rate;
                                temp[i].imageName=temp1[j].images.split('*')[1]
                                break;
                            }

                        }
                    }
                                                
                    res.writeHead(200,{
                        'Content-Type' : 'application/json'
                    })
                    res.end(JSON.stringify(temp));
                }
            });
            
            
                
                
            
        }else{
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(temp));
        }

    }
    });
}
    
})
})






//fetch owner properties


app.get('/ownerproperties', function(req,res){
    console.log("in fetch owner properties");
    var owner=req.query.username;

    
    
    var sql = "SELECT * FROM property_details WHERE username = " +
    mysql.escape(owner);
    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
    con.query(sql,function(err,result){
        console.log(sql);
       
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Error while retrieving Book Details");
        }else{
            console.log("Properties",path.join(__dirname,'/properties'));
            let temp = JSON.stringify(result);

            temp = JSON.parse(temp);
            console.log(temp);
            var imgs=[];
            //console.log("temp",temp);
            for(var i=0;i<temp.length;i++){
                
                if(temp[i].images!=""){
                    let propimg=temp[i].images.split('*');
                    propimg.pop();
                    let filN=propimg[0];
                    imgs.push(propimg);
                    temp[i].imageName=filN;
                }
            }
            console.log("d",temp);
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(temp));
        }
    });
}
    
})
})







//get one property for specific property id for details view


//fetch properties for details view



//get listing---old


app.get('/getlisting', function(req,res){
    console.log("in get listing");
    console.log("cbcb",req.query.property_id);
    //console.log(typeof(req.body.location));

    
    
    var sql = "SELECT * FROM property_details WHERE property_id = " +
    mysql.escape(req.query.property_id); 
    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
    con.query(sql,function(err,result){
        console.log(sql);
       
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Error while retrieving Book Details");
        }else{
            //console.log(result);
            let temp = JSON.stringify(result[0]);

            temp = JSON.parse(temp);
        
            var images=temp.images;
var finalim="";
            for(var i=0;i<images.length-1;i++){
finalim+=images[i];
            }
temp.images=finalim;
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(temp));
        }
    });
}
    
})
})










//Route to handle Post Request Call
app.post('/ownerlogin', function (req, res) {

    console.log("Inside Owner Login Post Request");
    var emailaddress = req.body.emailaddress;
    var password = req.body.password;
    var sql = "SELECT *  FROM owner_login_data WHERE emailaddress = " +
        mysql.escape(emailaddress);

    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            con.query(sql, function (err, result) {
                console.log("req is", JSON.stringify(req.body));
                console.log(result);
                if (err || result.length == 0) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Incorrect emailaddress or password");
                } else {
                    let temp = JSON.stringify(result[0]);

                    temp = JSON.parse(temp);

                    let name = temp.firstname;
                    let hash=temp.password;

                    let username = temp.emailaddress;

                    if(bcrypt.compareSync(password, hash)) {
                    console.log(name);


                    res.cookie('owner', username, { maxAge: 9000000, httpOnly: false, path: '/' });
                    req.session.user = username;
                    console.log("Session",req.session.user);
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })

                    res.end("Successful Login");

                    }else{
                        res.writeHead(400, {
                            'Content-Type': 'text/plain'
                        })
    
                        res.end("Login Unsuccessfull");
                }

                }
            });
        }
    });

});












app.get('/gettravelerprofile', function (req, res) {

    console.log("Inside Traveler Profile Get Request");
    var emailaddress=req.query.emailaddress;
    var sql = "SELECT *  FROM traveler_login_data WHERE emailaddress = " +
        mysql.escape(emailaddress);


        const testFolder = path.join(__dirname,'/uploads');

          

    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            con.query(sql, function (err, result) {
                console.log("req is", JSON.stringify(req.body));
                console.log(result);
                if (err || result.length == 0) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Incorrect emailaddress");
                } else {
                    let temp = JSON.stringify(result[0]);

                    temp = JSON.parse(temp);
                    var data={
                        firstname :temp.firstname,
                        lastname :temp.lastname,
                        aboutme:temp.aboutme,
                        citycountry:temp.citycountry,
                        company:temp.company,
                        school:temp.school,
      hometown:temp.school,
      languages:temp.languages,
      gender:temp.gender,
      
                        
                    }
                    if(temp.profile_image!=""){
                    data.photo=new Buffer(fs.readFileSync(path.join(__dirname + '/uploads',temp.profile_image))).toString('base64');
                    }
                     res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })

                    res.end(JSON.stringify(data));

                }
            });
        }
    });

});

//Get Profile photo




app.get('/getownerprofile', function (req, res) {

    console.log("Inside Traveler Profile Get Request");
    var emailaddress=req.query.username;
    console.log(emailaddress);
    var sql = "SELECT *  FROM owner_login_data WHERE emailaddress = " +
        mysql.escape(emailaddress);


        const testFolder = path.join(__dirname,'/uploads');
        
        
          

            
                
        
      

    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            con.query(sql, function (err, result) {
                console.log("req is", JSON.stringify(req.body));
                console.log(result);
                if (err || result.length == 0) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Incorrect emailaddress");
                } else {
                    let temp = JSON.stringify(result[0]);

                    temp = JSON.parse(temp);
                    var data={
                        firstname :temp.firstname,
                        lastname :temp.lastname,
                        aboutme:temp.aboutme,
                        citycountry:temp.citycountry,
                        company:temp.company,
                        school:temp.school,
      hometown:temp.hometown,
      languages:temp.languages,
      gender:temp.gender,
      
                        
                    }
                    if(temp.profile_image!=""){
                    data.photo=new Buffer(fs.readFileSync(path.join(__dirname + '/uploads',temp.profile_image))).toString('base64');
                    }
                     res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })

                    res.end(JSON.stringify(data));

                }
            });
        }
    });

});

//Get Profile photo










//Profile Post
app.post('/addprofile',upload.single('photo'), function (req, res) {
    
   
    console.log("Inside Profile Request Handler");
//console.log(JSON.stringify(req.body));
console.log("Res : ",res.file);
console.log("Res 1: ",req.body);
if(req.file==undefined){
    var sql = "UPDATE traveler_login_data SET firstname = " +
    mysql.escape(req.body.firstname) + " ,lastname=" +
    mysql.escape(req.body.lastname) + ",aboutme=" + 
    mysql.escape(req.body.aboutme) + " ,citycountry=" + 
    mysql.escape(req.body.citycountry) + " ,company=" + 
    mysql.escape(req.body.company) + ",school=" + 
    mysql.escape(req.body.school) + ",hometown=" + 
    mysql.escape(req.body.hometown) + ",languages=" + 
    mysql.escape(req.body.languages) + ",gender=" + 
    mysql.escape(req.body.gender) +   
    " WHERE emailaddress = " +
    mysql.escape(req.body.username);
}else{
    var profile_image=req.file.filename;
    var sql = "UPDATE traveler_login_data SET firstname = " +
        mysql.escape(req.body.firstname) + " ,lastname=" +
        mysql.escape(req.body.lastname) + ",aboutme=" + 
        mysql.escape(req.body.aboutme) + " ,citycountry=" + 
        mysql.escape(req.body.citycountry) + " ,company=" + 
        mysql.escape(req.body.company) + ",school=" + 
        mysql.escape(req.body.school) + ",hometown=" + 
        mysql.escape(req.body.hometown) + ",languages=" + 
        mysql.escape(req.body.languages) + ",gender=" + 
        mysql.escape(req.body.gender) +   ",profile_image=" + 
        mysql.escape(profile_image) +
        " WHERE emailaddress = " +
        mysql.escape(req.body.username);
}


    


        console.log("fdsf",sql);
    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(400, {

                'Content-Type': 'text/plain'
            })

            res.end("Could Not Get Connection Object");
        }
        else {

            con.query(sql, function (err, result) {

                if (err) {
                    console.log("got");
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })

                    res.end("Error");
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end('User successfully added');
                }
            });
        }
    });


});







//Profile Post for owner
app.post('/addprofileowner',upload.single('photo'), function (req, res) {
    
   
    console.log("Inside Owner Profile Request Handler");
//console.log(JSON.stringify(req.body));
console.log("Res : ",res.file);
console.log("Res 1: ",req.body);
if(req.file==undefined){
    var sql = "UPDATE owner_login_data SET firstname = " +
    mysql.escape(req.body.firstname) + " ,lastname=" +
    mysql.escape(req.body.lastname) + ",aboutme=" + 
    mysql.escape(req.body.aboutme) + " ,citycountry=" + 
    mysql.escape(req.body.citycountry) + " ,company=" + 
    mysql.escape(req.body.company) + ",school=" + 
    mysql.escape(req.body.school) + ",hometown=" + 
    mysql.escape(req.body.hometown) + ",languages=" + 
    mysql.escape(req.body.languages) + ",gender=" + 
    mysql.escape(req.body.gender) +    
    " WHERE emailaddress = " +
    mysql.escape(req.body.username);
}else{
    var profile_image=req.file.filename;
    var sql = "UPDATE owner_login_data SET firstname = " +
    mysql.escape(req.body.firstname) + " ,lastname=" +
    mysql.escape(req.body.lastname) + ",aboutme=" + 
    mysql.escape(req.body.aboutme) + " ,citycountry=" + 
    mysql.escape(req.body.citycountry) + " ,company=" + 
    mysql.escape(req.body.company) + ",school=" + 
    mysql.escape(req.body.school) + ",hometown=" + 
    mysql.escape(req.body.hometown) + ",languages=" + 
    mysql.escape(req.body.languages) + ",gender=" + 
    mysql.escape(req.body.gender) + ",profile_image=" + 
    mysql.escape(profile_image) +   
    " WHERE emailaddress = " +
    mysql.escape(req.body.username);
}


    


        console.log("fdsf",sql);
    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(400, {

                'Content-Type': 'text/plain'
            })

            res.end("Could Not Get Connection Object");
        }
        else {

            con.query(sql, function (err, result) {

                if (err) {
                    console.log("got");
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })

                    res.end("Error");
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end('User successfully added');
                }
            });
        }
    });


});





//Post Property



app.post('/postproperty',uploadProperties.array('photos'),function (req, res) {
    console.log("Inside Post Property Request Handler");
    console.log(JSON.stringify(req.body));
    console.log("Bedrooms",req.body.bedrooms);
    var emailaddress = req.body.username;
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
    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(400, {

                'Content-Type': 'text/plain'
            })

            res.end("Could Not Get Connection Object");
            console.log("got1");
        }
        else {

            con.query(sql, function (err, result) {
               
                        if (err) {
                            console.log("got");
                            console.log(err);
                            res.writeHead(400, {
                                'Content-Type': 'text/plain'
                            })

                            res.end("Error");
                        } else {
                            console.log("else");
                            res.writeHead(200, {
                                'Content-Type': 'text/plain'
                            })
                            res.end('User successfully added');
                        }
                    });
                }
            });

        }
    );












//Traveler Sign Up
    app.post('/signup', function (req, res) {
        console.log("Inside Sign Up Request Handler");
        var emailaddress = req.body.emailaddress;
        console.log(req.body.firstname);
        bcrypt.hash(req.body.password, 10, function(err, hash) {
            // Store hash in database
            
            var str = "select * from traveler_login_data where emailaddress= " + mysql.escape(emailaddress);
            var sql = "INSERT INTO traveler_login_data VALUES ( " +
                mysql.escape(null) + " ," +
                mysql.escape(req.body.firstname) + " , " + mysql.escape(req.body.lastname) + " , " +
                mysql.escape(req.body.emailaddress) + ", " + mysql.escape(hash) + " , " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") +") ";
    
            pool.getConnection(function (err, con) {
                if (err) {
                    res.writeHead(400, {
    
                        'Content-Type': 'text/plain'
                    })
    
                    res.end("Could Not Get Connection Object");
                    console.log("got1");
                }
                else {
    
                    con.query(str, function (err, result) {
                        if (err || result.length === 1) {
    
                            res.writeHead(201, {
                                'Content-Type': 'text/plain'
                            })
                            res.end("User with this email address already exist");
    
                        } else {
    
                            con.query(sql, function (err, result) {
    
                                if (err) {
                                    console.log("got");
                                    res.writeHead(400, {
                                        'Content-Type': 'text/plain'
                                    })
    
                                    res.end("Error");
                                } else {
                                    console.log("else");
                                    res.writeHead(200, {
                                        'Content-Type': 'text/plain'
                                    })
                                    res.end('User successfully added');
                                }
                            });
                        }
                    });
    
                }
            });
        

          });
        
       
    });




//Owner Sign Up
app.post('/ownersignup', function (req, res) {
    console.log("Inside Owner Sign Up Request Handler");
    var emailaddress = req.body.emailaddress;
    console.log(req.body.firstname);
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        // Store hash in database
        
        var str = "select * from owner_login_data where emailaddress= " + mysql.escape(emailaddress);
        var sql = "INSERT INTO owner_login_data VALUES ( " +
            mysql.escape(null) + " ," +
            mysql.escape(req.body.firstname) + " , " + mysql.escape(req.body.lastname) + " , " +
            mysql.escape(req.body.emailaddress) + ", " + mysql.escape(hash) + " , " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") +") ";

        pool.getConnection(function (err, con) {
            if (err) {
                res.writeHead(400, {

                    'Content-Type': 'text/plain'
                })

                res.end("Could Not Get Connection Object");
                console.log("got1");
            }
            else {

                con.query(str, function (err, result) {
                    if (err || result.length === 1) {

                        res.writeHead(201, {
                            'Content-Type': 'text/plain'
                        })
                        res.end("User with this email address already exist");

                    } else {

                        con.query(sql, function (err, result) {

                            if (err) {
                                console.log("got");
                                res.writeHead(400, {
                                    'Content-Type': 'text/plain'
                                })

                                res.end("Error");
                            } else {
                                console.log("else");
                                res.writeHead(200, {
                                    'Content-Type': 'text/plain'
                                })
                                res.end('User successfully added');
                            }
                        });
                    }
                });

            }
        });
    

      });
    
   
});


//Book Property

    app.post('/bookproperty', function (req, res) {
        console.log("Inside Booking Request Handler");
        var emailaddress = req.body.username;
        console.log(req.body.property_id);
        var available= "select * from property_details where property_id= " + mysql.escape(req.body.property_id);
        var str = "select * from booking where property_id= " + mysql.escape(req.body.property_id);
        var sql = "INSERT INTO booking VALUES ( " +
            mysql.escape(null) + " ," +
            mysql.escape(req.body.property_id) + " , " + mysql.escape(req.body.start) + " , " +
            mysql.escape(req.body.end) + ", " + mysql.escape(req.body.guests) + " , " + mysql.escape(req.body.username) + ") ";
        pool.getConnection(function (err, con) {
            if (err) {
                res.writeHead(400, {

                    'Content-Type': 'text/plain'
                })

                res.end("Could Not Get Connection Object");
                console.log("got1");
            }
            else{
                
                con.query(available, function (err, result) {
                    if (err) {

                        res.writeHead(400, {
                            'Content-Type': 'text/plain'
                        })
                        res.end("DB error");

                    }
            
            else {
                
               let temp3=JSON.stringify(result);
                temp3=JSON.parse(temp3);
console.log("temp3",temp3);
                var st=new Date(temp3[0].start);
                var en= new Date(temp3[0].end);
                console.log("start",st);
                console.log("end",en);
               
                 con.query(str, function (err, result) {
                    if (err) {

                        res.writeHead(400, {
                            'Content-Type': 'text/plain'
                        })
                        res.end("DB error");

                    } else {
                        let temp=JSON.stringify(result);
                        temp=JSON.parse(temp);
                        console.log("booking data",temp);
                        console.log("req start",req.body);
                        var invalid=false;
                        var collision=false;
                        let startDate = new Date(req.body.start);
                        let endDate = new Date(req.body.end);
                        console.log("enddate",endDate);
                        console.log("startdate",startDate);
                        if(startDate<st || endDate>en){
                            console.log("in invalid");
                            invalid=true;
                        }
                        for(var i=0;i<temp.length;i++){
                            let tempStartDate = new Date(temp[i].start);
                            let tempEndDate = new Date(temp[i].end);
                            
                            if(invalid==false){
                                if((startDate >= tempStartDate && endDate <= tempEndDate)||(startDate >= tempStartDate && endDate <= tempEndDate)||(startDate <= tempStartDate && endDate >= tempEndDate)){
                                    console.log("Collision");
                                    collision=true;
                                    
                                    break;
                            }
                        }
                        }
                        if(collision==true){
                            
                            res.writeHead(201, {
                                'Content-Type': 'text/plain'
                            })
                            res.end("Booking Collision");
                        }else if(invalid==true){
                            res.writeHead(202, {
                                'Content-Type': 'text/plain'
                            })
                            res.end("Booking Collision");

                        }else{
                        con.query(sql, function (err, result) {

                            if (err) {
                                console.log("got");
                                res.writeHead(400, {
                                    'Content-Type': 'text/plain'
                                })

                                res.end("Error");
                            } else {
                                console.log("else");
                                res.writeHead(200, {
                                    'Content-Type': 'text/plain'
                                })
                                res.end('Booking successfully completed');
                            }
                        })};
                    }
                });

            }
        })
        };
    })

    });
    


//Get booked Travelers for a property
app.get('/getpropertytravelers', function (req, res) {
    console.log("Inside get property travelers Request Handler");
    var property_id = req.query.property_id;
    
    var str = "select username from booking where property_id= " + mysql.escape(property_id);
    
    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(400, {

                'Content-Type': 'text/plain'
            })

            res.end("Could Not Get Connection Object");
            console.log("got1");
        }
        else {

            con.query(str, function (err, result) {
                if (err || result.length ===0) {

                    res.writeHead(201, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Invalid property");

                } else {
                    let temp=JSON.stringify(result);
                    temp=JSON.parse(temp);
                    var emailaddress=[];
                    for(var i=0;i<temp.length;i++){
                        emailaddress.push(temp[i].username);
                    }
                    var sql = "SELECT firstname,lastname,emailaddress,gender,citycountry,hometown,company,profile_image,aboutme,languages  FROM traveler_login_data WHERE emailaddress IN (" +
    mysql.escape(emailaddress) + ")";
                    con.query(sql, function (err, result) {
                            
                        if (err) {
                            console.log("got");
                            res.writeHead(400, {
                                'Content-Type': 'text/plain'
                            })

                            res.end("Error");
                        } else {
                            console.log("else");

                            let temp1=JSON.stringify(result)
                            temp1=JSON.parse(temp1);
                            // let files=[]
                            // for(var i=0;i<temp.length;i++){
                            //     files.push(md5(temp[i].username));
                            // }
                            // const testFolder = path.join(__dirname,'/uploads');
                            
                            
                            // var fileName="";
                            // let tot_files=[];
                              
                    
                            // fs.readdir(testFolder, (err, files) => {
                            //     files.forEach(file => {
                            //         tot_files.push(file);
                    
                            //       })
                            //     })
                                  
                            // for(var i=0;i<files.length;i++){
                                
                            // }
        
              
                            
                            res.writeHead(200, {
                                'Content-Type': 'application/json'
                            })
        
                            res.end(JSON.stringify(temp1));
                        }
                    });
                }
            });

        }
    });
});


    app.listen(3001);
    console.log("Server Listening on port 3001");

