const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    name:String,
    email:String,
    rollno:String,
    gender:String,
    age:Number
});

module.exports = mongoose.model('Student',studentSchema);