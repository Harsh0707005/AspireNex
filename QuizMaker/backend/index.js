const Quiz = require('./models/quizSchema')
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
require('dotenv').config();

const app = express();

app.use(cors());

app.use(bodyParser.json());

const db_uri = process.env.MONGODB_URI;

mongoose.connect(db_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// Quiz.insertMany({ id: 'quiz3', questions: [{ title: "ti", options: ['1d', 'dc'], answer: 3 }, {title:"titu", options:['fsd', 'fcds'], answer:2}] })

app.post('/api/createQuiz', (req, res) => {

    Quiz.insertMany({questions: req.body.questions}).then((doc)=>{
        // console.log(doc[0]._id.toString())
        res.status(201).json({url: "https://aspire-nex-frontend-ashy.vercel.app/quiz/" + doc[0]._id.toString()})
    }).catch((e)=>{
        console.log(e)
        res.status(400).send("Failed to create quiz")
    })
})

app.get("/quiz/:path", async(req, res) => {
    let quizId = req.params.path
    let questionIndex = 0
    if (req.query.questionIndex){
        questionIndex = req.query.questionIndex
    }
    const dbResData = await Quiz.findById(quizId)
    const questions = dbResData.questions 
    data = {}
    data.question = questions[questionIndex].title
    data.options = questions[questionIndex].options
    data.totalQuestions = questions.length
    // console.log(data)
    res.json(data)
})

app.get("/quiz/checkAnswer/:path", async(req, res) => {
    let quizId = req.params.path
    let questionIndex = req.query.question
    let answer = req.query.answer
    const dbResData = await Quiz.findById(quizId)
    
    res.json({correct: dbResData.questions[questionIndex].answer == answer})
})

app.get("/test", (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log('Server is running on port 3000...')
})