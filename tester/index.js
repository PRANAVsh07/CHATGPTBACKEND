
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import readlineSync from "readline-sync";

dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const History = [];

async function chatApp(question) {

    History.push({
        role: "user",
        parts: [
            {
                text: question
            }
        ]
    });

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: History
    });

    const answer = response.text;

    History.push({
        role: "model",
        parts: [
            {
                text: answer
            }
        ]
    });

    console.log("\nGemini:", answer);
}

while (true) {

    const question = readlineSync.question(
        "Ask me anything:--> "
    );

    if (question.toLowerCase() === "exit") {
        break;
    }

    await chatApp(question);
}

