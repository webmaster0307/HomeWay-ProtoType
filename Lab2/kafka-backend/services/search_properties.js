// exports.handle_request = handle_request;
var listing = require('../../Backend/models/property');
require('../../Backend/mongoose.js');


var jwt = require('jsonwebtoken');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request for Search_Properties:"+ JSON.stringify(msg));
   

    /*if(msg.username == "bhavan@b.com" && msg.password =="a"){
        res.code = "200";
        res.value = "Success Login";

    }
    else{
        res.code = "401";
        res.value = "Failed Login";
    }
    callback(null, res);*/

    listing.find({accomodates:{$gte:msg.accomodates},start:{$lte:msg.start},end:{$gte:msg.end},address: { $regex: '.*' + msg.location + '.*' ,$options:'i'}})
    .then((doc)=>{

        let temp = JSON.stringify(doc);
        temp=JSON.parse(temp);
        
        var imgs = [];
        for (var i = 0; i < temp.length; i++) {

            if (temp[i].fileNames != "") {
                let propimg = temp[i].fileNames.split('*');
                propimg.pop();
                let filN = propimg[0];
                imgs.push(propimg);
                temp[i].imageName = filN;
            }
        }
        
        callback(null,temp);
    }).catch((e)=>{
        callback(null,"Error");
    })



}

exports.handle_request = handle_request;

