const questionsModel = require('../../Discord_bot_code/models/questionsSchema')
const DiscordJS = require('discord.js')
module.exports = {
	name: 'get_question',
	description: 'gets the specific question and answer from the database',
	async execute(message, args, client) {

        message.channel.send("Please type the English of the question you want to find")

        // const filter = (m) => {
        //     return m.author.id === message.author.id
            
        // };
        // message.channel
        //     .awaitMessages({filter, max: 5, time: 5000 })
        //     .then((collected) => {
        //         const msg = collected.first()
        //         console.log("lemon")
        //         console.log(msg)
                
        //     })
        //     .catch((err) => console.log("ERROR " + err + msg))
        let msg = "hi"
            try {
                profileData = await questionsModel.findOne({questionAnswer: 'hi'})
                console.log(profileData.questionsTxt)
             } catch(err) {
                 console.log(err)
             }
             message.channel.send(profileData.questionTxt)
             message.channel.send(profileData.questionAnswer)
            
	},
};