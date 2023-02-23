const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:[20,"Username should not exceed 20 characters"]
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

UserSchema.statics.Login = async function Login(email, password){
    if(!email || !password){
        throw('All input Fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw('Email not valid')
    }
    const user = await this.findOne({email})
    if(!user){
        throw('Email not found')
    }
    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw('Password Incorrect') 
    }
    return user
}

UserSchema.statics.Signup = async function Signup(email, password, name){
    if(!email || !password || !name){
        throw('All input Fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw('Email not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw('Password is weak')
    }
    const match = await this.findOne({email})
    
    if(match){
        throw('Email is already present')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({email,password:hash, name})

    return user
}

module.exports = mongoose.model("User", UserSchema)
