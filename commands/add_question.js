const questionsModel = require('../../Discord_bot_code/models/questionsSchema');

module.exports = {
	name: 'add_question',
	description: 'adds a question to the db',
    inputs: `<Question>, <answer>, <difficulty>`,
	async execute(message, args, client) {
		const question = new questionsModel({
            questionTxt: args[0],
            questionAnswer: args[1],
            difficulty: args[2]
        });
    const savedQuestion = await question.save();
    message.channel.send('Question has been added to the database');
	},
};