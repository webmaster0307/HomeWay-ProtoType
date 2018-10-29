// exports.handle_request = handle_request;
var traveler = require('../../Backend/models/traveler');
require('../../Backend/mongoose.js');


var jwt = require('jsonwebtoken');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request for Traveler_Login:"+ JSON.stringify(msg));
   

    /*if(msg.username == "bhavan@b.com" && msg.password =="a"){
        res.code = "200";
        res.value = "Success Login";

    }
    else{
        res.code = "401";
        res.value = "Failed Login";
    }
    callback(null, res);*/



    traveler.findOne({ emailaddress: msg.emailaddress ,UserType:"traveler"})

        .then((user) => {
            console.log("user data from db",user );
            if (user) {
                user.comparePassword(msg.password, function(err, isMatch) {

                    if (isMatch && !err) {
                    //res.cookie('traveler', user.emailaddress, { maxAge: 9000000, httpOnly: false, path: '/' });
                    var token = jwt.sign(user.toJSON(),"CMPE_273_Homeaway_secret", {
                        expiresIn: 10080 // in seconds
                    });
                    //response.status(200).json({success: true, token: 'JWT ' + token});
                    console.log("token",token);
                   // console.log(res.cookie);
                   // req.session.user = user.emailaddress;
                    //console.log("Session", req.session.user);
                    // res.writeHead(200, {
                    //     'Content-Type': 'application/json'
                    // })
                   
                    var result={
                        username:user.emailaddress,
                    token:token
                    }

                    callback(null,result);
                }else {
                    
                       callback(null,"Error");
                    
                }
                } );
            } else{
                callback(null,"Error");
            }
            
        })



}

exports.handle_request = handle_request;

