const { Configuration, OpenAIApi } = require("openai");
const cloudinary = require('cloudinary').v2;
const Image = require('../Models/Image')
const User = require('../Models/User')
const jwt = require('jsonwebtoken')

require('dotenv').config()

// Cloudinary Configuration 
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// OPENAI Configuration
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

const createImage = async (req, res) =>{
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
      const task = await Image.create({name:req.body.name, prompt: req.body.prompt, photo:photoURL.url})
      return res.status(200).json({userentry: task})
    }
    return res.status(400).json({error: "Information In complete"})
  } catch (error) {
    res.status(400).json({err: error.errors.task.message})
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

const signUp = async (req, res) => {
  const {email, password, name} = req.body
  try {
    const user = await User.Signup(email, password, name)
    const payload = {email: user.email}
    const access_token = jwt.sign(payload, process.env.SECRET)
    res.status(200).json({user:user, token:access_token})
  } catch (error) {
    res.status(406).json({error})
  }
}

const login = async (req, res) => {
  const {email, password} = req.body
  try {
    const user = await User.Login(email, password)
    const payload = {email: user.email}
    const access_token = jwt.sign(payload, process.env.SECRET)
    res.status(200).json({user:user, token:access_token})
  } catch (error) {
    res.status(406).json({error})
  }
}

const tokenAuthorization = (req, res, next) => {
  const Authtoken = req.headers["x-access-token"]

  jwt.verify(Authtoken, process.env.SECRET, (err, user)=> {
      if(err) return res.status(400).send("Invalid Token")
      req.body.user = user
      next()
  })
}

const likeImage = async (req, res) => {
  try {
    const like = req.body.likes
    const userName = req.body.userName
    let updated_list = []
    const update = await Image.updateOne({_id: req.params.id}, {Likes: like})
    if(userName){
      const user = await User.findOne({name: userName})
      updated_list = user.likedImages.includes(req.params.id) ? user.likedImages.filter((a) => a != req.params.id) : [...user.likedImages,req.params.id]
      const update_user = await User.updateOne({name: userName}, {likedImages: updated_list})
    }
    res.status(200).json({like, updated_list})
    
  } catch (error) {
    res.status(406).json({error})
  }
}

const likedImages = async (req, res) => {
  try {
    const user = await User.findOne({name: req.params.name})
    res.status(200).json(user.likedImages)
  } catch (error) {
    res.status(406).json(error)
  }
}

module.exports = {createImage, shareImage, getImage, signUp, login, tokenAuthorization, likeImage, likedImages}
