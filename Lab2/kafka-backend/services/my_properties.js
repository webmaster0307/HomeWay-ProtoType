// exports.handle_request = handle_request;
var booking = require('../../Backend/models/booking');
var listing = require('../../Backend/models/property');

require('../../Backend/mongoose.js');
var jwt = require('jsonwebtoken');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request for My Properties for traveler:"+ JSON.stringify(msg));
   

    /*if(msg.username == "bhavan@b.com" && msg.password =="a"){
        res.code = "200";
        res.value = "Success Login";

    }
    else{
        res.code = "401";
        res.value = "Failed Login";
    }
    callback(null, res);*/

    listing.find({username:msg.username})
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
        console.log("ssd",temp);
        callback(null,temp);
    }).catch((e)=>{
        callback(null,"Error");
    })
    

}

exports.handle_request = handle_request;

