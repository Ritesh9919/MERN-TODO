import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:[3, 'Name should be grater than 3 character']
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
}, {timestamps:true});


userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
    next()
})


userSchema.methods.isPasswordCurrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = function() {
    const token = jwt.sign({userId:this._id}, process.env.JWT_SECRET, {expiresIn:'1h'});
    return token;
}


export const User = mongoose.model('User', userSchema);
