const mongoose = require('mongoose')

const ImageSchema = mongoose.Schema({
    userName:String,
    img:String
})

const Image = mongoose.model("Image", ImageSchema)
export default Image