export async function generatePlan(
task,
difficulty
){

try{

const response=

await fetch(

"https://api.groq.com/openai/v1/chat/completions",

{

method:"POST",

headers:{

Authorization:
`Bearer ${
import.meta.env.VITE_GROQ_KEY
}`,

"Content-Type":
"application/json"

},

body:JSON.stringify({

model:
"llama-3.3-70b-versatile",

messages:[

{

role:"user",

content:`

Task:
${task}

Difficulty:
${difficulty}

Give:

1 Plan

2 Schedule

3 Motivation

`

}

]

})

}

)

const data=
await response.json()
console.log(data)
if(data.error){

return data.error.message

}

return(

data
?.choices?.[0]
?.message
?.content

||

"No response"

)

}

catch{

return(
"AI unavailable"
)

}

}