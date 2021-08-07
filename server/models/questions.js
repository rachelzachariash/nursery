var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = require('mongodb').ObjectID;

var QuestionsSchema = new Schema(
    {
        Id: {type: ObjectId},
        questions: {type: String},
        Answers: {type: String},
        email: {type: String},
    }
);

module.exports = mongoose.model('QuestionsAnswer', QuestionsSchema);