var express = require('express');

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
var traveler = require('../models/traveler');
var jwt = require('jsonwebtoken');
var kafka = require('../kafka/client');
var requireAuth = passport.authenticate('jwt', {session: false});

const router=express.Router();

router.get('/gettravelerprofile',requireAuth,function (req, res) {

    console.log("Inside Traveler Profile Get Request");
    var emailaddress=req.query.emailaddress;
    console.log("Email",emailaddress);
    var sql = "SELECT *  FROM traveler_login_data WHERE emailaddress = " +
        mysql.escape(emailaddress);


        const testFolder = path.join(__dirname,'/uploads');

          

    // pool.getConnection(function (err, con) {
    //     if (err) {
    //         res.writeHead(400, {
    //             'Content-Type': 'text/plain'
    //         })
    //         res.end("Could Not Get Connection Object");
    //     } else {
    //         con.query(sql, function (err, result) {
    //             console.log("req is", JSON.stringify(req.body));
    //             console.log(result);
    //             if (err || result.length == 0) {
    //                 res.writeHead(400, {
    //                     'Content-Type': 'text/plain'
    //                 })
    //                 res.end("Incorrect emailaddress");
    //             } else {
    //                 let temp = JSON.stringify(result[0]);

    //                 temp = JSON.parse(temp);

    //                 console.log("temp",temp);
    //                 var data={
    //                     firstname :temp.firstname,
    //                     lastname :temp.lastname,
    //                     aboutme:temp.aboutme,
    //                     citycountry:temp.citycountry,
    //                     company:temp.company,
    //                     school:temp.school,
    //   hometown:temp.school,
    //   languages:temp.languages,
    //   gender:temp.gender,
      
                        
    //                 }
    //                 if(temp.profile_image!=null){
    //                 data.photo=new Buffer(fs.readFileSync(path.join(__dirname + '/uploads',temp.profile_image))).toString('base64');
    //                 }
    //                  res.writeHead(200, {
    //                     'Content-Type': 'application/json'
    //                 })

    //                 res.end(JSON.stringify(data));

    //             }
    //         });
    //     }
    // });
  var obj={
      emailaddress:emailaddress
  }

    // traveler.findOne({emailaddress:emailaddress,UserType:"traveler"}).then((doc)=>{
    //     console.log("Find",doc);

    //     var data={
    //                           firstname :doc.firstName,
    //                            lastname :doc.lastName,
    //                             aboutme:doc.aboutme,
    //                             citycountry:doc.citycountry,
    //                             company:doc.company,
    //                             school:doc.school,
    //            hometown:doc.hometown,
    //            languages:doc.languages,
    //            gender:doc.gender,
              
                                
    //                         }
                            
    //                         if(doc.profile_image!=""){
    //                                           data.photo=new Buffer(fs.readFileSync(path.join(__dirname + '/uploads',doc.profile_image))).toString('base64');
    //                                            }

                                               
    //                                             res.writeHead(200, {
    //                                                 'Content-Type': 'application/json'
    //                            })
    //                            res.end(JSON.stringify(data));

    // }).catch((e)=>{
    //     console.log("in catch");
    //     res.writeHead(400, {
    //                         'Content-Type': 'text/plain'
    //                      })
    //                          res.end("Incorrect emailaddress");
    // })



    kafka.make_request('get_traveler_profile',obj, function(err,results){
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
            if(results.image_find!=""){
            var image=new Buffer(fs.readFileSync(path.join(__dirname,'..','uploads',results.image_find))).toString('base64');
            results.photo=image;
            }
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(results));
            }
        
    });




});


router.get('/getownerprofile',requireAuth, function (req, res) {

    console.log("Inside Traveler Profile Get Request");
    var emailaddress = req.query.username;
    console.log(emailaddress);
    var sql = "SELECT *  FROM owner_login_data WHERE emailaddress = " +
        mysql.escape(emailaddress);


    const testFolder = path.join(__dirname, '/uploads');


    // traveler.findOne({ emailaddress: emailaddress, UserType: "owner" }).then((doc) => {
    //     console.log("Find", doc);

    //     var data = {
    //         firstname: doc.firstName,
    //         lastname: doc.lastName,
    //         aboutme: doc.aboutme,
    //         citycountry: doc.citycountry,
    //         company: doc.company,
    //         school: doc.school,
    //         hometown: doc.hometown,
    //         languages: doc.languages,
    //         gender: doc.gender,


    //     }

    //     if (doc.profile_image) {
    //         data.photo = new Buffer(fs.readFileSync(path.join(__dirname + '/uploads', doc.profile_image))).toString('base64');
    //     }
    //     res.writeHead(200, {
    //         'Content-Type': 'application/json'
    //     })
    //     res.end(JSON.stringify(data));

    // }).catch((e) => {
    //     res.writeHead(400, {
    //         'Content-Type': 'text/plain'
    //     })
    //     res.end("Incorrect emailaddress");
    // })
    var obj={
        emailaddress:emailaddress
    }

    kafka.make_request('get_owner_profile',obj, function(err,results){
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
            if(results.image_find!=""){
            var image=new Buffer(fs.readFileSync(path.join(__dirname,'..','uploads',results.image_find))).toString('base64');
            results.photo=image;
            }
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(results));
            }
        
    });


});

//Get Profile photo




module.exports=router;