import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({
    apiKey:
        import.meta.env.VITE_GEMINI_API_KEY
})

export async function generatePlan(
    task,
    date,
    difficulty
) {

    return `

Task:
${task}

Deadline:
${date}

Difficulty:
${difficulty}

AI Suggestion:

Focus on the highest impact work first.
Break into small steps.
Complete before deadline.

`

}