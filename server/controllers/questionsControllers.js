var Questions = require('../models/questions');
var mailService = require('../services/mailService')


//get all the questions and answers that in the DB mongo
exports.get_Questions = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    const { page = 1, limit = 10 } = req.query;
    try {
        Questions.find().limit(limit * 1)
            .skip((page - 1) * limit)
            .exec(function (err,questionsList) {
                if (err) return next(err);
                res.send(questionsList);
            })
    } catch {
        if (err) return next(err);
    }
}


//get in the body question and a email address and put the new question in the DB
exports.post_create_questions = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    const { Id,questions, Answers, email} = req.body;
            mailService.emailQuestions(email)
            console.log(email)
            var QuestionsAnswer = new Questions({
                Id: Id,
                questions: questions,
                Answers: Answers,
                email: email
            })
            QuestionsAnswer.save().then((result) => {
                console.log(result);
                res.status(200).json({
                    massage: 'questions created'
                });
            }).catch(error => {
                res.status(500).json({
                    error
                });
            });
            
        
        }