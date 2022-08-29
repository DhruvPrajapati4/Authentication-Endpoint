const mongoose = require('mongoose');

userSchema = new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    username:String,
    password:String,
    phone:Number,
    email:String,
    userType:String
});

module.exports = mongoose.model('User',userSchema);
