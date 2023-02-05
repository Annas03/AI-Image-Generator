const { Configuration, OpenAIApi } = require("openai");
const cloudinary = require('cloudinary').v2;
require('dotenv').config()

// OPENAI Configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Cloudinary Configuration 
cloudinary.config({
  cloud_name: "dxl2vlar6",
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const createImage = async (res, req) =>{
    try {
        const response = await openai.createImage({
          prompt: req.body.prompt,
          n:1,
          size: "512x512",
          response: 'b64_json',
        });
        res.status(200).json({photo: response.data.data[0].b64_json})
        
        // const res = cloudinary.uploader.upload(response.data.data[0].b64_json, {public_id: req.body.prompt})
        // res.then(()=>console.log('success')).catch((err) => console.log(err))
    } catch (error) {
        
    }

}

module.exports = {createImage}