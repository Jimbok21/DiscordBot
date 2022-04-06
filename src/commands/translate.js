const translate = require('translate-google')
const DiscordJS = require('discord.js')

module.exports = {
    name: 'translate',
    description: 'will translate an english word to chinese using google translate. Works best when translating words, not sentences',
    inputs: '<english>',
    async execute(message, args, client) {

        let filter = (m) => m.author.id === message.author.id

        //creates a message collector
        const collector = new DiscordJS.MessageCollector(message.channel, {
            filter,
            max: 1,
        })
        
        if (!args[0]) {
            //only sends if the user has not set an argument
            message.channel.send('please type the english of the word you want to translate')
        }

        if (args[0]) {
            //translates if the command contains the argument
            translate(args[0], { from: 'en', to: 'zh-cn' }).then(res => {
                message.channel.send(`\nto listen or see more detail, visit: https://translate.google.com/?hl=en&sl=en&tl=zh-CN&text=${args[0]}%0A&op=translate`)
                message.channel.send(`**${args[0]}** = **${res}**\n`)
            }).catch(err => {
                console.error(err)
            })
            collector.stop('end')
        } else {
            //collects the message and translates it
            collector.on("collect", async (messg) => {
                translate(messg.content, { from: 'en', to: 'zh-cn' }).then(res => {
                    message.channel.send(`\nto listen or see more detail, visit: https://translate.google.com/?hl=en&sl=en&tl=zh-CN&text=${messg.content}%0A&op=translate`)
                    message.channel.send(`**${messg.content}** = **${res}**\n`)
                }).catch(err => {
                    console.error(err)
                })
            })
        }
    },
}