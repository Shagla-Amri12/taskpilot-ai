import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({
    apiKey:
        import.meta.env.VITE_GEMINI_API_KEY
        
})
console.log("KEY:", import.meta.env.VITE_GEMINI_API_KEY)

export async function generatePlan(task,difficulty){

const prompt=`

Task:
${task}

Difficulty:
${difficulty}

Give:

1. Short plan
2. Schedule
3. Motivation

`

const response=

await fetch(

`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
import.meta.env.VITE_GEMINI_API_KEY
}`,

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

contents:[

{

parts:[

{
text:prompt
}

]

}

]

})

}

)

const data =
await response.json()

console.log("FULL RESPONSE:",data)

if(data.error){

return data.error.message

}

return(

data?.candidates?.[0]
?.content
?.parts?.[0]
?.text

||

"No response"

)
}