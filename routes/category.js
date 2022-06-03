var express = require('express');
var router = express.Router();

// MODELS
const Category = require('../models/category')
const Product = require('../models/product')

//SAMPLE DATA
const cate_data_sample = require('../samples/category')

router.get('/init', (req, res, next) => {
    Category.find({})
    .then((result)=>{
        if(!result || result.length === 0){
            try {
                Category.insertMany(cate_data_sample.getSampleData)
            }
            catch (err) {
                console.log(err)
                return res.json({ code: 100, message: err.message })
            }
            return res.json({ code: 0, message: 'Initialize data successfully.' })
        }
        return res.json({ code: 1, message: 'Category list is not empty'})
    })
})

router.get('/', (req, res, next) => {
    Category.find({})
    .then(result => {
        if (!result || result.length === 0) {
            return res.json({ code: 1, message: 'No data' })
        }
        return res.json({ code: 0, message: "Fetch data from category successfully.", data: result })
    })
    .catch(err => {
        return res.json({ code: 100, message: err })
    })
})

router.get('/:sn', (req, res, next) => {
    let sn = req.params.sn
    Product.find({ category_sn: sn })
        .then(result => {
            if (!result || result.length === 0) {
                return res.json({ code: 1, message: 'No data' })
            }
            return res.json({ code: 0, message: "Fetch data from category successfully.", data: result })
        })
        .catch(err => {
            return res.json({ code: 100, message: err })
        })
})

module.exports = router;