const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Slide = require('../models/Slide')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
var multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'server/routes/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, "temp.jpg")
    },
    limits: { fieldSize: 25 * 1024 * 1024 }
})

var upload = multer({ storage: storage })

const db = 'mongodb://localhost:27017/place2be'

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log("Error")
    } else {
        console.log("Connected to server")
    }
})

router.get('/recentSlides', async (req, res) => {
    try {
        const slides = await Slide.find().limit(220)
        res.json(slides)
    } catch (err) {
        res.json({ message: err })
    }
})

router.post('/upload', async (req, res) => {
    const slide = new Slide({
        title: req.body.title,
        url: req.body.url,
        description: req.body.description,
        tags: req.body.tags,
    })
    try {
        const savedSlide = await slide.save()
        res.json(savedSlide)
    } catch (err) {
        res.json({ message: err })
    }
})

router.post('/save_image', upload.single('slide-image'), (req, response) => {
    // console.log(req.file.originalname)
})

router.post('/image_upload', (req, response) => {
    var imgur = require('imgur-upload')
    var img
    path = require('path')
    imgur.setClientID("ed351b08be985a5")
    imgur.upload(path.join(__dirname, 'uploads/temp.jpg'), async function (err, res) {
        if (await res && res.success) {
            img = res.data.link
            response.json({ link: img })
        }
    })
})

router.get('/profile', verifyToken, (req, res) => {
    res.json({ login: "Okay" });
});

router.get('/tags', async (req, res) => {
    try {
        console.log("tags");
        const tags = await Slide.aggregate([{ $project: { _id: 0, tags: 1 } }, { $unwind: "$tags" }, { $group: { _id: "$tags" } }])
        res.json(tags)
    } catch (err) {
        res.json({ message: err })
    }
})

router.post('/signup', (req, res) => {
    const user_ = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        contact_number: req.body.contact_number,
        gender: req.body.gender
    })
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            console.log(err)
        } else {
            if (user == null) {
                user_.save((err, registeredUser) => {
                    if (err) console.log(err)
                    else {
                        let payload = { subject: registeredUser._id }
                        let token = jwt.sign(payload, 'secretKey')
                        res.status(200).send({ token })
                    }
                })
            }
            else
                res.status(401).send('Already exists')
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({ email: userData.email }, (err, user) => {
        if (err) console.log(err)
        else {
            if (!user) {
                res.status(401).send('Invalid Email')
            }
            else if (user.password !== userData.password) {
                res.status(401).send('Invalid Password')
            }
            else {
                let payload = { subject: user._id }
                let token = jwt.sign(payload, 'secretKey')
                const user_ = JSON.stringify(user)
                res.status(200).send({ token, user: user_ })
            }
        }
    })
})

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    try {
        let payload = jwt.verify(token, 'secretKey')
        if (!payload) {
            return res.status(401).send('Unauthorized request')
        }
        req.userId = payload.subject
        next()
    } catch (err) {
        return res.status(401).send('Unauthorized request')
    }
}

router.get('/search?:keyword', async (req, res) => {
    try {
        var name_ = req.query.keyword;
        if (name_ != '') {
            var query = {}
            // query['name'] = {$regex:".*"+name_+".*", $options: "i"}
            query['name'] = { $regex: "^" + name_ + "$|^" + name_ + " .*$| " + name_ + "$", $options: "i" }
            const people = await User.find(query)
            res.json(people)
        }
        else
            res.send({ result: false })
    } catch (err) {
        res.json({ message: err })
    }
});

router.get('/suggestion?:keyword', async (req, res) => {
    try {
        var name_ = req.query.keyword;
        if (name_ != '') {
            var query = {}
            query['name'] = { $regex: ".*" + name_ + ".*", $options: "i" }
            const people = await User.find(query).limit(7)
            res.json(people)
        }
        else
            res.send({ result: false })
    } catch (err) {
        res.json({ message: err })
    }
});

module.exports = router