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
var listing = require('../models/property');

var requireAuth = passport.authenticate('jwt', {session: false});

var kafka = require('../kafka/client');

const router=express.Router();

router.get('/ownerproperties',function(req,res){
    console.log("in fetch owner properties");
    var owner=req.query.username;

    var sql = "SELECT * FROM property_details WHERE username = " +
    mysql.escape(owner);

var obj={
    username:owner
}
kafka.make_request('my_properties',obj, function(err,results){
    console.log('in result');
    console.log(results);
    if (err){
        console.log("Inside err");
        res.writeHead(400, {
            'Content-Type': 'text/plain'
        })

        res.end("Error while fetching trips");
    }else{
        console.log("Inside else");
        console.log("Results",results);
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify(results));
        }
    
});
})

//fetch properties for trips
router.get('/mytrips',requireAuth,function(req,res){
    console.log("in fetch trips");
    console.log(req.query.username);
    var username=req.query.username;
    var sql = "SELECT * FROM booking WHERE username = " +
    mysql.escape(username); 
var obj={
    username:username
}

kafka.make_request('my_trips',obj, function(err,results){
    console.log('in result');
    console.log(results);
    if (err){
        console.log("Inside err");
        res.writeHead(400, {
            'Content-Type': 'text/plain'
        })

        res.end("Error while fetching trips");
    }else{
        console.log("Inside else");
        console.log("Results",results);
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify(results));
        }
    
});

})







module.exports=router;