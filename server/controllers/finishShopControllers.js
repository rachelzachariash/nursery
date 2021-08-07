var Order = require('../models/order');

exports.post_create_order = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    const {Id,prudeucs,costumerDetails,creditDetails} = req.body;
            var Orders = new Order({
                Id: Id,
                prudeucs: prudeucs,
                costumerDetails: costumerDetails,
                creditDetails: creditDetails
            })
            Orders.save().then((result) => {
                console.log(result);
                res.status(200).json({
                    massage: 'order created'
                });

            }).catch(error => {
                res.status(500).json({
                    error
                });
            });
        
        }