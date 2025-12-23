import { Router } from "express";
import { sendChatMessage, getConversation, deleteConversation } from "../controllers/chatController.js";

const chatRoute = Router();

chatRoute.post("/", sendChatMessage);
chatRoute.get("/:conversationId", getConversation);
chatRoute.delete("/:conversationId", deleteConversation);

export default chatRoute;