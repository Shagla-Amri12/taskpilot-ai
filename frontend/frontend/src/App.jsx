import { useState, useEffect } from "react"
import { generatePlan } from "./services/gemini"

function App() {
  const [task, setTask] = useState("")
  const recognition =

    new window.webkitSpeechRecognition()
  const [date, setDate] = useState("")
  const [plan, setPlan] = useState("")
  const [message, setMessage] = useState("")
  const [schedule, setSchedule] = useState("")
  const [search, setSearch] = useState("")
  const [streak, setStreak] = useState(0)
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

    localStorage.setItem(
      "tasks",

      JSON.stringify(tasks)

    )

  }, [tasks])

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

            {tasks.length - completedTasks}

            Pending

          </p>
        </div>


        <div className="bg-slate-900 p-6 rounded-2xl">
          <h3 className="text-xl font-semibold">
            AI Priority
          </h3>

          <p className="mt-4">
            {priority || "No Analysis"}
          </p>
          <p className="mt-3">

            🔥 Streak:
            {streak}

          </p>
        </div>


        <div className="bg-slate-900 p-6 rounded-2xl">
          <h3 className="text-xl font-semibold">
            Productivity
          </h3>

          <p className="mt-4">

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
        </div>
      </section>
      <section className="px-10">

        <h2 className="text-2xl font-bold mb-4">

          Progress

        </h2>

        <div
          className="bg-slate-800 rounded-full h-6"
        >

          <div

            style={{
              width: `${progress}%`
            }}

            className="
bg-green-500
h-6
rounded-full
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
            className="w-full p-4 rounded-xl mb-4 text-white bg-slate-800"
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
            bg-purple-600
            px-5
            py-3
            rounded-xl
            mb-4
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

              const result =
                await generatePlan(
                  task,
                  date,
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

              setTasks([

                ...tasks,

                {

                  task,
                  date,
                  difficulty,
                  completed: false

                }

              ])

            }}

            className="
            bg-blue-600
            px-6
            py-3
            rounded-xl
            "

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

        {
          tasks

            .filter((item) =>

              item.task
                .toLowerCase()

                .includes(

                  search
                    .toLowerCase()

                )

            )

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

                <p className="text-2xl font-bold">

                  📌 {item.task}

                </p>

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

                      onClick={() => {

                        const updated = [...tasks]

                        updated[index].completed = true

                        setTasks(updated)

                        localStorage.setItem(
                          "tasks",
                          JSON.stringify(updated)
                        )

                      }}

                      className="mt-3 bg-green-600 px-4 py-2 rounded-xl"

                    >

                      Mark Complete

                    </button>

                }
                <button

                  onClick={() => {

                    const updated =

                      tasks.filter(
                        (_, i) =>

                          i !== index
                      )

                    setTasks(updated)
                    setMessage(
                      "🔥 Great work! Keep moving."
                    )
                    setStreak(
                      prev => prev + 1
                    )

                  }}

                  className="
                mt-3
                ml-3
                bg-red-600
                px-4
                py-2
                rounded-xl
                "

                >

                  Delete

                </button>
                <button

                  onClick={() => {

                    setTask(item.task)

                    setDate(item.date)

                    setDifficulty(item.difficulty)

                  }}

                  className="
                mt-3
                bg-yellow-600
                px-4
                py-2
                rounded-xl
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