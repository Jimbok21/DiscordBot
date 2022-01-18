const questionsModel = require('../../Discord_bot_code/models/questionsSchema')
const DiscordJS = require('discord.js')
module.exports = {
    name: 'start',
    description: `The user must answer as many questions as possible in the time they provide. They can choose the difficulty of the questions.` 
    + ` If no time is specified, 30s is the default`,
    inputs: `<time in seconds>`,
    async execute(message, args, client) {

        //initialize variables and send intro messages
        let profileData
        let selected = false
        let counter = 0
        let score = 0
        let time
        if(args[0] == null) {
            time = 30
        } else {
            time = args[0]
        }
        message.channel.send("you have 30 seconds to answer as many questions as you can")
        message.channel.send("What difficulty would you like? \nplease type: easy, medium, hard or random")

        //sets the message collector to 30 seconds
        const collector = new DiscordJS.MessageCollector(message.channel, {
            time: time * 1000,
        })

        collector.on("collect", async (messg) => {
            //checks to make sure the ID is from the person playing the game
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
                    message.channel.send(`All out of questions, please wait for the timer to elapse`)
                    return
                }
                //checks if the answer is correct and adds it to the score
                if(profileData[counter].questionTxt === answers[counter]) {
                    score++
                    message.channel.send(`Correct, currently on ${score}/${profileData.length}`)
                } else {
                    message.channel.send(`Incorrect, the answer was ${profileData[counter].questionTxt} \ncurrently on ${score}/${profileData.length}`)
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
            message.channel.send(`Well done! Your final score was ${score}/${profileData.length}`)
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