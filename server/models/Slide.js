const mongoose = require('mongoose');

const SlideSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tags:{
        type:[{
            name:{
                type:String
            },
            bg: {
                type: String,
                default: '4B4949'
            },
            text_color: {
                type: String,
                default: 'FFFFFF'
            }
        }],
        required:true
    },
    url:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    author:{
        type:String,
        default:'Sourav Shrestha'
    }
});

module.exports = mongoose.model('Slides', SlideSchema)