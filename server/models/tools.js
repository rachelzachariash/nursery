var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = require('mongodb').ObjectID;

var ToolsSchema = new Schema(
    {
        Id: {type: ObjectId},
        category: {type: String},
        name: {type: String},
        picture: {type: String},
        price: {type: Number},
        amoutYouWantToBuy: {type: Number},
        unitsInStock: {type: Number},
        category: {type: String},
    }
);

module.exports = mongoose.model('Tool', ToolsSchema);