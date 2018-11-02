// exports.handle_request = handle_request;
var question = require('../../Backend/models/question');
require('../../Backend/mongoose.js');
var jwt = require('jsonwebtoken');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request for Post Question:"+ JSON.stringify(msg));
   

    /*if(msg.username == "bhavan@b.com" && msg.password =="a"){
        res.code = "200";
        res.value = "Success Login";

    }
    else{
        res.code = "401";
        res.value = "Failed Login";
    }
    callback(null, res);*/
   
    question.find({owner:msg.owner}).then((doc)=>{
    
        console.log("ques",doc);
        callback(null,doc);
        }).catch((e)=>{
            callback(null,[])
        })
        
}

exports.handle_request = handle_request;

