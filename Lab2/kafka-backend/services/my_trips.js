// exports.handle_request = handle_request;
var booking = require('../../Backend/models/booking');
var listing = require('../../Backend/models/property');

require('../../Backend/mongoose.js');
var jwt = require('jsonwebtoken');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request for My Trips for traveler:"+ JSON.stringify(msg));
   

    /*if(msg.username == "bhavan@b.com" && msg.password =="a"){
        res.code = "200";
        res.value = "Success Login";

    }
    else{
        res.code = "401";
        res.value = "Failed Login";
    }
    callback(null, res);*/

 booking.find({traveler:msg.username}).then((docs)=>{
        console.log("bookings",docs);
        let temp=JSON.stringify(docs);
        temp=JSON.parse(temp);
        if(temp.length!=0){
    
            var ids=[];
    
                        for(var i=0;i<temp.length;i++){
                            ids.push(temp[i].property_id);
                        }
                        console.log("temp",temp);
            
                        console.log('ids',ids);
    
                        listing.find({"_id":{$in:ids}})
                        .then((props)=>{
                            let temp1=JSON.stringify(props);
                            temp1=JSON.parse(temp1);
                           // console.log("Properties",temp1)
                            for (var i = 0; i < temp.length; i++) {
                                for (var j = 0; j < temp1.length; j++) {
                                    if (temp[i].property_id == temp1[j]._id) {
                                        temp[i].headline = temp1[j].headline;
                                        temp[i].guests = temp1[j].guests;
                                        temp[i].currency = temp1[j].currency;
                                        temp[i].rate = temp1[j].rate;
                                        temp[i].imageName = temp1[j].fileNames.split('*')[1]
                                        break;
                                    }
    
                                }
    
                            }
                            console.log("Final",temp);
    
                            callback(null,temp);
    
                        }).catch((e)=>{
                            
                            callback(null,"Error");
                        })
    
        }
    
    
    }).catch((error)=>{
        callback(null,"Error");
    })
    

}

exports.handle_request = handle_request;

