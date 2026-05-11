const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb://dnyaneshsasale_db_user:0ICeoYK7Z1IdwDeJ@ac-m4ego8v-shard-00-00.8lzqpga.mongodb.net:27017,ac-m4ego8v-shard-00-01.8lzqpga.mongodb.net:27017,ac-m4ego8v-shard-00-02.8lzqpga.mongodb.net:27017/?ssl=true&replicaSet=atlas-p3tk2g-shard-0&authSource=admin&appName=Cluster0')
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