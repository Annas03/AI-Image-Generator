const mongoose = require('mongoose')

const ImageSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name must be present"],
        trim:true,
        maxlength:[20,"should not exceed 20 characters"]
    },
    prompt:String,
    photo:String,
    Likes:{type:Number}
})

module.exports = mongoose.model("Image", ImageSchema)
