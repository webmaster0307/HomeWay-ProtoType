var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var listing = new mongoose.Schema({
    address:{
        type:String
    },
    headline:{
        type:String
    },
    publicinfo:{
        type:String
    },
    propertytype:{
        type:String
    },
    bedrooms:{
        type:String
    },
    accomodates:{
        type:String
    },
    bathrooms:{
        type:String
    },
    
    start:{
        type:Date
    },
    end:{
        type:Date
    },
    currency:{
        type:String
    },
    rate:{
        type:String
    },
    nights:{
        type:String
    },username:{
        type:String
    },fileNames:{
        type:String
    },
    _id:{
        type:String
    }
  

})


module.exports = mongoose.model('Listing', listing);