var mongoose = require('mongoose');

// define the schema for our bars model
var barSchema = mongoose.Schema({
    'place_id': String,
    'going': []
});

module.exports = mongoose.model('bars', barSchema);