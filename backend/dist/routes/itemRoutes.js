import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { generateChatCompletion } from "../controllers/chat-controller.js";
const chatRoutes = Router();
chatRoutes.post("/", verifyToken, generateChatCompletion);
export default chatRoutes;
//# sourceMappingURL=itemRoutes.js.map