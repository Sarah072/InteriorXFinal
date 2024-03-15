const mongoose = require('mongoose');

const Professional = new mongoose.Schema({

    P_username: String,
    specialized_In: String,
    minimum_Budget: String,
    experience: String,
    rating: String,
    email: String,
 
});

const Professionals = mongoose.model('Professional', Professional);
module.exports = Professionals;

