const questionsModel = require('/app/src/models/questionsSchema')
const DiscordJS = require('discord.js')

module.exports = {
    name: 'delete_question',
    description: 'deletes the specific question and answer from the database',
    async execute(message, args, client) {

        message.channel.send("Please type the English of the question you want to delete")

        //checks that the messages from the author
        const filter = (m) => {
            return m.author.id === message.author.id
        }

        message.channel
            .awaitMessages({ filter, max: 1 })
            .then(async (messg) => {
                //collects the message, finds and deletes it in the database
                let msg = messg.first()
                let msgContent = msg.content.toString().toLowerCase()
                try {
                    profileData = await questionsModel.findOneAndDelete({ questionEnglish: msgContent })
                } catch (err) {
                    console.log(err)
                }
                //prints the delete confirmation
                message.channel.send(`the question ${profileData.questionEnglish} = ${profileData.questionChinese} has been deleted`)
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