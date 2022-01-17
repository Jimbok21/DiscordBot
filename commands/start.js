const questionsModel = require('../../Discord_bot_code/models/questionsSchema')
const DiscordJS = require('discord.js')
module.exports = {
    name: 'start',
    description: 'will ask the user a set of 5 random questions based on the difficulty they input',
    async execute(message, args, client) {

        let profileData
        let selected = false
        let counter = 0
        let score = 0
        message.channel.send("you have 30 seconds to answer 5 questions")
        message.channel.send("What difficulty would you like? \nplease type: easy, medium, hard or random")

        const filter = (m) => {
            console.log(m.author.id)
            return m.author.id === message.author.id
        };

        const collector = new DiscordJS.MessageCollector(message.channel, {
            time: 30000,
        })

        collector.on("collect", async (messg) => {
            if (messg.author.id != message.author.id) return;
            if (selected === false) {
                if (messg.content === "random") {
                    try {
                        profileData = await questionsModel.find()
                        shuffle(profileData)
                        selected = true
                        message.channel.send(`What is ${profileData[counter].questionAnswer}`)
                        return
                    } catch (err) {
                        console.log(err)
                    }
                } else if (messg.content === "easy" || "medium" || "hard") {
                    try {
                        profileData = await questionsModel.find({ difficulty: messg.content })
                        shuffle(profileData)
                        selected = true
                        message.channel.send(`What is ${profileData[counter].questionAnswer}`)
                        return
                    } catch (err) {
                        console.log(err)
                    }
                }
            }

            if (selected === true) {
                let answers = []
                answers[counter] = messg.content
                
                //if the user still tries to answer after doing all the questions, this error appears
                //this only happens if the database does not have at least 5 questions for the chosen difficulty
                //in practice this should never be needed because the database will have enough default questions
                if(profileData[counter] == null) {
                    message.channel.send(`All out of questions`)
                    return
                }
                //checks if the answer is correct and adds it to the score
                if(profileData[counter].questionTxt === answers[counter]) {
                    score++
                    message.channel.send(`Correct, currently on ${score}/5`)
                } else {
                    message.channel.send(`Incorrect, the answer was ${profileData[counter].questionTxt} \ncurrently on ${score}/5`)
                }

                //sends the next question
                try{
                message.channel.send(`What is ${profileData[counter + 1].questionAnswer}`)
                } catch(err) {
                    message.channel.send(`All out of questions`)
                }
                counter++
                
            }
        })

        //sends well done when the game ends
        collector.on("end", (msg) => {
            message.channel.send(`Well done! Your final score was ${score}/5`)
        })

        //will put the questions in the array into a random order
        //uses a Fisher-Yates (aka Knuth) Shuffle
        function shuffle(array) {
            let currentIndex = array.length, randomIndex;

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