import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ColTaskAssignment.css';
import backgroundImage from './images/abstract-gradient-green-light-background-free-vector.png';
import Navbar from './Navbar';

function ColTaskDisplay() {
  const [tasksToDo, setTasksToDo] = useState([]);
  const [tasksInProgress, setTasksInProgress] = useState([]);
  const [tasksCompleted, setTasksCompleted] = useState([]);

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    const username = localStorage.getItem('username');
    try {
      // Fetch tasks from the server
      const response = await axios.get(`http://localhost:3000/task/get?username=${username}`);
      const tasks = response.data;
      // Filter tasks based on status and update state accordingly
      setTasksToDo(tasks.filter(task => task.status === 'To Do'));
      setTasksInProgress(tasks.filter(task => task.status === 'In Progress'));
      setTasksCompleted(tasks.filter(task => task.status === 'Completed'));
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleUndertaken = async (taskId) => {
    try {
      // Update task status to "In Progress" in the database
      await axios.put(`http://localhost:3000/task/update/${taskId}`, { status: 'In Progress' });
      // Refetch tasks to update UI
      fetchData();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleCompleted = async (taskId) => {
    try {
      // Update task status to "Completed" in the database
      await axios.put(`http://localhost:3000/task/update/${taskId}`, { status: 'Completed' });
      // Refetch tasks to update UI
      fetchData();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };


  const handleRemove = async (taskId) => {
    try {
      // Remove task from the database
      await axios.delete(`http://localhost:3000/task/delete/${taskId}`);
      // Refetch tasks to update UI
      fetchData();
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };
  
  return (
   
   <div className='coltask'>
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
    <div className='coltaskHeader'><h1>Task Board</h1></div>
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
            <button onClick={() => handleUndertaken(task._id)}>Undertaken</button>
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
            <button onClick={() => handleCompleted(task._id)}>Completed</button>
            </div>
          </div>
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
            <button style={{backgroundColor: 'rgb(29, 143, 244)'}} onClick={() => handleRemove(task._id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default ColTaskDisplay;
