
import authUserMiddleware from "../middlewares/authUserMiddleware.js";
import  express from"express";
import { getMessage ,sendMessage } from "../controller/messageController.js";

const messageRouter  =express.Router();

messageRouter.use(authUserMiddleware);



//get message


messageRouter.post("/",sendMessage);
messageRouter.get("/:chatId" ,getMessage);
messageRouter.post("/:chatId",sendMessage);







export default messageRouter;