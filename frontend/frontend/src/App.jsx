import { useState } from "react"

function App() {
  const [task,setTask]=useState("")
  const [date,setDate]=useState("")
  const [plan,setPlan]=useState("")
  const [tasks,setTasks]=useState([])
  const [difficulty,setDifficulty]=useState("Easy")
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="flex justify-between p-6">

        <h1 className="text-2xl font-bold">
          TaskPilot AI 🚀
        </h1>

        <button className="bg-blue-600 px-5 py-2 rounded-xl">
          Add Task
        </button>

      </nav>


      {/* Hero */}
      <section className="p-10">

        <h2 className="text-5xl font-bold">
          Never Miss a Deadline
        </h2>

        <p className="text-gray-400 mt-4">
          AI helps plan, prioritize and complete tasks.
        </p>

      </section>


      {/* Cards */}
      <section className="grid grid-cols-3 gap-6 p-10">

        <div className="bg-slate-900 p-6 rounded-2xl">
          <h3 className="text-xl font-semibold">
            Today's Tasks
          </h3>

          <p className="mt-4">
            3 Pending
          </p>
        </div>


        <div className="bg-slate-900 p-6 rounded-2xl">
          <h3 className="text-xl font-semibold">
            AI Priority
          </h3>

          <p className="mt-4">
            High Risk
          </p>
        </div>


        <div className="bg-slate-900 p-6 rounded-2xl">
          <h3 className="text-xl font-semibold">
            Productivity
          </h3>

          <p className="mt-4">
            82%
          </p>
        </div>
      </section>
      {/* Add Task */}

<section className="p-10">

<div className="bg-slate-900 p-8 rounded-3xl max-w-2xl">

<h2 className="text-3xl font-bold mb-6">
Create New Task
</h2>


<input
type="text"
placeholder="Task Name"
value={task}
onChange={(e)=>setTask(e.target.value)}
className="w-full p-4 rounded-xl mb-4 text-white bg-slate-800"
/>


<input
type="date"
value={date}
onChange={(e)=>setDate(e.target.value)}
className="w-full p-4 rounded-xl mb-4 text-white bg-slate-800"
/>


<select
value={difficulty}
onChange={(e)=>setDifficulty(e.target.value)}
className="w-full p-4 rounded-xl mb-4 text-white bg-slate-800"
>

<option>Easy</option>
<option>Medium</option>
<option>Hard</option>

</select>


<button
onClick={() => {

let suggestion=""

if(difficulty==="Easy"){
suggestion="Finish in one focused session."
}

else if(difficulty==="Medium"){
suggestion="Split into 2–3 sessions."
}

else{
suggestion="Start immediately and divide into milestones."
}

setPlan(`
Task: ${task}

Deadline: ${date}

Priority: ${difficulty}

AI Suggestion:
${suggestion}
`)
setTasks([
...tasks,

{
task,
date,
difficulty,
completed:false
}

])

}}

className="bg-blue-600 px-6 py-3 rounded-xl"
>

Generate AI Plan

</button>


{
plan && (

<div className="mt-6 bg-slate-800 p-5 rounded-xl">

<h3 className="text-xl font-bold mb-3">
AI Plan
</h3>

<p className="whitespace-pre-line">
{plan}
</p>

</div>


)
}

</div>

</section>
<div className="mt-6">

<h3 className="text-2xl font-bold mb-4">
Saved Tasks
</h3>

{
tasks.map((item,index)=>(

<div
key={index}
className="bg-slate-800 p-4 rounded-xl mb-3"
>

<p>{item.task}</p>

<p>{item.date}</p>

<p>{item.difficulty}</p>

<p>

Status:

{
item.completed
?

" Completed"

:

" Pending"

}

</p>

<button

onClick={()=>{

const updated=[...tasks]

updated[index].completed=true

setTasks(updated)

}}

className="mt-3 bg-green-600 px-4 py-2 rounded-xl"

>

Mark Complete

</button>

</div>

))
}

</div>


    </div>
  )
}

export default App