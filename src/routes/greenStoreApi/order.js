var express = require('express');
const { route } = require('.');
var router = express.Router();

// MODELS
const Cart = require('../../models/greenStoreApi/cart')
const Product = require('../../models/greenStoreApi/product')

router.post('/:uid', (req, res, next)=>{
    let {uid} = req.params
    Cart.find({ cus_id: uid, oid: ""})
        .then(async (result) => {
            if (!result || result.length === 0) {
                return res.json({ code: 1, message: 'No data' })
            }
            else {
                Cart.updateOne({cus_id: uid, oid: ""},{oid: generateRandomID()})
                .then(()=>{
                    return res.json({ code: 0, message:  'Payment done'})
                })
                .catch(err =>{
                    return res.json({ code: 100, message: err })
                })
            }
        })
        .catch(err => {
            return res.json({ code: 100, message: err })
        })
})

router.get('/:uid', (req, res, next)=>{
    let {uid} = req.params
    Cart.find({ cus_id: uid, oid: {$nin:""}})
    .then((result)=>{
        if(!result || result.length === 0){
            return res.json({ code: 1, message: 'Empty list'})
        }
        return res.json({ code: 0, message: 'Fetch order successfully', data: result})
    })
    .catch(err =>{
        return res.json({ code: 100, message: err })
    })
})

router.get('/:uid/:oid', (req, res, next)=>{
    let {uid,oid} = req.params
    Cart.find({ cus_id: uid, oid: oid})
    .then((result)=>{
        if(!result || result.length === 0){
            return res.json({ code: 1, message: 'Empty list'})
        }
        return res.json({ code: 0, message: 'Fetch order successfully', data: result})
    })
    .catch(err =>{
        return res.json({ code: 100, message: err })
    })
})

function generateRandomID(){
    return Math.floor(Math.random() * 10000000).toString();
}



module.exports = router;