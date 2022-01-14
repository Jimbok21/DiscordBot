const QuestionsModel = require('../../Discord_bot_code/models/questionsSchema');

module.exports = {
	name: 'add_question',
	description: 'adds a question to the db',
    inputs: `<Question>, <answer>, <difficulty>`,
	async execute(message, args, client) {
		const question = new QuestionsModel({
            //find way to put spaces into args[0]
            questionTxt: args[0],
            questionAnswer: args[1],
            difficulty: args[2]
        });
    const savedQuestion = await question.save();
	},
};