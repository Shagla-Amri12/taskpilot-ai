export async function generatePlan(
    task,
    difficulty
) {

    try {

        const response =

            await fetch(

                "https://api.groq.com/openai/v1/chat/completions",

                {

                    method: "POST",

                    headers: {

                        Authorization:
                            `Bearer ${import.meta.env.VITE_GROQ_KEY
                            }`,

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        model:
                            "llama-3.3-70b-versatile",
                        temperature: 0.4,

                        max_tokens: 150,

                        messages: [

                            {

                                role: "user",

                                content: `

Create a SHORT and practical task plan.

Task:
${task}

Difficulty:
${difficulty}

Rules:

1. 🎯 Goal → 1 line
2. 📌 Steps → maximum 3 points
3. 📅 Schedule → Today / Tomorrow / Final Day
4. 🔥 Motivation → 1 short sentence

Keep response under 80 words.
No explanations.
No paragraphs.
Be concise.

`

                            }

                        ]

                    })

                }

            )

        const data =
            await response.json()
        console.log(data)
        if (data.error) {

            return data.error.message

        }

        return (

            data
                ?.choices?.[0]
                ?.message
                ?.content

            ||

            "No response"

        )

    }

    catch {

        return (
            "AI unavailable"
        )

    }

}