const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Student = require('../models/studentModel');

//GET all students' data
router.get('/',(req,res,next)=>{
    Student.find()
    .then(result=>{
        res.status(200).json({
            studentData:result
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
});

//GET particular student's data
router.get('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Student.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            student:result
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
});

//Add student
router.post('/',(req,res,next)=>{
    const student = new Student({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        email: req.body.email,
        rollno: req.body.rollno,
        gender: req.body.gender,
        age: req.body.age
    });
    student.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            newStudent: result
        });
    })

    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
});

//Delete Student
router.delete('/:id',(req,res,next)=>{
    const id= req.params.id;
    Student.remove({_id:id})
    .then(result=>{
        res.status(200).json({
            message:'Student Deleted!',
            studentData:result
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            message:'Something went wrong!',
            error:err
        })
    });
});

//Update student
router.put('/:id',(req,res,next)=>{
    console.log(req.params); 
    Student.findOneAndUpdate({_id:req.params.id},{
        $set:
        {
            name:req.body.name,
            email:req.body.email,
            gender:req.body.gender,
            age:req.body.age
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_student: result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
});
module.exports = router;