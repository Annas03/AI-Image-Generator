const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')

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
    },
    likedImages:{type:Array}
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
    const match = bcryptjs.compareSync(password, user.password);

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
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(password, salt)
    const user = await this.create({email,password:hash, name})

    return user
}

module.exports = mongoose.model("User", UserSchema)
