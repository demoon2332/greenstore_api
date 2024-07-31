var express = require('express');
var router = express.Router();
const mailService = require('../../services/mailService');


//model


// another

// routes
router.get('/',(req,res)=>{
    res.json('Lunar fortfolio page');
})

router.post('/sendMail',(req,res)=>{
    return mailService.sendMail(req,res);
})


module.exports = router;