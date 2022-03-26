const translate = require('translate-google')
const DiscordJS = require('discord.js')

module.exports = {
    name: 'translate',
    description: 'will translate an english word to chinese using google translate',
    inputs: '<english>',
    async execute(message, args, client) {

        let filter = (m) => m.author.id === message.author.id

        //creates a message collector
        const collector = new DiscordJS.MessageCollector(message.channel, {
            filter,
        })
        let english = ""
        if (!args[0]) {
            message.channel.send('please type the english of the word you want to translate')
        }

        if (args[0]) {
            english = args[0]
            collector.stop("end")
        } else {
            collector.on("collect", async (messg) => {
                english = messg.content
                collector.stop("end")
            })
        }

        collector.on("end", (msg) => {
            console.log(english)
            translate(english, { from: 'en', to: 'zh-cn' }).then(res => {
                message.channel.send(`**${english}** = **${res}**`)
            }).catch(err => {
                console.error(err)
            })
        })

    },
}