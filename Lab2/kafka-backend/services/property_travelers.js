// exports.handle_request = handle_request;
var booking = require('../../Backend/models/booking');
var listing = require('../../Backend/models/property');
var traveler=require('../../Backend/models/traveler');
require('../../Backend/mongoose.js');
var jwt = require('jsonwebtoken');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request for travelers for properties:"+ JSON.stringify(msg));
   

    /*if(msg.username == "bhavan@b.com" && msg.password =="a"){
        res.code = "200";
        res.value = "Success Login";

    }
    else{
        res.code = "401";
        res.value = "Failed Login";
    }
    callback(null, res);*/
   
booking.find({property_id:msg.property_id}).then((docs)=>{
    console.log("bookings",docs)
if(docs.length==0){
   callback(null,[]);// status 201
}else{
    let temp=JSON.stringify(docs);
    temp=JSON.parse(temp);
    var emailaddress=[];
    for (var i=0; i<temp.length;i++){
        emailaddress.push(temp[i].traveler);
    }
    traveler.find({"emailaddress":{$in:emailaddress},UserType:"traveler"}).select('-password')
    .then((travelers)=>{

console.log(travelers);
        let temp1=JSON.stringify(travelers)
        temp1=JSON.parse(temp1);
       

        callback(null,temp1);


        
    })
}
}).catch((e)=>{
    callback(null,"Error");
})
    

}

exports.handle_request = handle_request;

