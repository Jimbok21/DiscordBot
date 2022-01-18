const questionsModel = require('../../Discord_bot_code/models/questionsSchema')
const DiscordJS = require('discord.js')
module.exports = {
    name: 'quiz',
    description: `The user answers 5 questions in 30 seconds`,
    async execute(message, args, client) {

        //initialize variables 
        let profileData
        let selected = false
        let counter = 0
        let score = 0

        //checks the message is from the user and ignores other messages
        let filter = (m) => m.author.id === message.author.id

        //Send intro messages
        message.channel.send(`you have 30 seconds to answer 5 questions`)
        message.channel.send(`What difficulty would you like? \nplease type: easy, medium, hard or random`)

        //sets the message collector to 30s and collect 6 messages
        //the first message is selecting the difficulty, the other 5 are the answers
        const collector = new DiscordJS.MessageCollector(message.channel, {
            filter,
            time: 30 * 1000,
            max: 6,
        })

        //when a message is collected
        collector.on("collect", async (messg) => {
            //if its the first run then checks the selected difficulty
            if (selected === false) {
                if (messg.content === "random") {
                    //if its random, all of the questions are put into an array and shuffled
                    try {
                        profileData = await questionsModel.find()
                        shuffle(profileData)
                        selected = true
                        message.channel.send(`What is: ${profileData[counter].questionAnswer} `)
                        return
                    } catch (err) {
                        console.log(err)
                    }
                } else if (messg.content == "easy" || messg.content == "medium" || messg.content == "hard") {
                    try {
                        console.log("LEMONS")
                        console.log(messg.content)
                        //The difficulty specified questions are put into an array and shuffled
                        profileData = await questionsModel.find({ difficulty: messg.content })
                        shuffle(profileData)
                        selected = true
                        message.channel.send(`What is: ${profileData[counter].questionAnswer}`)
                        return
                    } catch (err) {
                        console.log(err)
                    }
                } else {
                    //if the input is invalid, it will give the user hard questions
                    message.channel.send(`That is not a valid difficulty. Getting you hard questions 😄`)
                    profileData = await questionsModel.find({ difficulty: "hard" })
                    shuffle(profileData)
                    selected = true
                    //sends the question
                    message.channel.send(`What is: ${profileData[counter].questionAnswer}`)
                    return
                }
            } else if (selected === true) {
                let answers = []
                answers[counter] = messg.content

                //if the user still tries to answer after doing all the questions, this error appears
                if (profileData[counter] == null) {
                    message.channel.send(`All out of questions, please wait for the timer to elapse`)
                    return
                }

                //checks if the answer is correct and adds it to the score
                if (profileData[counter].questionTxt === answers[counter]) {
                    score++
                    message.channel.send(`Correct, your score is currently: **${score}/5**`)
                } else {
                    message.channel.send(`Incorrect, the answer was ${profileData[counter].questionTxt} \nyour score is currently: ${score}/5`)
                }

                //sends the next question
                try {
                    //will only send 5 questions
                    if (counter < 4) {
                        message.channel.send(`What is ${profileData[counter + 1].questionAnswer}`)
                    }
                } catch (err) {
                    message.channel.send(`All out of questions`)
                }

                //increments the counter
                counter++

            }
        })

        //sends well done when the game ends and shows the score
        collector.on("end", (msg) => {
            try {
                message.channel.send(`**Well done! Your final score was ${score}/5**`)
            } catch (err) {
                //used if the user doesnt select a difficulty in the time given
                message.channel.send(`Please restart the command and select a difficulty`)
            }
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
}