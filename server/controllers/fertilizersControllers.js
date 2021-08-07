var Fertilizers = require('../models/fertilizers');


//get all the fertilizers that in the DB mongo
exports.get_Fertilizers = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    const { page = 1, limit = 10 } = req.query;
    try {
        Fertilizers.find().limit(limit * 1)
            .skip((page - 1) * limit)
            .exec(function (err,fertilizersnList) {
                if (err) return next(err);
                res.send(fertilizersnList);
            })
    } catch {
        if (err) return next(err);
    }
}

//get a id of one fertilizer and update the amount that in Stock
exports.update_fertilizers = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    Fertilizers.findByIdAndUpdate(req.params.fertilizersId, req.body, function(err, old, updated){
        if(err) return next(err);
        res.send();
    });
 }
