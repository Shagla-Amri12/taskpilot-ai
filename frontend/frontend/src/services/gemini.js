import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({
apiKey:
import.meta.env.VITE_GEMINI_API_KEY
})

export async function generatePlan(
task,
date,
difficulty
){

const response =
await ai.models.generateContent({

model:
"gemini-2.5-flash",

contents:

`
Task:
${task}

Deadline:
${date}

Difficulty:
${difficulty}

Create:
Priority
Daily Plan
Productivity Advice
`

})

return response.text

}