var express = require('express');
var router = express.Router();
const User = require('../models/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup',(req,res)=>{
  console.log("POST sign up")
  console.log(req.body)
  let {name,uid,email,phone} = req.body
  console.log("Phone",!phone)
  if(!name || !uid || (!email && !phone) ){
    return res.json({code: 1,message: 'Please complete all information.'})
  }

const d_t = new Date(); 
let year = d_t.getFullYear();
let month = ("0" + (d_t.getMonth() + 1)).slice(-2);
let day = ("0" + d_t.getDate()).slice(-2);
let hour = d_t.getHours();
let minute = d_t.getMinutes();

// prints date & time in YYYY-MM-DD HH:MM:SS format
let createdAt = day+"-"+month+"-"+year+" "+hour + ":" + minute 
console.log(year + "-" + month + "-" + day + " " + hour + ":" + minute );
  User({uid: uid,name: name,phone: phone,email: email,createdAt: createdAt}).save()
  .then(function(){
    return res.json({code: 0,message: "Add user successfully."})
  })
  .catch(err=>{
    return res.json({code: 100,message: "Something went wrong, we can't add user."})
  })
})

router.post('/update',(req,res)=>{
  console.log("POST update")
  console.log(req.body)
  let {uid,name,address} = req.body
  if((!name || name.length < 1) && (!address || address.length < 1)){
    return res.json({code: 1,message: 'Please complete all information.'})
  }
  let filter = {uid: uid}
  let update = {name,address}
  if(!name || name.length < 1 ){
    update = {address: address}
  }
  else if(!address || address.length < 1){
    update = {name: name }
  }

  User.findOneAndUpdate(filter,update)
  .then(result=>{
    return res.json({code: 0,message: "Update user successfully."})
  })
  .catch(err=>{
    console.log(err)
    return res.json({code: 100,message: "Something went wrong we can't update user."})
  })
})

router.get('/:uid',(req,res)=>{
  let id = req.params.uid
  User.findOne({ uid: id })
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
