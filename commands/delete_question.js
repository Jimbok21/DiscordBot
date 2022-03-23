const questionsModel = require('../../Discord_bot_code/models/questionsSchema')
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
            .then(async (collected) => {
                //collects the message, finds and deletes it in the database
                const msg = collected.first()
                const msgContent = msg.content
                try {
                    profileData = await questionsModel.findOneAndDelete({ questionTxt: msgContent })
                } catch (err) {
                    console.log(err)
                }
                //prints the delete confirmation
                console.log(msg.content)
                message.channel.send(`the question ${profileData.questionTxt} = ${profileData.questionAnswer} has been deleted`)
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