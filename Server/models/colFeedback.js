const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    username: String,
    userInterfaceRating: String,
    designFeaturesRating: String,
    realTimeCollaborationRating: String,
    performanceRating: String,
    navigationRating: String,
    suggestionsForImprovement: String,
  });
  
  const Feedback = mongoose.model('Feedback', feedbackSchema);
  module.exports = Feedback;
  