var Flowers = require('../models/flowers');


//get all the flowers that in the DB mongo
exports.get_Flowers = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    const { page = 1, limit = 10 } = req.query;
    try {
        Flowers.find().limit(limit * 1)
            .skip((page - 1) * limit)
            .exec(function (err,flowesList) {
                if (err) return next(err);
                res.send(flowesList);
            })
    } catch {
        if (err) return next(err);
    }
}

//get a id of one flower and update the amount that in Stock
exports.update_flawes = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    Flowers.findByIdAndUpdate(req.params.flowersId, req.body, function(err, old, updated){
        if(err) return next(err);
        res.send();
    });   
}

