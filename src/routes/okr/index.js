var express = require('express');
var router = express.Router();
var objectiveRouter = require('./objective');
var KeyResultRouter = require('./key_result')

// MODELS
const Product = require('../../models/greenStoreApi/product')

/* RETURN CODE TYPE:
  0 : Success
  1 : Error No Data
  100 : Other errors
*/

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('okr/index')
});
router.use('/objective',objectiveRouter)
router.use('/keyresult',KeyResultRouter)

module.exports = router;
