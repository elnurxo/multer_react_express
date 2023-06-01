const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const multer = require("multer");
const uuid = require('uuid');
const fs = require('fs');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
const DIR = './uploads/';
app.use('/uploads', express.static('uploads'));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuid.v4() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
dotenv.config()
app.use(cors())

//Schema
const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    profileImg: String
})

const EmployeeModel = new mongoose.model('Employees',EmployeeSchema);


app.get('/api',(req,res)=>{
   res.send('welcome to our API!')
})

app.get('/api/employees',async(req,res)=>{
    const employees = await EmployeeModel.find();
    res.json(employees);
})

app.post('/api/employees',upload.single('profileImg'),async(req,res)=>{
    const url = req.protocol + '://' + req.get('host');
    const newEmployee = new EmployeeModel({
        name: req.body.name,
        profileImg: url + '/uploads/' + req.file.filename
    })
    newEmployee.save().then(result => {
        res.status(201).json({
            message: "Employee posted successfully!",
            userCreated: newEmployee
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})
app.delete('/api/employees/:id',async(req,res)=>{
    const id = req.params.id;
    const deleted = await EmployeeModel.findByIdAndDelete(id);
    const idx = deleted.profileImg.indexOf("uploads/");
    const imageName = deleted.profileImg.substr(idx);
    fs.unlinkSync('./'+imageName);
    res.status(200).send({
        message: 'deleted successfully!'
    })
})


app.listen(7070,()=>{
    console.log('App running on port 7070');
})
mongoose.connect('mongodb+srv://elnur_admin:Admin123@spotify.wmxixvo.mongodb.net/?retryWrites=true&w=majority')
.then((res)=>{
    console.log('MongoDB connected successfully!');
})
