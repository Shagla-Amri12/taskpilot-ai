const express=require("express")

const cors=require("cors")

require("dotenv").config()

const app=express()

app.use(cors())

app.use(express.json())

let tasks=[]

app.get("/",(req,res)=>{

res.send(
"🚀 TaskPilot Backend Running"
)

})

app.post(

"/tasks",

(req,res)=>{

tasks.push(
req.body
)

res.json({

message:
"Task Saved",

tasks

})

}

)
app.get(

"/tasks",

(req,res)=>{

res.json(
tasks
)

}
)

app.listen(

5000,

()=>{

console.log(
"Server Running on 5000"
)

}

)
app.delete(

"/tasks/:id",

(req,res)=>{

tasks=

tasks.filter(

(

_,

index

)=>

index

!=

req.params.id

)

res.json(tasks)

}
)
app.put(

"/tasks/:id",

(req,res)=>{

tasks[
req.params.id
]

=

req.body

res.json(
tasks
)

}
)