const questionsModel = require('../../Discord_bot_code/models/questionsSchema')
const DiscordJS = require('discord.js')
module.exports = {
    name: 'timed_quiz',
    description: `The user must answer as many questions as possible in the time they provide. They can choose the difficulty of the questions.` 
    + ` If no time is specified, 30s is the default`,
    inputs: `<time in seconds>`,
    async execute(message, args, client) {

        //initialize variables 
        let profileData
        let selected = false
        let counter = 0
        let score = 0
        let time

        //sets the quiz time to 30s or to the amount inputted
        if(args[0] == null) {
            time = 30
        } else {
            time = args[0]
        }

        //Send intro messages
        message.channel.send(`you have ${time} seconds to answer as many questions as you can`)
        message.channel.send(`What difficulty would you like? \nplease type: easy, medium, hard or random`)

        //sets the message collector to the time inputted
        const collector = new DiscordJS.MessageCollector(message.channel, {
            time: time * 1000,
        })

        //when a message is collected
        collector.on("collect", async (messg) => {
            //checks to make sure the ID is from the person playing the game
            if (messg.author.id != message.author.id) return;
            //if its the first run then checks the selected difficulty
            if (selected === false) {
                difficultySelected = messg.content.toLowerCase()
                if (difficultySelected == "random") {
                    //if its random, all of the questions are put into an array and shuffled
                    try {
                        profileData = await questionsModel.find()
                        shuffle(profileData)
                        selected = true
                        message.channel.send(`What is ${profileData[counter].questionChinese}`)
                        return
                    } catch (err) {
                        console.log(err)
                        collector.stop('not enough questions')
                    }
                } else if (difficultySelected == "easy" || difficultySelected == "medium" || difficultySelected == "hard") {
                    try {
                        //The difficulty specified questions are put into an array and shuffled
                        profileData = await questionsModel.find({ difficulty: difficultySelected })
                        shuffle(profileData)
                        selected = true
                        message.channel.send(`What is ${profileData[counter].questionChinese}`)
                        return
                    } catch (err) {
                        console.log(err)
                        collector.stop('not enough questions')
                    }
                } else {
                    //if the input is invalid, it will give the user hard questions
                    message.channel.send(`That is not a valid difficulty. Getting you hard questions 😄`)
                    profileData = await questionsModel.find({ difficulty: "hard" })
                    shuffle(profileData)
                    selected = true
                    //sends the question
                    try {
                        message.channel.send(`What is: ${profileData[counter].questionChinese}`)
                    } catch (err) {
                        console.log(err)
                        collector.stop('not enough questions')
                    }
                    return
                }
            }

            if (selected === true) {
                let answers = []
                answers[counter] = messg.content.toLowerCase()

                //checks if the answer is correct and adds it to the score
                if(profileData[counter].questionEnglish.includes(answers[counter])) {
                    score++
                    message.channel.send(`Correct, your score is currently: **${score}**`)
                } else {
                    let answerString = ""
                    //puts the multiple answers into one string
                    for (let index = 0; index < profileData[counter].questionEnglish.length; index++) {
                        answerString = answerString + profileData[counter].questionEnglish[index]
                        //if the answer is not the last one, add an or between them
                        if (index != profileData[counter].questionEnglish.length - 1) {
                            answerString = answerString + `**, **`
                        }
                    }
                    message.channel.send(`Incorrect, the answer was ||**${answerString}**|| \nyour score is currently: ${score}`)
                }

                //sends the next question
                try{
                message.channel.send(`What is ${profileData[counter + 1].questionChinese}`)
                } catch(err) {
                    message.channel.send(`All out of questions`)
                    collector.stop('out of questions')
                }
                //increments the counter
                counter++
                
            }
        })

        //sends well done when the game ends and shows the score
        collector.on("end", (msg) => {
            if (selected == true) {
                if (profileData[counter] == null) {
                    message.channel.send('There are no questions of that difficulty in the database')
                } else {
                    message.channel.send(`**Well done! Your final score was ${score}**`)
                }
            } else {
                //no difficulty was selected
                message.channel.send(`Timeout error. \nPlease restart the command and select a difficulty`)
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
};