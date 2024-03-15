const mongoose = require('mongoose');

const annotationSchema = new mongoose.Schema({
    username: { type: String, required: true },
    comment:{ type: String, required: true },
    projectID:{ type: String, required: true },
    timestamp:{type: String, required: true },
})
  
  const Annotation = mongoose.model('annotation', annotationSchema);
  module.exports = Annotation;
  