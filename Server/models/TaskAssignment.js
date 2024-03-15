
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
 
  username: String,
  pId: String,
  taskDescription: String,
  status: String,
  deadline: String,
 
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;

