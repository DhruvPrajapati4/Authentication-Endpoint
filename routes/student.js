const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'This is a student GET request!'
    });
});

router.post('/',(req,res,next)=>{
    res.status(200).json({
        message:'This is a student POST request!'
    });
});

module.exports = router;
