const { Configuration, OpenAIApi } = require("openai");
const cloudinary = require('cloudinary').v2;
const Image = require('../Models/Image')

// const { MongoClient } = require("mongodb");
// const mongoClient = new MongoClient(process.env.MONGODB_URL);
// const clientPromise = mongoClient.connect();

require('dotenv').config()

// Cloudinary Configuration 
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const createImage = async (req, res) =>{
  // OPENAI Configuration
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createImage({
      prompt: req.body.prompt,
      n:1,
      size: "512x512",
      response_format: "b64_json",
    });

    res.status(200).json({photo: response.data.data[0].b64_json})
}

const shareImage = async (req, res) => {
  try {
    if (req.body.name && req.body.prompt && req.body.photo){
      const photoURL = await cloudinary.uploader.upload(req.body.photo)
      console.log(photoURL)
      const task = await Image.create({name:req.body.name, prompt: req.body.prompt, photo:photoURL.url})
      return res.status(200).json({userentry: task})
    }
    return res.status(500).json({error: "Information In complete"})
  } catch (error) {
    res.status(400).json(error.errors.task.message)
  }
}

const getImage = async (req, res) => {
  try {
    const posts = await Image.find()
    res.status(200).json({posts:posts})
  } catch (error) {
    res.status(500).json({err: error})
  }
}

module.exports = {createImage, shareImage, getImage}