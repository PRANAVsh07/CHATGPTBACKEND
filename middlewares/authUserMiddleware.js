import jwt from "jsonwebtoken";
import User from "../model/userSchema.js";
import { redisClient } from "../config/redis.js";
import { hasTokenLimitReached } from "../utils/userUsage.js";






const authUserMiddleware = async(req,res,next)=>{
    //authentication logic here
    try{
        const {token}=req.cookies;

        if(!token){
            return res.status(400).json({
                message:"you need to login first"
            })
        }

       const payload= jwt.verify(token,process.env.JWT_SECRET);
        const blockedToken =await redisClient.hExpireTime(
            `blocklist:${token}`
        );

        if(blockedToken){
            return res.status(401).json({
                message:"please login again"
            })
        }
          const existingUser = await User.findById(payload.id);
          if(!existingUser){
              return res.status(401).json({
                  message:"Unauthorized"
              })
          }
          req.user=existingUser;
          req.token = token,
          req.tokenPayload = payload;
          next();
    }
   catch(err){
       return res.status(401).json({
           message:"Unauthorized"
       })
   }
}

export  default authUserMiddleware;