import { useState, useEffect } from "react"
import {

  saveTask,

  getTasks,

  deleteTask,

  updateTask

}

  from

  "./services/api"
import { generatePlan }

  from

  "./services/groq"


function App() {
  const [task, setTask] = useState("")
  const [

    editIndex,

    setEditIndex

  ]

    =

    useState(

      null

    )
  const recognition =

    new window.webkitSpeechRecognition()
  const today =
    new Date()
  const [date, setDate] = useState("")
  const [plan, setPlan] = useState("")
  const [message, setMessage] = useState("")
  const [schedule, setSchedule] = useState("")
  const [search, setSearch] = useState("")
  const [streak, setStreak] = useState(0)
  const [filter, setFilter] = useState("All")
  const [

    loading,

    setLoading

  ]

    =

    useState(

      false

    )
  const [tasks, setTasks] = useState(() => {

    const saved =
      localStorage.getItem("tasks")

    return saved

      ?

      JSON.parse(saved)

      :

      []

  })
  const [priority, setPriority] = useState("")
  const [difficulty, setDifficulty] = useState("Easy")
  const completedTasks =
    tasks.filter(
      (task) => task.completed
    ).length

  const progress =
    tasks.length

      ?

      (completedTasks / tasks.length) * 100

      :

      0

  useEffect(() => {

    async function load() {

      const data =

        await getTasks()
      {

        setTasks(
          data
        )

      }

    }

    load()

  }, [])

  useEffect(() => {

    if (

      Notification.permission

      !==

      "granted"

    ) {

      Notification.requestPermission()

    }

  }, [])

  useEffect(() => {

    if (

      Notification.permission

      ===

      "granted"

    ) {

      tasks.forEach(

        (item) => {

          const today =

            new Date()

              .toISOString()

              .split("T")[0]

          const key =

            `notify-${item._id}`

          if (

            !item.completed

            &&

            item.date === today

            &&

            !localStorage.getItem(key)

          ) {

            new Notification(

              "📌 Task Reminder",

              {

                body:

                  `${item.task} is due today`

              }

            )

            localStorage.setItem(

              key,

              "done"

            )

          }

        }

      )

    }

  }, [tasks])


  return (


    <div className="min-h-screen bg-[#F5EEFF] text-black">

      <nav className="flex items-center justify-between px-14 pt-10 pb-8">

        <h1 className="text-[52px] font-black tracking-tight">

          <span className="text-[#8B5CF6]">

            ✨ TaskPilot

          </span>

        </h1>

      </nav>



      {/* Hero */}
      <section className="max-w-7xl mx-auto">

        <h2 className="text-5xl font-black leading-tight">
          Never Miss a Deadline
        </h2>

        <p className="text-300 mt-4 text-lg">
          AI helps plan, prioritize and complete tasks.
        </p>

      </section>


      {/* Cards */}
      <section className="grid grid-cols-3 gap-8 px-14 mt-12">

        <div className="bg-white rounded-[32px] shadow-lg p-8">

          <div
            className="
w-16
h-16
rounded-2xl
bg-[#F2EAFF]
flex
items-center
justify-center
text-3xl
"
          >

            🗓️

          </div>

          <h3
            className="
mt-6
text-[24px]
font-bold
"
          >

            Today's Tasks

          </h3>

          <p
            className="
mt-5
text-[34px]
font-black
"
          >

            {tasks.length - completedTasks}

          </p>

          <p
            className="
text-[#8D8A99]
text-lg
"
          >

            Pending

          </p>

        </div>

        <div className="bg-white rounded-[32px] shadow-lg p-8">

          <div
            className="
w-16
h-16
rounded-2xl
bg-[#F2EAFF]
flex
items-center
justify-center
text-3xl
"
          >

            🧠

          </div>

          <h3
            className="
mt-6
text-[24px]
font-bold
"
          >

            AI Priority

          </h3>

          <p
            className="
mt-5
text-xl
font-semibold
"
          >

            {priority || "No Analysis"}

          </p>

          <p
            className="
mt-4
text-[#8D8A99]
text-lg
"
          >

            🔥 Streak: {streak}

          </p>

        </div>


        <div className="bg-white rounded-[32px] shadow-lg p-8">

          <div
            className="
w-16
h-16
rounded-2xl
bg-[#F2EAFF]
flex
items-center
justify-center
text-3xl
"
          >

            📈

          </div>

          <h3
            className="
mt-6
text-[24px]
font-bold
"
          >

            Productivity

          </h3>

          <p
            className="
mt-5
text-[34px]
font-black
"
          >

            {
              tasks.length
                ?
                Math.round(
                  (completedTasks / tasks.length) * 100
                )
                :
                0
            }%

          </p>

          <p
            className="
text-[#8D8A99]
text-lg
"
          >

            Completed

          </p>

        </div>
      </section>
      <section className="px-10">

        <h2 className="text-2xl font-bold mb-4">

          Progress

        </h2>

        <div className="bg-[#ECE3FF] h-8 rounded-full">

          <div

            style={{

              width: `${progress}%`

            }}

            className="

h-8

rounded-full

bg-gradient-to-r

from-[#8B5CF6]

to-[#B794FF]

"

          >

          </div>

        </div>


        <p className="mt-2">

          {progress.toFixed(0)}%
          Completed

        </p>

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
            onChange={(e) => setTask(e.target.value)}
            className="w-full p-4 rounded-2xl bg-[#F3EBFF] border border-[#E4D5FF]"
          />

          <button

            onClick={() => {

              recognition.start()

              recognition.onresult = (e) => {

                setTask(
                  e.results[0][0]
                    .transcript
                )

              }

            }}

            className="
w-full
bg-[#9D6BFF]
text-white
py-4
rounded-2xl
font-semibold
hover:scale-105
duration-300
"

          >

            🎤 Speak Task

          </button>


          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-4 rounded-xl mb-4 text-white bg-slate-800"
          />


          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full p-4 rounded-xl mb-4 text-white bg-slate-800"
          >

            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>

          </select>


          <button

            onClick={async () => {
              if (!task) {

                setPlan("⚠️ The task name is required.")

                return

              }
              if (

                tasks.some(

                  item =>

                    item.task
                      .toLowerCase()

                    ===

                    task
                      .toLowerCase()

                )

              ) {

                setPlan(
                  "⚠️ Task already exists"
                )

                return

              }
              if (

                editIndex

                !==

                null

              ) {

                const updated =

                  [...tasks]

                updated[
                  editIndex
                ]

                  =

                {

                  task,

                  date,

                  difficulty,

                  completed:

                    tasks[
                      editIndex
                    ]
                      .completed

                }

                setTasks(
                  updated
                )

                await updateTask(

                  tasks[
                    editIndex
                  ]._id,

                  updated[
                  editIndex
                  ]

                )



                setEditIndex(
                  null
                )

                setMessage(
                  "✅ Task Updated"
                )

                return

              }
              setLoading(
                true
              )

              const result =
                await generatePlan(
                  task,
                  difficulty
                )

              setPlan(result)
              setSchedule(`

              Today
              → Start ${task}

              Tomorrow
              → Continue ${task}

              Final Day
              → Finish and Review

              `)

              const newTask = {

                task,
                date,
                difficulty,
                completed: false

              }

              setTasks(

                [

                  ...tasks,

                  newTask

                ]

              )

              await saveTask(
                newTask
              )
              setLoading(
                false
              )
              setTask("")

              setDate("")

              setDifficulty("Easy")

            }}

            className="
            bg-gradient-to-r from-blue-600 to-cyan-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 duration-300 shadow-lg shadow-blue-500/30
            px-6
            py-3
            rounded-xl
            "

          >

            {

              loading

                ?

                "Generating..."

                :

                "Generate AI Plan"

            }

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
          {
            schedule && (

              <div
                className="
                mt-6
                bg-slate-800
                p-5
                rounded-xl
                "
              >

                <h3 className="text-xl font-bold">

                  📅 AI Schedule

                </h3>

                <p
                  className="whitespace-pre-line mt-3"
                >

                  {schedule}

                </p>

              </div>

            )
          }

        </div>

      </section>

      {
        message && (

          <div
            className="
            bg-green-700
            p-4
            rounded-xl
            m-6
            "
          >

            {message}

          </div>

        )
      }

      <div className="mt-6">

        <h3 className="text-2xl font-bold mb-4">

          Saved Tasks

        </h3>
        <input

          type="text"

          placeholder="Search task..."

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

          className="
          w-full
          p-4
          rounded-xl
          mb-4
          bg-slate-800
          text-white
          "
        />
        <select

          value={filter}

          onChange={(e) =>
            setFilter(
              e.target.value
            )
          }

          className="
w-full
p-4
rounded-xl
mb-4
bg-slate-800
text-white
"

        >

          <option>All</option>

          <option>Pending</option>

          <option>Completed</option>

        </select>

        {
          tasks

            .filter((item) => {

              const matchSearch =

                item.task
                  .toLowerCase()

                  .includes(
                    search
                      .toLowerCase()
                  )

              const matchFilter =

                filter === "All"

                ||

                (filter === "Completed"
                  &&
                  item.completed)

                ||

                (filter === "Pending"
                  &&
                  !item.completed)

              return (

                matchSearch
                &&
                matchFilter

              )

            })

            .map((item, index) => (

              <div

                key={index}

                className="
              bg-slate-900
              p-6
              mb-5
              rounded-3xl
              border              
              border-slate-700
              hover:scale-105
              duration-300
              "

              >

                <div
                  className="
flex
justify-between
items-center
"
                >

                  <p className="text-2xl font-bold">

                    📌 {item.task}

                  </p>

                  {

                    !item.completed

                    &&

                    item.date

                    &&

                    (

                      new Date(item.date)

                      <=

                      new Date(

                        Date.now()

                        +

                        2
                        *
                        24
                        *
                        60
                        *
                        60
                        *
                        1000

                      )

                    )

                    &&

                    (

                      <p
                        className="
text-red-400
font-bold
"
                      >

                        ⚠️ Due Soon

                      </p>

                    )

                  }

                </div>


                <p className="mt-3">

                  📅 {item.date}

                </p>

                <p className="mt-2">

                  🔥 {item.difficulty}

                </p>

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

                {
                  item.completed
                    ?

                    <p className="text-green-400 mt-3">
                      ✅ Completed
                    </p>

                    :

                    <button

                      onClick={async () => {

                        const updated = [...tasks]

                        updated[index].completed = true

                        setTasks(updated)

                        await updateTask(

                          item._id,

                          updated[index]

                        )

                        setMessage(

                          "🔥 Great work! Keep moving."

                        )

                      }}

                      className="
mt-4
bg-[#B88BFF]
text-white
px-5
py-3
rounded-2xl
hover:scale-105
duration-300
shadow-md
"

                    >

                      Mark Complete

                    </button>

                }
                <button

                  onClick={async () => {

                    const updated =

                      tasks.filter(

                        (_, i) =>

                          i !== index

                      )

                    setTasks(updated)

                    await deleteTask(

                      item._id

                    )

                    setMessage(

                      "🗑 Task Deleted"

                    )

                  }}

                  className="
mt-4
ml-3
bg-[#FF8CA1]
text-white
px-5
py-3
rounded-2xl
hover:scale-105
duration-300
shadow-md
"

                >

                  Delete

                </button>
                <button

                  onClick={() => {

                    setTask(
                      item.task
                    )

                    setDate(
                      item.date
                    )

                    setDifficulty(
                      item.difficulty
                    )

                    setEditIndex(
                      index
                    )

                  }}

                  className="
mt-4
ml-3
bg-[#E9DAFF]
text-black
px-5
py-3
rounded-2xl
hover:scale-105
duration-300
shadow-md
"

                >

                  Edit

                </button>

              </div>

            ))
        }

      </div>


    </div>
  )
}

export default App