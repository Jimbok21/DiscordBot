const questionsModel = require('../models/questionsSchema')
const DiscordJS = require('discord.js')

module.exports = {
    name: 'add_answer',
    description: 'adds another english answer to a question e.g. 五 = 5 or five',

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
                    let answerString = ""
                    for (let index = 0; index < profileData.questionEnglish.length; index++) {
                        answerString = answerString + profileData.questionEnglish[index]
                        //if the answer is not the last one, add an or between them
                        if (index != profileData.questionEnglish.length - 1) {
                            answerString = answerString + `**, **`
                        }
                    }
                    message.channel.send(`The question is **${answerString}** = **${profileData.questionChinese}**`)
                    message.channel.send(`What is an alternative english answer of that question`)
                    return
                } catch (err) {
                    message.channel.send(`That question does not exist. Please type the command again`)
                    collector.stop('invalid question')
                    console.log(err)
                    return
                }
            } else if (gotQuestion == true) {
                let additionalAnswer = messg.content.toLowerCase()
                const update = await questionsModel.updateOne(
                    //finds the correct question and pushes the new answer to the list of answers
                    { questionChinese: profileData.questionChinese },
                    { $push: { questionEnglish: additionalAnswer } }
                )
                let answerString = ""
                for (let index = 0; index < profileData.questionEnglish.length; index++) {
                    answerString = answerString + profileData.questionEnglish[index]
                    //if the answer is not the last one, add an or between them
                    if (index != profileData.questionEnglish.length - 1) {
                        answerString = answerString + `**, **`
                    }
                }
                message.channel.send(`updated: **${answerString}**, **${additionalAnswer}** = **${profileData.questionChinese}**`)
            } else {
                message.channel.send(`${messg.content} is not valid. Please restart and choose a different answer`)
            }
        })
    }
}
