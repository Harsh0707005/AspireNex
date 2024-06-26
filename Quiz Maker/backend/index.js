const Quiz = require('./models/quizSchema')
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const port = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/quizMaker', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// Quiz.insertMany({ id: 'quiz3', questions: [{ title: "ti", options: ['1d', 'dc'], answer: 3 }, {title:"titu", options:['fsd', 'fcds'], answer:2}] })

app.post('/api/createQuiz', (req, res) => {
    // console.log(req.body.questions)
    let id = uuidv4();
    // console.log(id)
    Quiz.insertMany({ id: id, questions: req.body.questions}).then(()=>{
        res.status(201).send("Quiz created successfully")
    }).catch((e)=>{
        res.status(400).send("Failed to create quiz")
    })
    // res.status(201).send("Hello GET")
})

app.listen(port, () => {
    console.log('Server is running on port 3000...')
})