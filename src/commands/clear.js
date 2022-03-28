const DiscordJS = require('discord.js')

module.exports = {
    name: 'clear',
    description: 'Clears the number of messages that you input, You can only delete messages that are under 14 days old and NOT in DMs',
    inputs: '<1-100>',
    async execute(message, args, client) {

        let filter = (m) => m.author.id === message.author.id

        //creates a message collector
        const collector = new DiscordJS.MessageCollector(message.channel, {
            filter,
            max: 1,
        })

        if (!args[0]) {
            message.reply("please enter the number of messages you want deleted")
        } else if (isNaN(args[0])) {
            return message.reply("please enter a valid number between 2-100")
        } else {
            if (args[0] > 100) return message.reply("you cannot delete more than 100 messages")
            if (args[0] <= 1) return message.reply("you must choose a number above 1")
        }
        //waits to fetch all of the messages that the arguement specifies
        //when they've all been fetched, they're deleted.
        if (args[0]) {
            try {
                await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
                    message.channel.bulkDelete(messages, true)
                })
            } catch (error) {
                message.channel.send("You can only delete messages that are under 14 days old and NOT in DMs");
                console.log(error)
            }
        } else {
            collector.on("collect", async (messg) => {
                if (isNaN(messg.content)) return message.reply("please enter a valid number between 2-100")
                if (messg.content > 100) return message.reply("you cannot delete more than 100 messages")
                if (messg.content <= 1) return message.reply("you must choose a number above 1")
                try {
                    await message.channel.messages.fetch({ limit: messg.content }).then(messages => {
                        message.channel.bulkDelete(messages, true)
                    })
                } catch (error) {
                    message.channel.send("You can only delete messages that are under 14 days old and NOT in DMs");
                    console.log(error)
                }
            })
        }
    },
}