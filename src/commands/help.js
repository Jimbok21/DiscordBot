const fs = require("fs");
const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
const dir = '/app/src/commands/';

module.exports = {
    name: 'help',
    description: 'Lists the commands that the user can input',
    async execute(message, args, client) {
        let reply = `This is a list of commands the bot can do.\n Please enter the commands with the syntax shown.\n`
        client.commands = new Discord.Collection();
        const commandFiles = fs.readdirSync(dir).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`${dir}${file}`);
            client.commands.set(command.name, command);
            if(command.inputs != null) {
                reply += `**${process.env.PREFIX}${command.name}, ${command.inputs}** = ${command.description}\n`
            } else {
                reply += `**${process.env.PREFIX}${command.name}** = ${command.description}\n`
            }
        }
       
        message.channel.send(reply);
    }
};