var mongoose =require('mongoose');
var bcrypt=require('bcrypt');

var owner= new mongoose.Schema({
    firstName : {
        type : String
    },
    lastName : {
        type : String
    },
    emailaddress :{
        type : String
    },
    password:{
        type:String
    }

})



  

  module.exports = mongoose.model('Owner', owner);