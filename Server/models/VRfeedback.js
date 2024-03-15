const mongoose = require('mongoose');

const VRfeedbackSchema = new mongoose.Schema({
    username: String,
    UsabilityRating: String,
    FurnitureInteractionRating: String,
    RealismRating: String,
    ComfortRating: String,
    PerformanceRating: String,
    suggestionsForImprovement: String,
  });
  
  const VRFeedback = mongoose.model('VRFeedback', VRfeedbackSchema);
  module.exports = VRFeedback;
  