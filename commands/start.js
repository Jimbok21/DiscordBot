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
            .awaitMessages({filter, max: 1, time: 5000 })
            .then(async(collected) => {
                const msg = collected.first()
                const msgContent = msg.content
                if(msgContent === "random") {
                    try{
                        profileData = await questionsModel.find()
                    }catch (err) {
                        console.log(err)
                    }
                } else {
                    try{
                        profileData = await questionsModel.find({difficulty: msgContent})
                    }catch (err) {
                        console.log(err)
                    }
                }
                let counter;
                shuffle(profileData)
                console.log("lemon")

                
                console.log(profileData[1].questionTxt)
                message.channel.send(profileData[1].questionTxt)
                message.channel.send(profileData[1].questionAnswer)
                
            })
            .catch((err) => console.log("ERROR " + err))
	
            //will put the questions in the array into a random order
            function shuffle(array) {
                let currentIndex = array.length,  randomIndex;
              
                // While there remain elements to shuffle...
                while (currentIndex != 0) {
              
                  // Pick a remaining element...
                  randomIndex = Math.floor(Math.random() * currentIndex);
                  currentIndex--;
              
                  // And swap it with the current element.
                  [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]];
                }
              
                return array;
              }
        },
};