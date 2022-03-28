const questionsModel = require('/app/src/models/questionsSchema');

module.exports = {
    name: 'add_question',
    description: 'Adds a question to the db',
    inputs: `<English>, <Chinese>, <difficulty>`,
    async execute(message, args, client) {
        //checks that all the arguements are present
        if (!args[0] || !args[1] || !args[2]) {
            console.log(args[0])
            console.log(args[1])
            console.log(args[2])
            message.channel.send("please refer to .help on how to format this command")
            return
        }
        //makes sure the difficulty is valid
        let difficultLowerCase = args[2].toString().toLowerCase()
        if (difficultLowerCase != 'easy' && difficultLowerCase !='medium' && difficultLowerCase != 'hard') {
            console.log(difficultLowerCase)
            message.channel.send("Please use a valid difficulty of either easy, medium or hard")
            return
        }


        //puts inputs into the schema and makes it all lower case
        const question = new questionsModel({
            questionEnglish: args[0].toString().toLowerCase(),
            questionChinese: args[1].toString().toLowerCase(),
            difficulty: difficultLowerCase
        });
        const savedQuestion = await question.save();
        message.channel.send('Question has been added to the database');
    },
};