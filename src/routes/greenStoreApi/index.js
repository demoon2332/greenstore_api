import express from 'express';
import usersRouter from './users.js';
import productRouter from './product.js';
import ratingRouter from './rating.js';
import categoryRouter from './category.js';
import carouselRouter from './carousel.js';
import cartRouter from './cart.js';
import orderRouter from './order.js';
import Product from '../../models/greenStoreApi/product.js';

const router = express.Router();

/* RETURN CODE TYPE:
  0 : Success
  1 : Error No Data
  100 : Other errors
*/

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('greenStoreApi/index');
});

router.use('/products', productRouter);
router.use('/rating', ratingRouter);
router.use('/category', categoryRouter);
router.use('/carousel', carouselRouter);
router.use('/cart', cartRouter);
router.use('/order', orderRouter);
router.use('/user', usersRouter);

export default router;
