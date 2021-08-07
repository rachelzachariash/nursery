var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = require('mongodb').ObjectID;

var OrdersSchema = new Schema(
    {
        Id: {type: ObjectId},
        prudeucs: {type: Array},
        costumerDetails: {type: Object},
        creditDetails: {type: Object}
    }
);
module.exports = mongoose.model('Order', OrdersSchema);