var express = require('express');
var router = express.Router();

// api
var usersRouter = require('./users');
var productRouter = require('./product');
var ratingRouter = require('./rating')
var categoryRouter = require('./category')
var carouselRouter = require('./carousel')
var cartRouter = require('./cart')
var orderRouter = require('./order')

// MODELS
const Product = require('../../models/greenStoreApi/product')

/* RETURN CODE TYPE:
  0 : Success
  1 : Error No Data
  100 : Other errors
*/

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('greenStoreApi/index')
});

router.get('/products',productRouter);
router.get('/rating', ratingRouter);
router.get('/category', categoryRouter);
router.get('/carousel',carouselRouter)
router.get('/cart',cartRouter)
router.get('/order', orderRouter)
router.get('/user', usersRouter);

module.exports = router;
