const questionsModel = require('../../Discord_bot_code/models/questionsSchema')
const DiscordJS = require('discord.js')
module.exports = {
	name: 'start',
	description: 'will ask the user a set of 5 random questions',
	async execute(message, args, client) {

        message.channel.send("What difficulty would you like? \n please type: easy, medium, hard or random")

        const filter = (m) => {
            return m.author.id === message.author.id
            
        };
        let questions = []
        message.channel
            .awaitMessages({filter, max: 5, time: 5000 })
            .then(async(collected) => {
                const msg = collected.first()
                const msgContent = msg.content
                
                    try{
                        profileData = await questionsModel.find({difficulty: msgContent})
                        console.log(profileData)
                    }catch (err) {
                        console.log(err)
                    }
                  
                
                message.channel.send(profileData[4].questionTxt)
                message.channel.send(profileData[4].questionAnswer)
            })
            .catch((err) => console.log("ERROR " + err))
	},
};