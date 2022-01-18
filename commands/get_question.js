const questionsModel = require('../../Discord_bot_code/models/questionsSchema')
const DiscordJS = require('discord.js')
module.exports = {
	name: 'get_question',
	description: 'Gets the specific question and answer from the database',
	async execute(message, args, client) {

        message.channel.send("Please type the English of the question you want to find")

        const filter = (m) => {
            return m.author.id === message.author.id
            
        };
        message.channel
            .awaitMessages({filter, max: 1, time: 5000 })
            .then(async(collected) => {
                const msg = collected.first()
                const msgContent = msg.content
                try{
                    profileData = await questionsModel.findOne({questionTxt: msgContent})
                }catch (err) {
                    console.log(err)
                }
                console.log(msg.content)
                message.channel.send(`the English is: ${profileData.questionTxt} \nThe Chinese is ${profileData.questionAnswer}`)
            })
            .catch((err) => console.log("ERROR " + err))
	},
};