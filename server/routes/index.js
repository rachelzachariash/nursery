var express = require('express');
var router = express.Router();
var opinion_controller = require('../controllers/opinionControllers');
var questions_controller = require('../controllers/questionsControllers');
var fertilizers_controller = require('../controllers/fertilizersControllers');
var flowers_controller = require('../controllers/flowersControllers');
var tools_controller = require('../controllers/toolsControllers');
var bought_controller = require('../controllers/boughtControllers');
var finishBought_controller = require('../controllers/finishShopControllers');
//all the pass and the type of functions (the router)
router.get('/Opinion', opinion_controller.get_Opinions);
router.get('/QuestionsAnswers', questions_controller.get_Questions);
router.get('/shop/fertilizers', fertilizers_controller.get_Fertilizers);
router.get('/shop/flowers', flowers_controller.get_Flowers);
router.get('/shop/tools', tools_controller.get_Tools);
router.post('/Opinion', opinion_controller.post_create_opinion);
router.post('/bought', bought_controller.post_send_email);
router.post('/savebought', finishBought_controller.post_create_order);
router.post('/QuestionsAnswers', questions_controller.post_create_questions);
router.put('/shop/flowes/:flowersId', flowers_controller.update_flawes);
router.put('/shop/tools/:toolsId', tools_controller.update_tools);
router.put('/shop/fertilizer/:fertilizersId', fertilizers_controller.update_fertilizers);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
