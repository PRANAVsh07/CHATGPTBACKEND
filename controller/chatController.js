   import Chat from "../model/chatschema.js";
import userRouter from "../routes/userRoute.js";
import Message from "../model/messageschema.js"

   
   
   
   
   
   export const getRecentChat = async(req , res)=>{
    try{
       const chats= await Chat.find({userId:req.user._id}).select("topic  updatedAt ").sort({updatedAt:-1}).limit(20);
        
       res.status(200).json({
        message:"your all chat ",
        chats
       })


    }

    catch(err){
console.log(err);
    res.status(500).json({
        message:"internal server error",
    })
}
    }



export const getSingleChat = async(req , res)=>{
    try{
        const {chatId} = req.params;

      const chat= await Chat.findOne({
        _id:chatId ,
        userId: req.user._id
    });

        if(!chat){
           return res.status(404).json({
                message:"you are  not allowed"
            })
        }

        res.status(200).json({
            chatId: chat._id,
            userId:chat.userId,
            topic: chat.topic,
            usage:chat.usage
        })
}   


    catch(err){
console.log(err);
    res.status(500).json({
        message:"internal server error",
    })
}
 
}






  export const createChat = async(req , res)=>{
    try{
        const {model} = req.body

        if(!model){
            return res.status(400).json({
                message:"model name is missing"
            })
        }
     const chats=   await Chat.create({
     userId:req.user._id,
     model,
        })
        res.status(201).json({
            chatId:chats._id,
           userId:req.user._id,
                model,
                topic:chats.topic,
                createdAt:chats.createdAt
        })
    }

    catch(err){
    console.log(err);
    res.status(500).json({
        message:"internal server error",
    })
}
}


 export const deleteChat = async(req , res)=>{
    try{
   const {chatId} = req.params;

   //kya ye posy esse user ke hae
  const chat = await Chat.findOne({_id:chatId , userId:req.user._id});
  
  if(!chat){
    
return res.status(403).json({
    message:"you are not allowed to do this"
});

  }
  await Chat.deleteOne({
    _id: chatId
  });
  await Message.deleteMany({
    chatId: chat._id
  })

  res.status(200).json({
    message:"your chat is deleted is successfully"
  })


   
    }
    catch(err){
        console.log(err),
        res.status(400).json({
            message:"internal server error"
        })
    }
}