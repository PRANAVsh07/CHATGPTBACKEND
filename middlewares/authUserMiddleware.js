import jwt from "jsonwebtoken";
import User from "../model/userSchema.js";







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
          const existingUser = await User.findById(payload.id);
          if(!existingUser){
              return res.status(401).json({
                  message:"Unauthorized"
              })
          }
          req.user=existingUser;
          next();
    }
   catch(err){
       return res.status(401).json({
           message:"Unauthorized"
       })
   }
}

export  default authUserMiddleware;