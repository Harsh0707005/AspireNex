const mongoose = require('mongoose');
const questionSchema = require('./questionSchema');

const quizSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    questions: [questionSchema]
})

module.exports = mongoose.model('Quiz', quizSchema)