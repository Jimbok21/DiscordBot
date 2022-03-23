const mongoose = require('mongoose');

//question Txt is now the Chinese
//question Answer is now the English
//question can have multiple english answers e.g. five, 5
const questionsSchema = new mongoose.Schema({
    questionChinese: mongoose.SchemaTypes.String,
    questionEnglish: mongoose.SchemaTypes.String,
    difficulty: mongoose.SchemaTypes.String
});

const model = mongoose.model('QuestionsModel', questionsSchema);

module.exports = model;