
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

var kafka = require('../kafka/client');

const router=express.Router();
router.post('/travelerlogin', function (req, res) {

    console.log("Inside Login Post Request");
    var emailaddress = req.body.emailaddress;
    console.log(req.body.emailaddress);

    var password = req.body.password;
    

    //Kafka request

    kafka.make_request('traveler_login',req.body, function(err,results){
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
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(results));
            }
        
    });
});


//Route to handle Post Request Call
router.post('/ownerlogin', function (req, res) {

    console.log("Inside Owner Login Post Request");
    var emailaddress = req.body.emailaddress;
    var password = req.body.password;
    var sql = "SELECT *  FROM owner_login_data WHERE emailaddress = " +
        mysql.escape(emailaddress);



   // traveler.findOne({ emailaddress: req.body.emailaddress,UserType:"owner" })

        // .then((user) => {
        //     console.log("user data from db",user );
        //     if (user) {
        //         user.comparePassword(req.body.password, function(err, isMatch) {

        //             if (isMatch && !err) {
        //             res.cookie('owner', user.emailaddress, { maxAge: 9000000, httpOnly: false, path: '/' });
        //             var token = jwt.sign(user.toJSON(),"CMPE_273_Homeaway_secret", {
        //                 expiresIn: 10080 // in seconds
        //             });
        //             //response.status(200).json({success: true, token: 'JWT ' + token});
        //             console.log(res.cookie);
        //             req.session.user = user.emailaddress;
        //             console.log("Session", req.session.user);
        //             res.writeHead(200, {
        //                 'Content-Type': 'application/json'
        //             })
        //             var auth={
        //                 username:user.emailaddress,
        //             token:token
        //             }

        //             res.end(JSON.stringify(auth));
        //         }else {
                    
        //                 res.writeHead(400, {
        //                     'Content-Type': 'text/plain'
        //                 })

        //                 res.end("Login Unsuccessfull");
                    
        //         }
        //         } );
        //     } else{
        //         res.writeHead(400, {
        //             'Content-Type': 'text/plain'
        //         })

        //         res.end("Login Unsuccessfull");
        //     }
        // })



    kafka.make_request('owner_login',req.body, function(err,results){
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
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(results));
            }
        
    });

});



//Traveler Sign Up
router.post('/signup', function (req, res) {
    console.log("Inside Sign Up Request Handler");
    console.log(req.body)
    var emailaddress = req.body.emailaddress;
    console.log(req.body.firstName);
   // bcrypt.hash(req.body.password, 10, function(err, hash) {
        // Store hash in database
        
        // var str = "select * from traveler_login_data where emailaddress= " + mysql.escape(emailaddress);
        // var sql = "INSERT INTO traveler_login_data VALUES ( " +
        //     mysql.escape(null) + " ," +
        //     mysql.escape(req.body.firstName) + " , " + mysql.escape(req.body.lastName) + " , " +
        //     mysql.escape(req.body.emailaddress) + ", " + mysql.escape(hash) + " , " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") +") ";

        // pool.getConnection(function (err, con) {
        //     if (err) {
        //         res.writeHead(400, {

        //             'Content-Type': 'text/plain'
        //         })

        //         res.end("Could Not Get Connection Object");
        //         console.log("got1");
        //     }
        //     else {

        //         con.query(str, function (err, result) {
        //             if (err || result.length === 1) {

        //                 res.writeHead(201, {
        //                     'Content-Type': 'text/plain'
        //                 })
        //                 res.end("User with this email address already exist");

        //             } else {

        //                 con.query(sql, function (err, result) {

        //                     if (err) {
        //                         console.log("got");
        //                         res.writeHead(400, {
        //                             'Content-Type': 'text/plain'
        //                         })

        //                         res.end("Error");
        //                     } else {
        //                         console.log("else");
        //                         res.writeHead(200, {
        //                             'Content-Type': 'text/plain'
        //                         })
        //                         res.end('User successfully added');
        //                     }
        //                 });
        //             }
        //         });

        //     }
        // });
        // traveler.find({emailaddress:emailaddress,"UserType":"traveler"}).then((doc)=>{
        //     console.log(doc);
        //     if(doc.length!=0){
        //         res.writeHead(400, {
        //             'Content-Type': 'text/plain'})
        //             res.end("User already exists");
        //     }else{
        //         var trav=new traveler({
        //             UserType:'traveler',
        //             firstName:req.body.firstName,
        //             lastName:req.body.lastName,
        //             emailaddress:req.body.emailaddress,
        //             password:req.body.password,
        //             aboutme:"",
        //             citycountry:"",
        //             company:"",
        //             school:"",
        //             hometown:"",
        //             languages:"",
        //             gender:"",
        //             profile_image:""
    
        //         })
            
        //         trav.save().then((doc)=>{
        //             res.writeHead(200, {
        //                 'Content-Type': 'text/plain'})
        //                  res.end('User successfully added');
        //         },(e)=>{
        //             res.writeHead(400, {
        //                 'Content-Type': 'text/plain'})
        //                 res.end("User already exists");
        //         })
        //     }
            
        // }).catch((e)=>{
        //     res.writeHead(400, {
        //         'Content-Type': 'text/plain'})
        //         res.end("User already exists");
        //  // })
        // })



    kafka.make_request('traveler_sign_up',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })

            res.end("User already exists");
        }else{
            console.log("Inside else");
            console.log("Results",results);
            
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end('User successfully added');
            }
        
    });
    
   
});




