const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Slide = require('../models/Slide');

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
        const slides = await Slide.find().limit(6);
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

module.exports = router;