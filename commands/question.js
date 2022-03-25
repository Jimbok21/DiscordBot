const questionsModel = require('../../Discord_bot_code/models/questionsSchema')
const DiscordJS = require('discord.js')

module.exports = {
    name: 'question',
    description: 'Asks the user 1 question',
    async execute(message, args, client) {
        message.channel.send("Please type the difficulty of the question you want")
        //checks the message is from the user and ignores other messages
        let filter = (m) => m.author.id === message.author.id

        let selected = false
        //creates a message collector to read the next 2 messages
        const collector = new DiscordJS.MessageCollector(message.channel, {
            filter,
            max: 2,
        })

        collector.on("collect", async (messg) => {
            //if its the first run then checks the selected difficulty
            if (selected === false) {
                let messageLowerCase = messg.content.toLowerCase()
                if (messageLowerCase === "random") {
                    //if its random, all of the questions are put into an array and shuffled
                    try {
                        profileData = await questionsModel.find()
                        shuffle(profileData)
                        selected = true
                        //sends the question
                        message.channel.send(`What is: ${profileData[0].questionChinese} `)
                        return
                    } catch (err) {
                        console.log(err)
                    }
                } else if (messageLowerCase == "easy" || messageLowerCase == "medium" || messageLowerCase == "hard") {
                    try {
                        //The difficulty specified questions are put into an array and shuffled
                        profileData = await questionsModel.find({ difficulty: messg.content })
                        shuffle(profileData)
                        selected = true
                        //sends the question
                        message.channel.send(`What is: ${profileData[0].questionChinese}`)
                        return
                    } catch (err) {
                        console.log(err)
                    }
                } else {
                    //if the user doesnt enter a valid difficulty, it gives them a hard question
                    message.channel.send(`That is not a valid difficulty. Getting you a hard question 😄`)
                    profileData = await questionsModel.find({ difficulty: "hard" })
                    shuffle(profileData)
                    selected = true
                    //sends the question
                    message.channel.send(`What is: ${profileData[0].questionChinese}`)
                    return
                }
            } else if (selected === true) {

                //if there are no questions in the database
                if (profileData[0] == null) {
                    message.channel.send(`ERROR, there are no questions `)
                    return
                }

                //checks if the answer is correct 
                let answers = profileData[0].questionEnglish
                
                if (answers.includes(messg.content.toLowerCase())) {
                    message.channel.send(`Correct!`)
                } else {
                    console.log(`input = ${messg.content}\nanswer = ${answers[0]}`)
                    message.channel.send(`Incorrect, the answer was ${profileData[0].questionEnglish}`)
                }
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