export async function saveTask(taskData){

const response =

await fetch(

"http://localhost:5000/tasks",

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:

JSON.stringify(
taskData
)

}

)

return await response.json()

}
export async function getTasks(){

const response =

await fetch(

"http://localhost:5000/tasks"

)

return await response.json()

}
export async function deleteTask(

index

){

await fetch(

`http://localhost:5000/tasks/${index}`,

{

method:"DELETE"

}

)

}
export async function updateTask(

index,

task

){

await fetch(

`http://localhost:5000/tasks/${index}`,

{

method:"PUT",

headers:{

"Content-Type":
"application/json"

},

body:
JSON.stringify(task)

}

)

}