const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/cacheDB')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const User = mongoose.model('User', userSchema);

module.exports = User;