const Quiz = require('./models/quizSchema')
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/quizMaker', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// Quiz.insertMany({ id: 'quiz3', questions: [{ title: "ti", options: ['1d', 'dc'], answer: 3 }, {title:"titu", options:['fsd', 'fcds'], answer:2}] })

app.post('/api/createQuiz', (req, res) => {

    Quiz.insertMany({questions: req.body.questions}).then((doc)=>{
        console.log(doc[0]._id.toString())
        res.status(201).send("Quiz created successfully")
    }).catch((e)=>{
        console.log(e)
        res.status(400).send("Failed to create quiz")
    })
})

app.get("/quiz/:path", async(req, res) => {
    let quizId = req.params.path
    const question = await Quiz.findById(quizId)
    console.log(question)
    res.send("Fs")
})

app.listen(port, () => {
    console.log('Server is running on port 3000...')
})