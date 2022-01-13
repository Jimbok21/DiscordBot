const mongoose = require('mongoose');

const questionsSchema = new mongoose.Schema({
    questionTxt: mongoose.SchemaTypes.String,
    questionAnswer: mongoose.SchemaTypes.String,
    difficulty: mongoose.SchemaTypes.String
});

const model = mongoose.model('QuestionsModel', questionsSchema);

module.exports = model;