var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var traveler = require('../models/traveler');


// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = "CMPE_273_Homeaway_secret";
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
      console.log("JWT",jwt_payload);
    traveler.findOne({emailaddress: jwt_payload.emailaddress,UserType:jwt_payload.UserType}, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};