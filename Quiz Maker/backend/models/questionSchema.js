const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: { type: String, required: true},
    options: {type: [String], required: true},
    answer: {type: Number, required: true, min: 0, max: 3}
})

module.exports = questionSchema