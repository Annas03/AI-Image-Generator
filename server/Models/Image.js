const mongoose = require('mongoose')

const ImageSchema = mongoose.Schema({
    userName:String,
    img:String
})

module.exports = mongoose.model("Image", ImageSchema)