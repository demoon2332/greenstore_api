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

router.use('/products',productRouter);
router.use('/rating', ratingRouter);
router.use('/category', categoryRouter);
router.use('/carousel',carouselRouter)
router.use('/cart',cartRouter)
router.use('/order', orderRouter)
router.use('/user', usersRouter);


module.exports = router;
