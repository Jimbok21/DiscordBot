const questionsModel = require('../../Discord_bot_code/models/questionsSchema')
const DiscordJS = require('discord.js')

module.exports = {
    name: 'change_difficulty',
    description: 'Changes the difficulty of a question',
    async execute(message, args, client) {

        message.channel.send("Please type the English of the question you want to update")

        //checks the message is from the user and ignores other messages
        let filter = (m) => m.author.id === message.author.id

        let gotQuestion = false
        //creates a message collector to read the next 2 messages
        const collector = new DiscordJS.MessageCollector(message.channel, {
            filter,
            max: 2,
        })
        

        collector.on("collect", async (messg) => {
            if (gotQuestion == false) {
                //the first input will get the question
                try {
                    profileData = await questionsModel.findOne({ questionEnglish: messg.content })
                    gotQuestion = true
                    message.channel.send(`The question is ${profileData.questionEnglish} = ${profileData.questionChinese}`)
                    message.channel.send(`What is the new difficulty of this question? Please type easy, medium or hard`)
                    return
                } catch (err) {
                    message.channel.send(`That question does not exist. Please type the command again`)
                    collector.stop('question not found')
                    console.log(err)
                    return
                }
            } else if (gotQuestion == true) {
                let newDifficulty = messg.content.toLowerCase()
                console.log(newDifficulty)
                if (newDifficulty == "easy" || newDifficulty == "medium" || newDifficulty == "hard") {
                    const update = await questionsModel.updateOne(
                        {
                            questionEnglish: profileData.questionEnglish
                        },
                        {
                            difficulty: newDifficulty
                        }
                    )
                    message.channel.send(`updated: ${profileData.questionEnglish} = ${profileData.questionChinese} to difficulty: ${newDifficulty}`)
                } else {
                    message.channel.send(`${messg.content} is not valid. Please restart and choose easy, medium or hard`)
                }
            }
        })
    },
};