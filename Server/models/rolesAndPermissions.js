const mongoose = require('mongoose');

const rolesPermissionsSchema = new mongoose.Schema({
    projectID: String,
    username: String,
    role: String,
    permission: String,
  });
  
  const rolesPermissions = mongoose.model('rolesPermissions', rolesPermissionsSchema);
  module.exports = rolesPermissions;