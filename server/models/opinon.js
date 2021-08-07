var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = require('mongodb').ObjectID;

var OpinionSchema = new Schema(
    {
        // Id: {type: ObjectId},
        opinion: {type: String},
    }
);

module.exports = mongoose.model('Opinion', OpinionSchema);