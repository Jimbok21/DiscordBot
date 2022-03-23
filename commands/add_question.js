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

        if (args[3] != "easy" || "medium" || "hard") {
            message.channel.send("Please use a valid difficulty of either easy, medium or hard")
        }
        
        const question = new questionsModel({
            questionEnglish: args[0],
            questionChinese: args[1],
            difficulty: args[2]
        });
        const savedQuestion = await question.save();
        message.channel.send('Question has been added to the database');
    },
};