var Tools = require('../models/tools');


//get all the tools that in the DB mongo
exports.get_Tools = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    const { page = 1, limit = 10 } = req.query;
    try {
        Tools.find().limit(limit * 1)
            .skip((page - 1) * limit)
            .exec(function (err,toolsList) {
                if (err) return next(err);
                res.send(toolsList);
            })
    } catch {
        if (err) return next(err);
    }
}

//get a id of one tool and update the amount that in Stock
exports.update_tools = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    Tools.findByIdAndUpdate(req.params.toolsId, req.body, function(err, old, updated){
        if(err) return next(err);
        res.send();
    }); 
}