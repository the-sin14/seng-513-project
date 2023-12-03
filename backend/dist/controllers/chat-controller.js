import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";

// import { configureOpenAI } from "../config/openai-config.js";
// import { OpenAIApi } from "openai";

export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "user not registered" });
        }
        const chats = user.chats.map(({ role, content }) => {
            const adjustedRole = role === 'ai' ? 'assistant' : role;
            // Include an optional 'name' property, modify as needed
            let name;
            if (role === 'user') {
                name = 'UserName'; // Replace with actual user name if available
            }
            return {
                role: adjustedRole,
                content,
                name, // Include the name property
            };
        });
        // Add the new user message
        // When adding a new user message
        chats.push({
            role: 'user',
            content: message,
            name: 'UserName' // Replace 'UserName' with actual user name or a suitable default
        });
        user.chats.push({
            role: 'user',
            content: message,
            // No need to add 'name' here as this is for your internal database, not for the OpenAI API
        });
        const openai = configureOpenAI();
        const chatResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        console.log('Chat Detailed Message:', chatResponse.choices[0].message);
        if (chatResponse && chatResponse.choices && chatResponse.choices.length > 0) {
            const responseMessage = chatResponse.choices[0].message.content;
            user.chats.push({ content: responseMessage, role: 'assistant' });
            await user.save();
            return res.status(200).json({ response: chatResponse, chats: user.chats });
        }
        else {
            throw new Error('Invalid response structure from OpenAI');
        }
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: "Something went wrong!", error: error.message });
    }
};
// import User from "../models/User.js";
// import { configureOpenAI } from "../config/openai-config.js";
// export const generateChatCompletion = async (req, res, next) => {
//     // getting the message
//     const { message } = req.body;
//     try {
//         const user = await User.findById(res.locals.jwtData.id);
//         if (!user) {
//             return res.status(401).json({ message: "user not registered" });
//         }
//         // grab chats of the users
//         // const chats = user.chats.map(({ role, content }) => ({ role, content }));
//         // chats.push({ role: "user", content: message });
//         // Grab chats of the users and ensure they have the correct structure
//         const chats = user.chats.map(({ role, content }) => {
//             // Ensure that 'role' is one of the valid roles
//             if (['system', 'assistant', 'user', 'function'].includes(role)) {
//             return { role, content };
//             }
//             // If 'role' is not valid, you might choose to skip this entry or set a default role
//             return { role: 'user', content }; // Set a default role if the original one is invalid
//         });
//         // Add the new user message to the chats array
//         chats.push({ role: "user", content: message });
//         user.chats.push({ role: "user", content: message });
//         console.log('Sending these chats to OpenAI:', chats);
//         // send all chats with new one to API
//         const openai = configureOpenAI();
//         const chatResponse = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo",
//             messages: chats,
//         });
//         // Log the detailed message for debugging
//         console.log('Chat Detailed Message:', chatResponse.choices[0].message);
//         // Handle the response
//         if (chatResponse && chatResponse.choices && chatResponse.choices.length > 0) {
//             // Accessing the message content
//             const responseMessage = chatResponse.choices[0].message.content; // Extracting just the content string
//             user.chats.push({ content: responseMessage, role: 'ai' });
//             await user.save();
//             return res.status(200).json({ response: chatResponse, chats: user.chats });
//         } else {
//             throw new Error('Invalid response structure from OpenAI');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         return res.status(500).json({ message: "Something went wrong!", error: error.message });
//     }
// };
// //# sourceMappingURL=chat-controller.js.map
//# sourceMappingURL=chat-controller.js.map