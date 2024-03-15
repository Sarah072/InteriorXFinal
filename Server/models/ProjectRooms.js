
const mongoose = require('mongoose');

const projectRoomSchema = new mongoose.Schema({

  username: String,
  reactplannerv0: String,
  roomName: String,
 
});

const ProjectRoom = mongoose.model('ProjectRoom', projectRoomSchema);
module.exports = ProjectRoom;


