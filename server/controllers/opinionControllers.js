
var Opinon = require('../models/opinon');

//get all the opnions that in the DB mongo
exports.get_Opinions = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    const { page = 1, limit = 50 } = req.query;
    try {
        debugger;
        Opinon.find().limit(limit * 1)
            .skip((page - 1) * limit)
            .exec(function (err,opinionList) {
                if (err) return next(err);
                res.send(opinionList);
            })
    } catch {
        if (err) return next(err);
    }
}


//get in the body a opinoin ant put the new opnion in the DB
exports.post_create_opinion = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    const { opinion} = req.body;
            var Opinion = new Opinon({
                // Id: Id,
                opinion: opinion
            })
            Opinion.save().then((result) => {
                console.log(result);
                res.status(200).json({
                    massage: 'opinion created'
                });

            }).catch(error => {
                res.status(500).json({
                    error
                });
            });
        
        }
