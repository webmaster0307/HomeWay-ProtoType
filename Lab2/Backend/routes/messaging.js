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



//Profile Post for owner
router.post('/postquestion', function (req, res) {
    
   
    console.log("Inside Post Question Request Handler");
//console.log(JSON.stringify(req.body));

//console.log("Res 1: ",req.body);

// var q=new question({
//     firstName:req.body.firstName,
//     lastName:req.body.lastName,
//     emailaddress:req.body.emailaddress,
//     message:req.body.message,
//     owner:req.body.owner,
//     contactno:req.body.contactno,
//     reply:""

   
    

// })

// q.save().then((doc)=>{
    
// console.log("ques",doc);
// res.writeHead(200, {
//     'Content-Type': 'text/plain'
// })
// res.end("Message sent to owner");
// }).catch((e)=>{
//     res.writeHead(400, {
//         'Content-Type': 'text/plain'
//     })
//     res.end("Error in sending message");
// })


kafka.make_request('post_question',req.body, function(err,results){
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
        res.end("Question Posted successfully");
        }
    
});

});




router.get('/getownermessages', function (req, res) {
    
   
    console.log("Inside Post Question Request Handler");
//console.log(JSON.stringify(req.body));

console.log("Res 1: ",req.body);
var owner=req.query.owner;
var obj={
    owner:owner
}

// question.find({owner:owner}).then((doc)=>{
    
// console.log("ques",doc);
// res.writeHead(200, {
//     'Content-Type': 'application/json'
// })
// res.end(JSON.stringify(doc));
// }).catch((e)=>{
//     res.writeHead(400, {
//         'Content-Type': 'text/plain'
//     })
//     res.end("Error in sending message");
// })



kafka.make_request('get_owner_messages',obj, function(err,results){
    console.log('in result');
    console.log(results);
    if (err){
        console.log("Inside err");
        res.writeHead(400, {
            'Content-Type': 'text/plain'
        })

        res.end("Error in getting owner messages");
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



router.post('/replytomessage', function (req, res) {
    
   
    console.log("Inside Post Question Request Handler");
//console.log(JSON.stringify(req.body));

console.log("Res 1: ",req.body);


// question.findOneAndUpdate({_id:req.body.message_id},{$set:{reply:req.body.reply}},{new:true})
//     .then((doc)=>{
//         console.log("update doc",doc);

// res.writeHead(200, {
//     'Content-Type': 'text/plain'
// })
// res.end("Message sent to owner");
// }).catch((e)=>{
//     res.writeHead(400, {
//         'Content-Type': 'text/plain'
//     })
//     res.end("Error in sending message");
// })


kafka.make_request('reply_to_message',req.body, function(err,results){
    console.log('in result');
    console.log(results);
    if (err){
        console.log("Inside err");
        res.writeHead(400, {
            'Content-Type': 'text/plain'
        })
        res.end("Error in sending message");
    }else{
        console.log("Inside else");
        console.log("Results",results);
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        })
        res.end("Message sent to owner");
        }
    
});


});



router.get('/gettravelermessages', function (req, res) {
    
   
    console.log("Inside get owner replies");
//console.log(JSON.stringify(req.body));

console.log("Res 1: ",req.body);
var traveler=req.query.emailaddress;
var obj={
    traveler:traveler
}

// question.find({emailaddress:traveler}).then((doc)=>{
    
// console.log("ques",doc);
// res.writeHead(200, {
//     'Content-Type': 'application/json'
// })
// res.end(JSON.stringify(doc));
// }).catch((e)=>{
//     res.writeHead(400, {
//         'Content-Type': 'text/plain'
//     })
//     res.end("Error in retrieving messages");
// })


kafka.make_request('get_traveler_messages',obj, function(err,results){
    console.log('in result');
    console.log(results);
    if (err){
        console.log("Inside err");
        res.writeHead(400, {
            'Content-Type': 'text/plain'
        })

        res.end("Error in getting traveler messages");
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

module.exports=router;