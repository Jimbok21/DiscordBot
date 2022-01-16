const questionsModel = require('../../Discord_bot_code/models/questionsSchema')
const DiscordJS = require('discord.js')
module.exports = {
	name: 'get_question',
	description: 'gets the specific question and answer from the database',
	async execute(message, args, client) {


        const filter = (m) => {
            return m.author.id === message.author.id
        };

        message.channel.send("Please type the English of the question you want to find");
        const collector = message.channel.createMessageCollector({
            filter,
            max: 1,
            time: 5000,
        })
        let msg
        
        collector.on('collect', (message) => {
            let profileData
            msg = message.content
            console.log("lemon")
            console.log(msg)
            //try {
                profileData = await questionsModel.findOne({questionAnswer: 'hi'})
                console.log(profileData.questionsTxt)
            // } catch(err) {
            //     console.log(err)
            // }
            // message.channel.send(profileData.questionTxt)
            // message.channel.send(profileData.questionAnswer)
        })
	},
};