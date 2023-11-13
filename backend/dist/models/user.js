import mongoose from "mongoose";
import { randomUUID } from "crypto";
const chatsSchema = new mongoose.Schema({
    id: {
        type: String,
        default: randomUUID(),
    },
    // Role is bascially the user
    role: {
        type: String,
        required: true,
    },
    // This is the user message
    content: {
        type: String,
        required: true,
    },
});
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    chats: [chatsSchema],
});
export default mongoose.model("User", userSchema);
//# sourceMappingURL=User.js.map