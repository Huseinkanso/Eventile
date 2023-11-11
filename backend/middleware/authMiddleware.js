import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const protect = asyncHandler(async (req, res, next) => {
    let token=req.cookies.token;
    if(token)
    {
        try {
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            // select('-password')   without password
            req.user=await User.findById(decoded.userId).select('-password')
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }else 
    {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
    

})

const speaker=asyncHandler(async(req,res,next)=>{
    if(req.user && req.user.type==='speaker'){
        next()
    }
    else{
        res.status(401)
        throw new Error('Not authorized as a speaker')
    }
})


const admin = asyncHandler(async (req, res, next) => {
    if(req.user && req.user.type==='admin'){
        next()
    }
    else{
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
})

export {protect,admin,speaker}