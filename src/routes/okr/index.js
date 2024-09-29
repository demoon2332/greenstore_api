import express from 'express';
import objectiveRouter from './objective.js';
import keyResultRouter from './key_result.js';

// MODELS
import Product from '../../models/greenStoreApi/product.js';

/* RETURN CODE TYPE:
  0 : Success
  1 : Error No Data
  100 : Other errors
*/

/* GET home page. */
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('okr/index');
});

router.use('/objective', objectiveRouter);
router.use('/keyresult', keyResultRouter);

export default router;
