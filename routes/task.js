var express = require('express');
var router = express.Router();
const Task = require('../models/task')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('This is task api.');
  Task({uid: '123',title: 'title ne',description: 'here is descr',status: 'Not yet',createdAt: new Date().toDateString() +" at "+new Date().toLocaleTimeString()})
  .save()
});

router.get('/all',(req,res)=>{
    Task.find({})
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
  console.log("POST add")
  console.log(req.body)
  return res.json({code: 100,message: "Something went wrong, we can't add user."})
  
})

router.post('/update',(req,res)=>{
  console.log("POST update")
  console.log(req.body)
  return res.json({code: 100,message: "Something went wrong we can't update user."})
})

router.get('/:uid',(req,res)=>{
  let id = req.params.uid
  Task.findOne({ uid: id })
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
