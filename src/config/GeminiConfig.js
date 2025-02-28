import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyAgD-VM5ZA4svSBdPvtJCC-OFgLVuPIb0Q";

export const useAi = async(prompts) =>{
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
        const prompt = prompts;
    
        const result = await model.generateContent(prompt);
       return {data : result.response.text()};
}