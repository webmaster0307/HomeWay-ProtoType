var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://shubham:cmpe273@ds137003.mlab.com:37003/homeaway_cmpe_273');

module.exports = {mongoose};