//login
//logout
//signup
// //profile
import User from "../model/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {signupSchema ,loginSchema} from"../validators/userValidator.js"
import Chat from "../model/chatschema.js"
import Message from "../model/messageschema.js";
import { redisClient } from "../config/redis.js";
const createToken  = (id,email)=>{

    if(!process.env.JWT_SECRET){
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
 const token = jwt.sign({id,email},process.env.JWT_SECRET,{ expiresIn: "1h" });
 return token
  };


  const cookieOption={
    httpOnly:true,
    secure:false,
    maxAge:60*60*1000,

  }







export const signup = async(req,res)=>{
    try{

  const result =  signupSchema .safeParse(req.body);
       if(!result.success){
        return res.status(400).json({
    message: result.error.issues[0].message
});
       }
  const {name,email,password,age}=result.data;
        
  const user =  await User.findOne({email});
  if(user){
      return res.status(409).json({
          message:"user already exists"
      })
  }
  const hashpassword = await bcrypt.hash(password,12);
  const usereCreated= await User.create({
    name,
    age,
    email,
    password:hashpassword
  });


  //token create
  //_id ,email
const token = createToken(usereCreated._id,usereCreated.email);
res.cookie("token",token,cookieOption);
res.status(201).json({
    message:"user created successfully",
    name,
    age,
    email,
});


}
    catch(err){
        // console.log(err);

         console.error("SIGNUP ERROR:", err);
        
        res.status(500).json({
            message:"error occurred"

        })
    }
}




export const login = async(req,res)=>{
try{

  const result=loginSchema.safeParse(req.body);

   
       if(!result.success){
         return res.status(400).json({
    message: result.error.issues[0].message
});
       }
  const { email, password } = result.data;

   //verify password and email
   const existingUser= await User.findOne({email});
   if(!existingUser){
    return res.status(404).json({
        message:"user not found"
    })
   }
   //matching password
   const isMatch= await bcrypt.compare(password,existingUser.password);
   if(!isMatch){
    return res.status(401).json({
        message:"invalid credentials"
    })
   }
   const token = createToken(existingUser._id,existingUser.email);
   res.cookie("token",token,cookieOption);

   res.status(200).json({
    message:"login Successfully",
    name:existingUser.name, 
    age:existingUser.age, 
    email:existingUser.email, 
    usage:existingUser.usage
    });
}
   

catch(err){
console.log(err);
res.status(500).json({
    message:"internal error",
})
}
}








export const logout = async (req,res)=>{
    // logut
    try{

        if(req.token){
            const token = req.token;
            const payload = req.tokenPayload;

            const currentTime = Math.floor(Date.now() / 1000);
            const remainingTime = payload.exp - currentTime;

            if (remainingTime > 0) {
                await redisClient.set(
                    `blocklist:${token}`,
                    "blocked",
                    {
                        EX: remainingTime
                    }
                );
            }
        }

        res.clearCookie("token",{
            httpOnly: true,
            secure: false,
        })

        res.status(200).json({
            message: "User Logged Out Successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}




//mere profile mujhey he dekhe



 
   



export const profile = async(req,res)=>{
    try{
        
  res.status(200).json({
    name:req.user.name,
    age:req.user.age,
    email:req.user.email,
    usage:req.user.usage
  })

 
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"internal server error"
        })
    }
}



export const deleteAccount = async (req,res)=>{
    try{
        
        // find all the chatID which belong to user

        // Delete all the messages which belongs to the chatID: Messages Delete
        // Delete all the chatID which belong to this user: Delete wo ChatID; user belong
        // Delete user Profile: is user By its ID
        
    const userId = req.user._id;


    await Message.deleteMany({
      userId
    });

    await Chat.deleteMany({
      userId
    });

    await User.deleteOne({
      _id: userId
    });

    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
    });

    res.status(200).json({
      message: "Account deleted successfully"
    });
    }
    catch(err){
        res.status(500).json({
            messages: "Internal Server Error"
        })
    }
}
