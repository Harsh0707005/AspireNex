const mongoose = require('mongoose');
const questionSchema = require('./questionSchema');

const quizSchema = new mongoose.Schema({
    questions: [questionSchema]
})

module.exports = mongoose.model('Quiz', quizSchema)