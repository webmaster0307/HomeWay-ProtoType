var mongoose =require('mongoose');
var bcrypt=require('bcrypt');

var question= new mongoose.Schema({
    firstName : {
        type : String
    },
    lastName : {
        type : String
    },
    emailaddress :{
        type : String
    },
    message:{
        type:String
    },
    owner:{
        type:String
    },
    contactno:{
        type:String
    },
    reply:{
        type:String
        
    }



})



  

  module.exports = mongoose.model('Question', question);