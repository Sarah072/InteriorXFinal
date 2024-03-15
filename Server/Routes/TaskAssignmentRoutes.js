const express = require('express');
const Task = require('../models/TaskAssignment');
const cors = require('cors');
const router = express.Router();
router.use(cors());



router.get('/get', async (req, res) => {
    const username = req.query.username;
    try {
        // Fetch all tasks from the database
        const tasks = await Task.find({username: username});
        res.status(200).json(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
);


router.get('/getAll', async (req, res) => {
  const projectId = req.query.projectId; 
  
  try {
  
    const tasks = await Task.find({ pId: projectId });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/', async (req, res) => {
    
    try {
      const { username, taskDescription, pId, status, deadline } = req.body; 
      console.log('pid: ',pId);
      const newTask = new Task({ username, pId, taskDescription, status, deadline }); 
      await newTask.save();
      res.status(201).json({ message: 'Task added successfully' });
    } catch (error) {
      console.error('Error adding task:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

router.put('/update/:taskId', async (req, res) => {
    try {
      const { taskId } = req.params;
      const { status } = req.body;
  
      // Find the task by ID and update its status
      const updatedTask = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
  
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error('Error updating task status:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


router.delete('/delete/:taskId', async (req, res) => {
    try {
      const { taskId } = req.params;
  
      // Delete the task from the database
      await Task.findByIdAndDelete(taskId);
  
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
module.exports = router;
