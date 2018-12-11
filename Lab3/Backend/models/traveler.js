var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var traveler = new mongoose.Schema({
  UserType: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  emailaddress: {
    type: String
  },
  password: {
    type: String
  },
  aboutme: {
    type: String,
    required:false
  }, citycountry: {
    type: String,
    required:false
  }, company: {
    type: String,
    required:false
  }, school: {
    type: String,
    required:false
  }, hometown: {
    type: String,
    required:false
  }, languages: {
    type: String,
    required:false
  }, gender: {
    type: String,
    required:false
  }, profile_image: {
    type: String,
    required:false
  }

})

// Saves the user's password hashed (plain text password storage is not good)
traveler.pre('save', function (next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});


// Create method to compare password input to password saved in database
traveler.methods.comparePassword = function (pw, cb) {
  bcrypt.compare(pw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('Traveler', traveler);