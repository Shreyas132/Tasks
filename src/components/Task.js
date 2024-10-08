import { FaTimes } from 'react-icons/fa'
const Task = ({ task, onDelete,onToggle}) => {
  return (
    <div className='task-parent'>
      <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() =>onToggle(task.id)}>
          <h3>{task.text}
          <FaTimes style={{color:"red" , cursor:"pointer"}} 
          onClick={() => onDelete(task.id)}/> </h3>
          <p>{task.day}</p>
          <p>{task.place}</p>
          
      </div>
    </div>
  )
}

export default Task