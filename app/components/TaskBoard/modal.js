import React,{useState,useEffect} from 'react'
import Modal from '@material-ui/core/Modal';
import {Backdrop, FormControl,MenuItem} from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';


function AddTaskModal(props) {
  const {open ,close,users,resetTasks} = props
  const [form, setForm] = useState({
    title : '',
    description : '',
    due_time : '',
    list : 'toDo',
    user_id : '',
    start_time : '',
    buffer_time : ''
  })
  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '60%',
      },
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // height : '100vw'

    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width : "60%",
    },
    selectEmpty: {
      margin: theme.spacing(1),
      width: '60%',

    },
    button : {
      marginLeft : "auto"
    },
  }));
  const classes = useStyles();
  const submit = () => {
    console.table(form)
    resetTasks(form)
    close()
  }
  
  return (
    <Modal
      aria-labelledby="add task modal"
      aria-describedby="add a new task"
      open={open}
      onClose={()=>close()}
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Add New Task</h2>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              error={false}
              id="outlined-error-helper-text"
              label="Task Name"
              helperText="Incorrect entry."
              variant="outlined"
              value={form.title}
              onChange={e=>setForm({...form, title : e.target.value})}
              />
            <TextField
              id="outlined-multiline-static"
              label="Task Description"
              multiline
              rows={4}
              variant="outlined"
              value={form.description}
              onChange={e=>setForm({...form,description : e.target.value})}
              />
            <TextField
              id="datetime-local"
              label="Due Date"
              type="datetime-local"
              value={form.due_time}
              onChange={e=>setForm({...form,due_time : e.target.value})}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div>
              <FormControl >
                <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={form.user_id}
                  className={classes.selectEmpty}
                  onChange={(e)=>setForm({...form,user_id : e.target.value})}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {
                    users && users.map(user=><MenuItem value={user.id}>{user.name}</MenuItem>)
                  }
                </Select>
              </FormControl>
            </div>
            <div className="actionRow">
              <Button variant="contained" color="secondary" onClick={()=>close()}>Close</Button>
              <Button variant="contained" color="primary" onClick={()=>submit()}>Submit</Button>
            </div>
          </form>
        </div>
      </Fade>
    </Modal>
  )
}

export default AddTaskModal
