const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    subject: String,
    task: String
});

module.exports = mongoose.model('Task', taskSchema);