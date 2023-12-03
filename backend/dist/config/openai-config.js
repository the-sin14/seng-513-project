import { OpenAI } from 'openai';

export const configureOpenAI = () => {
    const openai = new OpenAI({
        apiKey: process.env.OPEN_AI_SECRET,
    });
    return openai;
};
// import OpenAI from 'openai';
// export const configureOpenAI = () => {
//     const openai = new OpenAI({
//         apiKey: process.env.OPEN_AI_SECRET,
//         // The 'organization' field is not needed in the new SDK version
//     });
//     return openai;
// };
// //# sourceMappingURL=openai-config.js.map
//# sourceMappingURL=openai-config.js.map