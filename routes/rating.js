var express = require('express');
var router = express.Router();

// MODELS
const Rating = require('../models/rating')

//SAMPLE DATA
const rate_data_sample = require('../samples/rating')

router.get('/init',(req, res, next)=>{

    Rating.find({})
    .then((result)=>{
        if(!result || result.length === 0){
            try {
                Rating.insertMany(rate_data_sample.getSampleData)
            }
            catch (err) {
                console.log(err)
                return res.json({ code: 100, message: err.message })
            }
            return res.json({ code: 0, message: 'Initialize data successfully.' })
        }
        return res.json({ code: 1, message: 'Rating list is not empty'})
    })
})

router.get('/:id', (req, res, next) => {
    let id = req.params.id
    Rating.find({ pid: id })
        .then(result => {
            if (!result) {
                return res.json({ code: 1, message: 'No data' })
            }
            return res.json({ code: 0, message: 'Fetch rating successfully', data: result })
        })
        .catch(err => {
            return res.json({ code: 100, message: err })
        })
})

module.exports = router;