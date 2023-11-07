var express = require('express');
var router = express.Router();
const Objective = require('../../models/okr/objective')

const o_data_sample = require('../../samples/okr/objective')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.end('This is Objective api ')
});

router.get('/init',(req,res)=>{
    Objective.find({})
    .then((result)=>{
        if(!result || result.length === 0){
            try {
                Objective.insertMany(o_data_sample.getSampleData)
            }
            catch (err) {
                console.log(err)
                return res.json({ code: 100, message: err.message })
            }
            return res.json({ code: 0, message: 'Initialize data successfully.' })
        }
        return res.json({ code: 1, message: 'List is not empty'})
    })
})

router.get('/all',(req,res)=>{
    Objective.find({})
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
  console.log("POST add objective")
  console.log(req.body)
  return res.json({code: 100,message: "Something went wrong, we can't add objective."})
  
})

router.post('/update',(req,res)=>{
  console.log("POST update objective")
  console.log(req.body)
  return res.json({code: 100,message: "Something went wrong we can't update user."})
})

router.post('/delete',(req,res)=>{
    console.log("POST delete objective")
    console.log(req.body)
    return res.json({code: 100,message: "Something went wrong we can't update user."})
  })

router.get('/:uid',(req,res)=>{
  let id = req.params.uid
  console.log("id here: "+id)
  Objective.find({ uid: id })
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

module.exports = router;
