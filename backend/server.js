const Task =

    require(

        "./models/Task"

    )
const express = require("express")

const mongoose = require("mongoose")

const cors = require("cors")

require("dotenv").config()

const app = express()
mongoose.connect(

    "mongodb://127.0.0.1:27017/taskpilot"

)

    .then(

        () => {

            console.log(

                "MongoDB Connected"

            )

        }
    )

app.use(cors())

app.use(express.json())

let tasks = []

app.get("/", (req, res) => {

    res.send(
        "🚀 TaskPilot Backend Running"
    )

})

app.post(

    "/tasks",

    async (

        req,

        res

    ) => {

        const newTask =

            await Task.create(

                req.body

            )

        res.json(

            newTask

        )

    }
)
app.get(

"/tasks",

async (

req,

res

)=>{

const tasks=

await Task.find()

res.json(

tasks

)

}
)

app.listen(

    5000,

    () => {

        console.log(
            "Server Running on 5000"
        )

    }

)
app.delete(

"/tasks/:id",

async (

req,

res

)=>{

await Task.findByIdAndDelete(

req.params.id

)

res.json({

message:

"Deleted"

})

}
)
app.put(

"/tasks/:id",

async (

req,

res

)=>{

const updated=

await Task.findByIdAndUpdate(

req.params.id,

req.body,

{

new:true

}

)

res.json(

updated

)

}
)