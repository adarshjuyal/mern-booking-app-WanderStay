import express,{Request,Response} from 'express';
import { check, validationResult } from 'express-validator';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const router=express.Router();

router.post("/login",
[check("email","Email is required").isEmail(),
    check("password","Password of 6 or more characters required").isLength({
        min:6,
    }),
],
async( req:Request ,res:Response)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).json({message:errors.array()});
    }
     const {email,password}=req.body;

     try{
        const user= await User.findOne({email});
        //check if user exists
        if(!user){

            return res.status(400).json({message:"Invalid Credentials"});
        }
        // if not then match the passwords
        const isMatch=await  bcrypt.compare(password,user.password);
        //if password does not match
        if(!isMatch){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        //if valid user create an access token and  return cookies
        const token=jwt.sign({userId:user.id},process.env.JWT_KEY as string,{
            expiresIn:"1d",
        });
        //cookie
        res.cookie("auth_token",token,{
            httpOnly:true,
            secure: process.env.NODE_ENV==='production',
            maxAge:86400000,
        });
        res.status(200).json({userId:user._id});

     } catch(err){
        console.log(err);
         res.status(500).json({message:"Something went wrong"});
        
     }
});
export default router;
