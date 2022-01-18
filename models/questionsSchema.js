const mongoose = require('mongoose');

//question Txt is the English
//question Answer is the Chinese
const questionsSchema = new mongoose.Schema({
    questionTxt: mongoose.SchemaTypes.String,
    questionAnswer: mongoose.SchemaTypes.String,
    difficulty: mongoose.SchemaTypes.String
});

const model = mongoose.model('QuestionsModel', questionsSchema);

module.exports = model;