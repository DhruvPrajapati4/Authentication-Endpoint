const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    name:String,
    email:String,
    gender:String,
    age:Number
});

module.exports = mongoose.model('Student',tutorSchema);