// import User from "../models/User.js";
// import { configureOpenAI } from "../config/openai-config.js";
// import { OpenAIApi } from "openai";
// export const generateChatCompletion = async (req, res, next) => {
//     // getting the message
//     const { message } = req.body;
//     try {
//         const user = await User.findById(res.locals.jwtData.id);
//         if (!user) {
//             return res.status(401).json({ message: "user not registered" });
//         }
//         // grab chats of the users
//         const chats = user.chats.map(({ role, content }) => ({ role, content }));
//         chats.push({ content: message, role: "user" });
//         user.chats.push({ content: message, role: user });
//         // send all chats with new one to API
//         const config = configureOpenAI();
//         const openai = new OpenAIApi(config);
//         const chatResponse = await openai.createChatCompletion({
//             model: "gpt-3.5-turbo",
//             messages: chats,
//         });
//         user.chats.push(chatResponse.data.choices[0].message);
//         await user.save();
//         return res.status(200).json({ chats: user.chats });
//     }
//     catch (error) {
//         console.log(error);
//         return res.status(500).json({ chats: "Something went wrong!" });
//     }
// };


import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
export const generateChatCompletion = async (req, res, next) => {
    // getting the message
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "user not registered" });
        }
        // grab chats of the users
        // const chats = user.chats.map(({ role, content }) => ({ role, content }));
        // chats.push({ role: "user", content: message });
        // Grab chats of the users and ensure they have the correct structure
        const chats = user.chats.map(({ role, content }) => {
            // Ensure that 'role' is one of the valid roles
            if (['system', 'assistant', 'user', 'function'].includes(role)) {
            return { role, content };
            }
            // If 'role' is not valid, you might choose to skip this entry or set a default role
            return { role: 'user', content }; // Set a default role if the original one is invalid
        });
        // Add the new user message to the chats array
        chats.push({ role: "user", content: message });
        user.chats.push({ role: "user", content: message });
        console.log('Sending these chats to OpenAI:', chats);
        // send all chats with new one to API
        const openai = configureOpenAI();
        const chatResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        // Log the detailed message for debugging
        console.log('Chat Detailed Message:', chatResponse.choices[0].message);
        // Handle the response
        if (chatResponse && chatResponse.choices && chatResponse.choices.length > 0) {
            // Accessing the message content
            const responseMessage = chatResponse.choices[0].message.content; // Extracting just the content string
            user.chats.push({ content: responseMessage, role: 'ai' });
            await user.save();
            return res.status(200).json({ response: chatResponse, chats: user.chats });
        } else {
            throw new Error('Invalid response structure from OpenAI');
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: "Something went wrong!", error: error.message });
    }
};
//# sourceMappingURL=chat-controller.js.map
