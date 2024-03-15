import React, { useState, useEffect } from 'react';
import './ColTaskAssignment.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import backgroundImage from './images/abstract-gradient-green-light-background-free-vector.png';
import Navbar from './Navbar';

function ColTaskAssignment() {
  const [tasks, setTasks] = useState([]);
  const [username, setUsername] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
 // const [pId, setpId] = useState('');
  const [deadline, setDeadline] = useState(''); // New state for deadline


  const [tasksToDo, setTasksToDo] = useState([]);
  const [tasksInProgress, setTasksInProgress] = useState([]);
  const [tasksCompleted, setTasksCompleted] = useState([]);


  const handleAssignTask = async () => {
   // console.log('pid', pId);
    try{
      const projectId = localStorage.getItem('projectID')
    const newTask = {
      username,
      taskDescription,
      pId: projectId,
      deadline,
      status: 'To Do'
    };

      // Send POST request to backend server to store the task data
      await axios.post('http://localhost:3000/task', newTask);
      // Update state with the new task
      setTasks([...tasks, newTask]);
     // console.log('pid', pId);
      // Clear input fields after assigning task
      setUsername('');
      setTaskDescription('');
    //  setpId('');
      setDeadline(''); 
    } catch (error) {
      console.error('Error assigning task:', error);
    }
  };
   

  useEffect(() => {
    fetchData();
  }, [1000]); 

  const fetchData = async () => {
    const username = localStorage.getItem('username');
    const projectId = localStorage.getItem('projectID')
   
    try {
      // Fetch tasks from the server for a specific project
      const response = await axios.get(`http://localhost:3000/task/getAll?projectId=${projectId}`);
      const tasks = response.data;
  
      // Filter tasks based on status and update state accordingly
      setTasksToDo(tasks.filter(task => task.status === 'To Do'));
      setTasksInProgress(tasks.filter(task => task.status === 'In Progress'));
      setTasksCompleted(tasks.filter(task => task.status === 'Completed'));
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  

  return (
    <div className="coltask">
        <Navbar />
         <style>
      {`
        html, body {
          background-image: url(${backgroundImage});
          background-size: cover;
          background-attachment: fixed; 
          margin: 0; 
          padding: 0; 
        }
      `}
    </style>
      <div className="task-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Task"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
      
          <input
          type="text"
          placeholder="Deadline" 
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button style={{backgroundColor: 'rgb(29, 143, 244)'}} onClick={handleAssignTask}>Assign Task</button>
      </div>
      <div className='coltaskHeader' style={{marginTop: '-20px'}}><h1>Task Board</h1></div>
      <div className="task-board">
      <div className="to-do">
      <div style={{backgroundColor: 'lightblue', padding: '1px 0', borderTopLeftRadius: '20px', borderTopRightRadius: '20px'}}> <h2>To Do</h2></div>
       
        {tasksToDo.map((task, index) => (
            <div key={index} className="task">
            <div style={{width: '95%', backgroundColor: 'white', margin: '10px 0',  borderRadius: '20px'}}>
          <div style={{marginTop: '10px'}}>Username: {task.username}</div>
           <p>Assigned Task: {task.taskDescription}</p>
           <p>Status: {task.status}</p>
           <p>Last Date: {task.deadline}</p>
        
            </div>
          </div>
        ))}
      </div>
      <div className="in-progress">
      <div style={{backgroundColor: '#87CEEB', padding: '1px 0', borderTopLeftRadius: '20px', borderTopRightRadius: '20px'}}> <h2>In Progress</h2></div>
       
        {tasksInProgress.map((task, index) => (
           <div key={index} className="task">
           <div style={{width: '95%', backgroundColor: 'white', margin: '10px 0',  borderRadius: '20px'}}>
           <div style={{marginTop: '10px'}}>Username: {task.username}</div>
          <p>Assigned Task: {task.taskDescription}</p>
          <p>Status: {task.status}</p>
          <p>Last Date: {task.deadline}</p>
           
          </div></div>
        ))}
      </div>
      <div className="completed">
      <div style={{backgroundColor: '#B0E0E6', padding: '1px 0', borderTopLeftRadius: '20px', borderTopRightRadius: '20px'}}><h2>Completed</h2></div>
       
        {tasksCompleted.map((task, index) => (
           <div key={index} className="task">
           <div style={{width: '95%', backgroundColor: 'white', margin: '10px 0',  borderRadius: '20px'}}>
           <div style={{marginTop: '10px'}}>Username: {task.username}</div>
          <p>Assigned Task: {task.taskDescription}</p>
          <p>Status: {task.status}</p>
          <p>Last Date: {task.deadline}</p>
           
            </div>
          </div>
        ))}
      </div>
      </div>
     
    </div>
  );
}

export default ColTaskAssignment;
