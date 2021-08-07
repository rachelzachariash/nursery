var mailService = require('../services/mailService')

exports.post_send_email = function (req, res, next) {  //after the customer buyes then send email
    res.setHeader('Access-Control-Allow-Origin','*');
    mailService.emailBuyProducts(req.body.email, req.body.name, req.body.address, req.body.price);
    }