// exports.handle_request = handle_request;
var booking = require('../../Backend/models/booking');
var listing = require('../../Backend/models/property');
var traveler=require('../../Backend/models/traveler');
require('../../Backend/mongoose.js');
var jwt = require('jsonwebtoken');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request for post property:"+ JSON.stringify(msg));
   

    /*if(msg.username == "bhavan@b.com" && msg.password =="a"){
        res.code = "200";
        res.value = "Success Login";

    }
    else{
        res.code = "401";
        res.value = "Failed Login";
    }
    callback(null, res);*/
   
    let start=new Date(msg.start);
        let end=new Date(msg.end);

        
        let accomodates=Number(msg.accomodates);
       
        var prop=new listing({
           
            address:msg.address,
            headline:msg.headline,
            publicinfo:msg.publicinfo,
            propertytype:msg.propertytype,
            bedrooms:msg.bedrooms,
            accomodates:accomodates,
            bathrooms:msg.bathrooms,
            start:start,
            end:end,
            currency:msg.currency,
            rate:msg.rate,
            nights:msg.nights,
            username:msg.username,
            fileNames:msg.fileNames

        })
    
        prop.save().then((doc)=>{
            console.log("Prop",doc);
            callback(null,doc);
        },(e)=>{
            callback(null,"Error");
        })

    

}

exports.handle_request = handle_request;

