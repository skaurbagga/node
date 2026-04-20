const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/activityDB')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

const activitySchema = new mongoose.Schema({
    name: String,
    totalSlots: Number,
    availableSlots: Number
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;