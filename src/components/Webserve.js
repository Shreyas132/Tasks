import { useState, useEffect } from "react"
import Header from "./Header";
import Tasks from "./Tasks";
import AddTask from "./AddTask";

const Webserve = ()=> {
  const[showAddTask,setshowAddTask] = useState(false)
  const [tasks,setTask] = useState([])

  useEffect(() => {

    const gettask = async () =>{
      const fromserver = await fetchtasks ()
      setTask(fromserver)
    }
    gettask()
  },[])

  //fetch tasks
  const fetchtasks = async () =>{
    const response = await fetch('https://my-json-server.typicode.com/Shreyas132/Server/tasks')
    const data = await response.json()

    return data
  }


  const addTask = async (task) =>{
    /*const id = Math.floor(Math.random() * 1000) +1*/
   /* const newTask = {id, ...task}*/
    /*setTask([...tasks,newTask])*/
    const response = await fetch('https://my-json-server.typicode.com/Shreyas132/Server/tasks',{
      method: 'POST',
      headers:{
        'Content-type' : 'application/json',
      },
      body:JSON.stringify(task),
    })

    const data = await response.json()
    setTask([...tasks,data])

  }

  const deleteTask = async (id) =>{
    await fetch(`https://my-json-server.typicode.com/Shreyas132/Server/tasks/${id}`,{method: 'DELETE',})

    setTask(tasks.filter((task) => task.id !== id ))
  }
   
  const fetchtask = async (id) =>{
    const response = await fetch(`https://my-json-server.typicode.com/Shreyas132/Server/tasks/${id}`)
    const data = await response.json()
    return data
  }
  const toggleReminder = async (id) => {
    const taskreminder = await fetchtask(id)
    const updatedtask = {...taskreminder, reminder: !taskreminder.reminder}
    const response = await fetch(`https://my-json-server.typicode.com/Shreyas132/Server/tasks/${id}`,{
      method:'PUT',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(updatedtask)
    })
    const data = await response.json()

    setTask(tasks.map((task) => task.id === id ? {...task,reminder: data.reminder} :task))
  }

  return (
    <div className="box">
      <Header   onAdd = {() => setshowAddTask (!showAddTask)}
      showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd = { addTask }   />}
      {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask}  onToggle={toggleReminder} />) : ("No Tasks")}

      
    </div>
  );
}

export default Webserve;
 