//Owner Sign Up
router.post('/ownersignup', function (req, res) {
    console.log("Inside Owner Sign Up Request Handler");
    console.log(req.body);
    var emailaddress = req.body.emailaddress;
    console.log(req.body.firstName);
    //bcrypt.hash(req.body.password, 10, function(err, hash) {
        // Store hash in database
        
        // var str = "select * from owner_login_data where emailaddress= " + mysql.escape(emailaddress);
        // var sql = "INSERT INTO owner_login_data VALUES ( " +
        //     mysql.escape(null) + " ," +
        //     mysql.escape(req.body.firstName) + " , " + mysql.escape(req.body.lastName) + " , " +
        //     mysql.escape(req.body.emailaddress) + ", " + mysql.escape(hash) + " , " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") + ", " + mysql.escape("") +") ";

        // pool.getConnection(function (err, con) {
        //     if (err) {
        //         res.writeHead(400, {

        //             'Content-Type': 'text/plain'
        //         })

        //         res.end("Could Not Get Connection Object");
        //         console.log("got1");
        //     }
        //     else {

        //         con.query(str, function (err, result) {
        //             if (err || result.length === 1) {

        //                 res.writeHead(201, {
        //                     'Content-Type': 'text/plain'
        //                 })
        //                 res.end("User with this email address already exist");

        //             } else {

        //                 con.query(sql, function (err, result) {
        //                     console.log(sql);

        //                     if (err) {
        //                         console.log("got");
        //                         res.writeHead(400, {
        //                             'Content-Type': 'text/plain'
        //                         })

        //                         res.end("Error");
        //                     } else {
        //                         console.log("else");
        //                         res.writeHead(200, {
        //                             'Content-Type': 'text/plain'
        //                         })
        //                         res.end('User successfully added');
        //                     }
        //                 });
        //             }
        //         });

        //     }
        // });
        // var trav=new traveler({
        //     UserType:'owner',
        //     firstName:req.body.firstName,
        //     lastName:req.body.lastName,
        //     emailaddress:req.body.emailaddress,
        //     password:req.body.password,
        //     aboutme:"",
        //     citycountry:"",
        //     company:"",
        //     school:"",
        //     hometown:"",
        //     languages:"",
        //     gender:"",
        //     profile_image:""

        // })
    
        // trav.save().then((doc)=>{
        //     res.writeHead(200, {
        //         'Content-Type': 'text/plain'})
        //          res.end('User successfully added');
        // },(e)=>{
        //     res.writeHead(400, {
        //         'Content-Type': 'text/plain'})
        //         res.end("Error");
        // })
    

      //});

      kafka.make_request('owner_sign_up',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })

            res.end("User already exists");
        }else{
            console.log("Inside else");
            console.log("Results",results);
            
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end('User successfully added');
            }
        
    });
    
   
});



module.exports=router;