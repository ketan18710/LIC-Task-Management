import React,{useState} from 'react'
import './style.scss'
import Button from '@material-ui/core/Button';
import AddTaskModal from './modal'
function TaskBoard(props) {
  console.log(props)
  const {users, setUsers,tasks, setTasks, lists, setLists} = props
  const [triggers, setTriggers] = useState({
    newTaskModal : false
  })
  const showListTasks = (list_id) => {
    let tasks_list =  tasks && tasks.filter(task=>task.list === list_id)
    return tasks_list && tasks_list.map(task=>(
      <div draggable    onDragStart={(e)=>{e.dataTransfer.setData('task',JSON.stringify(task))}} className="task">
        <h4 className="name">{task.title}</h4>
      </div>
    ))
  }
  const resetTasks = (x,id,add) => {
    let temp = null
    if(add){
      temp = tasks
      temp.push(x)
    }else{
      let resetTask = JSON.parse(x)
      temp = tasks && tasks.map(task=>{
        if(task.task_id === resetTask.task_id){
          task.list = id  
          return task
        }
        return task
      })
    }
    setTasks(temp)
  }
  
  return (
    <>
      <Button variant="contained" color="primary" onClick={()=>setTriggers({...triggers,newTaskModal : true})}>Add New Task</Button>
      <AddTaskModal resetTasks={(task)=>resetTasks(task,'11',true)} users={users} open={triggers.newTaskModal} close={()=>setTriggers({...triggers,newTaskModal : false})}/>
      <div className="TaskBoard">  
        {
          lists && lists.map(list=>(
            <div onDragOver={(e)=>e.preventDefault()} onDrop={(e)=>resetTasks(e.dataTransfer.getData('task'),list.id)} className="TaskBoardList">
              <h3 className="listTitle">{list.name}</h3>
              {
                showListTasks(list.id)
              }
            </div>
          ))
        }
      </div>
    </>
  )
}

export default TaskBoard
