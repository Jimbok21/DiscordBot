const questionsModel = require('/app/src/models/questionsSchema')
const DiscordJS = require('discord.js')

module.exports = {
    name: 'get_question',
    description: 'Gets the specific question and answer from the database',
    async execute(message, args, client) {

        message.channel.send("Please type the English of the question you want to find")
        
        //checks that the messages from the author
        const filter = (m) => {
            return m.author.id === message.author.id
        }

        message.channel
            .awaitMessages({ filter, max: 1 })
            .then(async (collected) => {
                //collects the message and finds it in the database
                const msg = collected.first()
                const msgContent = msg.content
                try {
                    profileData = await questionsModel.findOne({ questionEnglish: msgContent })
                } catch (err) {
                    console.log(err)
                }
                //prints the question and answer
                console.log(msg.content)
                let answerString = ""
                    //puts the multiple answers into one string
                    for (let index = 0; index < profileData.questionEnglish.length; index++) {
                        answerString = answerString + profileData.questionEnglish[index]
                        //if the answer is not the last one, add an or between them
                        if (index != profileData.questionEnglish.length - 1) {
                            answerString = answerString + `**, **`
                        }
                    }
                message.channel.send(`the English is: **${answerString}** \nThe Chinese is **${profileData.questionChinese}**`)
            })
            .catch((err) => {
                //catches any errors like a timeout or if the question is not in the database
                console.log("Error: " + err)
                if (err.toString().includes('content')) {
                    message.channel.send('Timeout. Please type the command and try again')
                } else if (err.toString().includes('null')) {
                    message.channel.send('That question does not exist in the database')
                } else {
                    message.channel.send('Unknown Error')
                }
            })
    },
}