// exports.handle_request = handle_request;
var booking = require('../../Backend/models/booking');
var listing = require('../../Backend/models/property');
var traveler=require('../../Backend/models/traveler');
require('../../Backend/mongoose.js');
var jwt = require('jsonwebtoken');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request for travelers signup:"+ JSON.stringify(msg));
   

    /*if(msg.username == "bhavan@b.com" && msg.password =="a"){
        res.code = "200";
        res.value = "Success Login";

    }
    else{
        res.code = "401";
        res.value = "Failed Login";
    }
    callback(null, res);*/
   
    traveler.find({emailaddress:msg.emailaddress,"UserType":"traveler"}).then((doc)=>{
        console.log(doc);
        if(doc.length!=0){
            callback(null,"Error");
        }else{
            var trav=new traveler({
                UserType:'traveler',
                firstName:msg.firstName,
                lastName:msg.lastName,
                emailaddress:msg.emailaddress,
                password:msg.password,
                aboutme:"",
                citycountry:"",
                company:"",
                school:"",
                hometown:"",
                languages:"",
                gender:"",
                profile_image:""

            })
        
            trav.save().then((doc)=>{
                callback(doc,null);
            },(e)=>{
                callback(null,"Error");
            })
        }
        
    }).catch((e)=>{
        callback(null,"Error");
     // })
    })


    

}

exports.handle_request = handle_request;

