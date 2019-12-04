const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Slide = require('../models/Slide');
var multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'server/routes/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, "temp.jpg")
    },
    limits: { fieldSize: 25 * 1024 * 1024 }
});

var upload = multer({ storage: storage });

const db = 'mongodb://localhost:27017/place2be';

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
    if(err){
        console.log("Error");
    }else{
        console.log("Connected to server");
    }
});

router.get('/recentSlides', async (req, res)=>{
    try{
        const slides = await Slide.find().limit(220);
        res.json(slides);
    }catch(err){
        res.json({message: err});
    }
});

router.post('/upload', async (req, res)=>{
    const slide = new Slide({
        title: req.body.title,
        url: req.body.url,
        description: req.body.description,
        tags: req.body.tags,
    });
    try{
        const savedSlide = await slide.save();
        res.json(savedSlide);
    }catch(err){
        res.json({message: err});
    }
});  

router.post('/save_image', upload.single('slide-image'),(req, response) =>{
    // console.log(req.file.originalname);
});

router.post('/image_upload', (req, response) =>{
    var imgur = require('imgur-upload');
    var img;
    path = require('path');
    imgur.setClientID("ed351b08be985a5");
    imgur.upload(path.join(__dirname, 'uploads/temp.jpg'),async function(err, res){
        if(await res && res.success){
            img = res.data.link;
            response.json({link: img});
        }
    });
});

router.get('/tags', async (req, res)=>{
    try{
        const tags = await Slide.aggregate([{$project:{_id: 0, tags: 1}},{$unwind:"$tags"},{$group:{_id:"$tags"}}]);
        res.json(tags);
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;