const questionsModel = require('../../Discord_bot_code/models/questionsSchema')
const DiscordJS = require('discord.js')
module.exports = {
	name: 'get_question',
	description: 'gets the specific question and answer from the database',
	async execute(message, args, client) {

        message.channel.send("Please type the English of the question you want to find")

        const filter = (m) => {
            return m.author.id === message.author.id
            
        };
        message.channel
            .awaitMessages({filter, max: 5, time: 5000 })
            .then(async(collected) => {
                const msg = collected.first()
                const messg = msg.content
                console.log("lemon")
                try{
                profileData = await questionsModel.findOne({questionAnswer: messg})
                }catch (err) {
                    console.log(err)
                }
                console.log(msg.content)
                message.channel.send(profileData.questionTxt)
                message.channel.send(profileData.questionAnswer)
            })
            .catch((err) => console.log("ERROR " + err + msg))

            try {
                //profileData = await questionsModel.findOne({questionAnswer: "hi"})
             } catch(err) {
                 console.log(err)
             }
             //message.channel.send(profileData.questionTxt)
             //message.channel.send(profileData.questionAnswer)
            
	},
};