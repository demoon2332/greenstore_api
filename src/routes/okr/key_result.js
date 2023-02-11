var express = require('express');
var router = express.Router();
const KeyResult = require('../../models/okr/key_result');
const objective = require('../../models/okr/objective');

const o_data_sample = require('../../samples/okr/key_result')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.end('This is Key Result api')
});

router.get('/init',(req,res)=>{
    KeyResult.find({})
    .then((result)=>{
        if(!result || result.length === 0){
            try {
                KeyResult.insertMany(o_data_sample.getSampleData)
            }
            catch (err) {
                console.log(err)
                return res.json({ code: 100, message: err.message })
            }
            return res.json({ code: 0, message: 'Initialize data successfully.' })
        }
        return res.json({ code: 1, message: 'List Key Result is not empty'})
    })
})

router.get('/:uid',(req,res)=>{
    let id = req.params.uid
    KeyResult.find({ oid: id })
        .then(result => {
            if (!result) {
                return res.json({ code: 1, message: 'No data' })
            }
            return res.json({ code: 0, message: 'fetch product successfully', data: result })
        })
        .catch(err => {
            return res.json({ code: 100, message: err })
        })
})

router.post('/add',(req,res)=>{
    console.log("POST add key result")
    console.log("Authentication header")
    console.log(req.header('Authorization'));
    console.log(req.body)
    let item = req.body.item
    KeyResult({
        oid: req.body.oid,
        uid: '123',
        name: item.name,
        status: 1,
        createdAt: item.createdAt
    }).save()
    return res.json({code: 0,message: "Create item successfully."})
})

router.post('/update',(req,res)=>{
    console.log("POST update key result")
    console.log(req.body)
    return res.json({code: 100,message: "Something went wrong we can't update user."})
  })
  
  router.post('/delete',(req,res)=>{
      console.log("POST delete key result")
      console.log(req.body)
      return res.json({code: 100,message: "Something went wrong we can't update user."})
    })

module.exports = router;
