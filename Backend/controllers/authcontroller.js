const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../models/user-model');
const registereduser=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json('Server Error');
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(300).json('Invalid email/password');
        }
        const token=jwt.sign({id:user._id},`${process.env.SECRET}`);
        res.status(200).json({
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        });
    }catch(error){
        return res.status(400).json('Server Error');
    }
}
const newuser=async(req,res)=>{4
    try{
        const{name,email,password}=req.body;
        const isexist=await User.findOne({email});
        if(isexist){
            return res.status(400).json('User alreday exist');
        }
        const hashedpassword=await bcrypt.hash(password,parseInt(process.env.Salt_Rounds));
        const user=await new User({
            name,
            email,
            password:hashedpassword
        });
        const token=jwt.sign({id:user._id},`${process.env.SECRET}`);
        if(!user){
            return res.status(400).json('Wrong Details');
        }
        return res.status(200).json({
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        });
    }catch(error){
        return res.status(400).json('Server Error');
    }
}
module.exports={registereduser,newuser};