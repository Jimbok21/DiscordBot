const mongoose = require('mongoose');

//question can have multiple english answers e.g. five, 5
const questionsSchema = new mongoose.Schema({
    questionChinese: mongoose.SchemaTypes.String,
    questionEnglish: mongoose.SchemaTypes.Array,
    difficulty: mongoose.SchemaTypes.String
});

const model = mongoose.model('QuestionsModel', questionsSchema);

module.exports = model;