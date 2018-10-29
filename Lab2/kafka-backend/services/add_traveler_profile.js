// exports.handle_request = handle_request;
var traveler = require('../../Backend/models/traveler');
require('../../Backend/mongoose.js');


var jwt = require('jsonwebtoken');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request for Add traveler profile:"+ JSON.stringify(msg));
   
   if(msg.profile_image==""){

    traveler.findOneAndUpdate({emailaddress:msg.username,UserType:"traveler"},{$set:{firstName:msg.firstname,lastName:msg.lastname,aboutme:msg.aboutme,citycountry:msg.citycountry,company:msg.company,school:msg.school,hometown:msg.hometown,languages:msg.languages,gender:msg.gender}},{new:true})
    .then((doc)=>{
        console.log("update doc",doc);
        callback(null,doc);
    }).catch((e)=>{
        

        callback(null,"Error");
    })
   }else{

traveler.findOneAndUpdate({emailaddress:msg.username,UserType:"traveler"},{$set:{firstName:msg.firstname,lastName:msg.lastname,aboutme:msg.aboutme,citycountry:msg.citycountry,country:msg.country,school:msg.school,hometown:msg.hometown,languages:msg.languages,gender:msg.gender,profile_image:msg.profile_image}},{new:true})
        .then((doc)=>{
            callback(null,doc);
        }).catch((e)=>{
            callback(null,error);
        })



   }
}

exports.handle_request = handle_request;

