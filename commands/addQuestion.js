const QuestionsModel = require('../../Discord_bot_code/models/questionsSchema');

module.exports = {
	name: 'addQuestion',
	description: 'adds a question to the db',
	async execute(message, args) {
        console.log("addQuestion called");
		const question = new QuestionsModel({
            questionTxt: "question test",
            questionAnswer: "answer test",
            difficulty: "difficulty test"
        });
        console.log("test");
    const savedQuestion = await question.save();
	},
};