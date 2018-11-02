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




router.get('/fetchproperties', function (req, res) {
    //console.log("in fetch");
    //console.log(req.body);
    //console.log(typeof(req.body.location));

var obj={
    start:req.query.start,
    end:req.query.end,
    accomodates:req.query.guests,
    location:req.query.location
}

    var sql = "SELECT * FROM property_details WHERE accomodates >= " +
        mysql.escape(req.query.guests) + " AND start <=" +
        mysql.escape(req.query.start) + " AND end >=" +
        mysql.escape(req.query.end) + "AND address LIKE " + mysql.escape("%" + req.query.location + "%"); //"'%San Carlos%'";
   


    // listing.find({accomodates:{$gte:req.query.guests},start:{$lte:req.query.start},end:{$gte:req.query.end},address: { $regex: '.*' + req.query.location + '.*' ,$options:'i'}})
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


    kafka.make_request('search_properties',obj, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })

            res.end("Error while fetching properties");
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



router.get('/getlisting',function(req,res){
    console.log("in get listing");
    console.log("cbcb",req.query.property_id);
    var id=req.query.property_id;

    var obj={
        id:id
    }

kafka.make_request('details_view',obj, function(err,results){
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


})



router.post('/bookproperty', requireAuth,function (req, res) {
    console.log("Inside Booking Request Handler");
    var emailaddress = req.body.username;
    console.log(req.body.property_id);
    var available= "select * from property_details where property_id= " + mysql.escape(req.body.property_id);
    // var str = "select * from booking where property_id= " + mysql.escape(req.body.property_id);
    // var sql = "INSERT INTO booking VALUES ( " +
    //     mysql.escape(null) + " ," +
    //     mysql.escape(req.body.property_id) + " , " + mysql.escape(req.body.start) + " , " +
    //     mysql.escape(req.body.end) + ", " + mysql.escape(req.body.guests) + " , " + mysql.escape(req.body.username) + ") ";

    console.log("Data to book",req.body);

    kafka.make_request('book_property',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })

            res.end("Unable to book this property");
        }else{
            if(results.length==0){
                res.writeHead(201, {
                    'Content-Type': 'text/plain'
                })
                res.end("Booking Collision");
            }else{
                console.log("Inside else");
                console.log("Results",results);
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                })
                res.end(JSON.stringify(results));
            }
            
            }
        
    });

    });



//Get booked Travelers for a property
router.get('/getpropertytravelers', requireAuth,function (req, res) {
    console.log("Inside get property travelers Request Handler");
    var property_id = req.query.property_id;
    console.log(property_id);
    
    var str = "select username from booking where property_id= " + mysql.escape(property_id);
    
// booking.find({property_id:property_id}).then((docs)=>{
//     console.log("bookings",docs)
// if(docs.length==0){
//     res.writeHead(201, {
//         'Content-Type': 'text/plain'
//     })
//     res.end("Invalid property");
// }else{
//     let temp=JSON.stringify(docs);
//     temp=JSON.parse(temp);
//     var emailaddress=[];
//     for (var i=0; i<temp.length;i++){
//         emailaddress.push(temp[i].traveler);
//     }
//     traveler.find({"emailaddress":{$in:emailaddress},UserType:"traveler"}).select('-password')
//     .then((travelers)=>{

// console.log(travelers);
//         let temp1=JSON.stringify(travelers)
//         temp1=JSON.parse(temp1);
       

//         res.writeHead(200, {
//             'Content-Type': 'application/json'
//         })

//         res.end(JSON.stringify(temp1));


        
//     })
// }
// }).catch((e)=>{
//     res.writeHead(400, {
//         'Content-Type': 'text/plain'
//     })

//     res.end("Error");
// })


obj={
    property_id:property_id
}
kafka.make_request('property_travelers',obj, function(err,results){
    console.log('in result');
    console.log(results);
    if (err){
        console.log("Inside err");
        res.writeHead(400, {
            'Content-Type': 'text/plain'
        })

        res.end("Unable to find travelers");
    }else{
        if(results.length==0){
            res.writeHead(201, {
                'Content-Type': 'text/plain'
            })
            res.end("Invalid property");
        }else{
            console.log("Inside else");
            console.log("Results",results);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(results));
        }
        
        }
    
});


});


// router.get('/getggg', requireAuth,function (req, res) {
// res.end("Response recieved")
// })


module.exports=router;