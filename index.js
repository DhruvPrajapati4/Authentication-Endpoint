const express = require('express');
const userRoute = require('./routes/user.js');
const tutorRoute = require('./routes/tutor.js');
const studentRoute = require('./routes/student.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const port = process.env.PORT || 5000;
const app = express();

mongoose.connect('mongodb+srv://dhruv:1772@dhruv.nz6yfjr.mongodb.net/?retryWrites=true&w=majority');
mongoose.connection.on('error',err=>
{
    console.log('connection failed!');
});
mongoose.connection.on('connected',connected=>{
    console.log('connected with database!');
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//tutor route to access all students' data
app.use('/tutor',tutorRoute);

//student route
app.use('/student',studentRoute);

//user route for authentication
app.use('/user',userRoute);


app.get('/',(req,res)=>{
    const message = 'Hello!Welcome to the Classroom!\nSignUp or Login using \'user\' route';
    res.send(message);
});

//handling bad url
app.use((req,res,next)=>{
    res.status(404).json({
        error:'bad request!'
    });
});


app.listen(port,()=>console.log(`Server is running on port: http://localhost:${port}`));