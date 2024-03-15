// savedDesigns.js (model)
const mongoose = require('mongoose');

const savedDesignsSchema = new mongoose.Schema({
    projectID: String,
    projectData: String,
});


const SavedDesign = mongoose.model('SavedDesign', savedDesignsSchema); // Use PascalCase for model name
  
module.exports = SavedDesign;
