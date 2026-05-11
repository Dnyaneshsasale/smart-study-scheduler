const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// View Engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// MongoDB Atlas Connection
mongoose.connect(
'mongodb+srv://dnyaneshsasale_db_user:3BLRMY9Pc7Qy6cRY@cluster0.8lzqpga.mongodb.net/studySchedulerDB?retryWrites=true&w=majority'
)

.then(() => {
    console.log('MongoDB Connected Successfully');
})

.catch((err) => {
    console.log('MongoDB Connection Error');
    console.log(err);
});

// Schema
const taskSchema = new mongoose.Schema({
    subject: String,
    task: String
});

// Model
const Task = mongoose.model('Task', taskSchema);

// Home Route
app.get('/', async (req, res) => {

    try {

        const tasks = await Task.find();

        res.render('index', { tasks });

    } catch (err) {

        console.log(err);

        res.send('Database Error');

    }

});

// Add Task
app.post('/add', async (req, res) => {

    try {

        const newTask = new Task({

            subject: req.body.subject,
            task: req.body.task

        });

        await newTask.save();

        res.redirect('/');

    } catch (err) {

        console.log(err);

        res.send('Error Adding Task');

    }

});

// Delete Task
app.get('/delete/:id', async (req, res) => {

    try {

        await Task.findByIdAndDelete(req.params.id);

        res.redirect('/');

    } catch (err) {

        console.log(err);

        res.send('Error Deleting Task');

    }

});

// Server
app.listen(process.env.PORT || 3000, () => {

    console.log('Server Running on Port 3000');

});