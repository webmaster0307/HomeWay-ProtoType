var mongoose =require('mongoose');
var bcrypt=require('bcrypt');

var booking= new mongoose.Schema({
    start : {
        type : Date
    },
    end : {
        type : Date
    },
    guests :{
        type : String
    },
    owner:{
        type:String
    },
    traveler:{
        type:String
    },
    property_id:{
        type:String
    }

})



  

  module.exports = mongoose.model('Booking', booking);