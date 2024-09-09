import { useState, useEffect } from "react"
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./Footer";
import Webserve from "./components/Webserve";

const App = ()=> {
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
    const response = await fetch('http://localhost:5000/tasks')
    const data = await response.json()

    return data
  }
  const fetchtask = async (id) =>{
    const response = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await response.json()
    return data
  }



  const addTask = async (task) =>{
    /*const id = Math.floor(Math.random() * 1000) +1*/
   /* const newTask = {id, ...task}*/
    /*setTask([...tasks,newTask])*/
    const response = await fetch('http://localhost:5000/tasks',{
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
    await fetch(`http://localhost:5000/tasks/${id}`,{method: 'DELETE',})

    setTask(tasks.filter((task) => task.id !== id ))
  }

   
  const toggleReminder = async (id) => {
    const taskreminder = await fetchtask(id)
    const updatedtask = {...taskreminder, reminder: !taskreminder.reminder}
    const response = await fetch(`http://localhost:5000/tasks/${id}`,{
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
      <Webserve />
      {/* <Header   onAdd = {() => setshowAddTask (!showAddTask)}showAdd={showAddTask} />  */}
      {/* {showAddTask && <AddTask onAdd = { addTask }   />}
      {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask}  onToggle={toggleReminder} />) : ("No Tasks")}  */}
      
       <Footer />

      
    </div>
  );
}

export default App;
 