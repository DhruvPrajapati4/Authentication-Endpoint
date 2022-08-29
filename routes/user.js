const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/userModel');

router.get('/',(req,res,next)=>
{
    User.find()
    .then(result=>{
        res.status(200).json({
            userData:result
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
});

router.post('/signUp',(req,res,next)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err)
        {
            return res.status(500).json({
                error:err
            })
        }
        else
        {
            const user  = new User({
                _id: new mongoose.Types.ObjectId,
                username: req.body.username,
                password: hash,
                phone: req.body.phone,
                email:req.body.email,
                userType:req.body.userType
            });
            user.save()
            .then(result=>{
                console.log(result);
                res.status(200).json({
                    newUser: result
                });
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            })
        }
    })
});

router.post('/login',(req,res,next)=>{
    User.find({username:req.body.username})
    .exec()
    .then(user=>{
        if(user.length<1)
        {
            return res.status(401).json({
                message:'User doesn\'t exist!'
            });
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(!result)
            {
                return res.status(401).json({
                    message:'Password doesn\'t match!'
                });
            }
            if(result)
            {
                const token = jwt.sign({
                    username: user[0].username,
                    userType:user[0].userType,
                    email:user[0].email,
                    phone:user[0].phone
                },
                'this is a dummy text',
                {
                    expiresIn:"24h"
                }
                );
                res.status(200).json({
                    username: user[0].username,
                    userType: user[0].userType,
                    email:user[0].email,
                    phone:user[0].phone,
                    token: token
                });
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
});

module.exports = router;