const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('MongoDB Connected Successfully');
})
.catch((err) => {
    console.log('MongoDB Connection Error');
    console.log(err);
});

const taskSchema = {
    subject: String,
    task: String
};

const Task = mongoose.model('Task', taskSchema);

app.get('/', async (req, res) => {

    const tasks = await Task.find();

    res.render('index', { tasks });

});

app.post('/add', async (req, res) => {

    const newTask = new Task({
        subject: req.body.subject,
        task: req.body.task
    });

    await newTask.save();

    res.redirect('/');

});

app.get('/delete/:id', async (req, res) => {

    await Task.findByIdAndDelete(req.params.id);

    res.redirect('/');

});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server Running on Port 3000');
});