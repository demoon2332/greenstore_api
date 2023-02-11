var express = require('express');
var router = express.Router();



//model
const data_sample = require('../../samples/bingoGame/chesses')


var chesses = data_sample.getSampleData;

// another

// routes
router.get('/',(req,res)=>{
    res.render('bingoGame/index');
})

router.post('/',(req,res)=>{
    res.json(chesses)
})


module.exports = router;