// exports.handle_request = handle_request;
var listing = require('../../Backend/models/property');
require('../../Backend/mongoose.js');


var jwt = require('jsonwebtoken');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request for Details_View:"+ JSON.stringify(msg));
   

    /*if(msg.username == "bhavan@b.com" && msg.password =="a"){
        res.code = "200";
        res.value = "Success Login";

    }
    else{
        res.code = "401";
        res.value = "Failed Login";
    }
    callback(null, res);*/
    listing.findById(msg.id).then((doc)=>{
        console.log("Listing",doc);
        let temp = JSON.stringify(doc);
    
        temp = JSON.parse(temp);
    
        var images=temp.fileNames;
    var finalim="";
        for(var i=0;i<images.length-1;i++){
    finalim+=images[i];
        }
    temp.images=finalim;
        callback(null,temp);
    
    
    }).catch((e)=>{
        callback(null,"Error");
    })



}

exports.handle_request = handle_request;

