var express = require('express');
var router = express.Router();


/* RETURN CODE TYPE:
  0 : Success
  1 : Error No Data
  100 : Other errors
*/

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index')
});

module.exports = router;
