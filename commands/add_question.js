const questionsModel = require('../../Discord_bot_code/models/questionsSchema');

module.exports = {
    name: 'add_question',
    description: 'Adds a question to the db',
    inputs: `<English>, <Chinese>, <difficulty>`,
    async execute(message, args, client) {
        if (!args[0] || !args[1] || !args[2]) {
            console.log(args[0])
            console.log(args[1])
            console.log(args[2])
            message.channel.send("please refer to .help on how to format this command")
            return
        }
        
        const question = new questionsModel({
            questionTxt: args[0],
            questionAnswer: args[1],
            difficulty: args[2]
        });
        const savedQuestion = await question.save();
        message.channel.send('Question has been added to the database');
    },
};