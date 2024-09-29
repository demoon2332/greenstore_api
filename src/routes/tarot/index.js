import express from 'express';
const router = express.Router();

//model


// another



// routes
router.get('/',(req,res)=>{
    res.render('tarot/index');
})

router.get('/random',(req,res)=>{
    return res.json({message:"This is random tarot card"})
})

router.get('/:id',(req,res)=>{
    return res.json({message: "this is get by id"+req.params.id})
})

router.post('/search',(req,res)=>{
    return res.json({message: "This is search tarot"})
})

// this api will change per day
router.post('/chosen',(req,res)=>{

})


export default router;