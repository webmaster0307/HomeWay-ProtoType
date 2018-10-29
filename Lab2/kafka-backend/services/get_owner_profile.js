// exports.handle_request = handle_request;
var traveler = require('../../Backend/models/traveler');
require('../../Backend/mongoose.js');

//var fs=require('fs');
function handle_request(msg, callback){
    var res = {};
    console.log("In handle request for Get Owner Profile:"+ JSON.stringify(msg));
   

    /*if(msg.username == "bhavan@b.com" && msg.password =="a"){
        res.code = "200";
        res.value = "Success Login";

    }
    else{
        res.code = "401";
        res.value = "Failed Login";
    }
    callback(null, res);*/



    traveler.findOne({emailaddress:msg.emailaddress,UserType:"owner"}).then((doc)=>{
        console.log("Find",doc);

        var data={
                              firstname :doc.firstName,
                               lastname :doc.lastName,
                                aboutme:doc.aboutme,
                                citycountry:doc.citycountry,
                                company:doc.company,
                                school:doc.school,
               hometown:doc.hometown,
               languages:doc.languages,
               gender:doc.gender,
             image_find:doc.profile_image
                                
                            }
                            
                            

                                               
                                   
                        callback(null,data);

    }).catch((e)=>{
        console.log("in catch");
        callback(null,"Error");
    })



}

exports.handle_request = handle_request;

