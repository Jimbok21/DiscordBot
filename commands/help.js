const fs = require("fs");
const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
const dir = 'E:/Users/Jimmy/OneDrive - Swansea University/YEAR 3/CS-354 Project Dissertation/Discord_bot_code/commands/';

module.exports = {
    name: 'help',
    description: 'Lists the commands that the user can input',
    async execute(message, args, client) {
        let reply = `This is the basic .help command\n`
        client.commands = new Discord.Collection();
        const commandFiles = fs.readdirSync(dir).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`${dir}${file}`);
            client.commands.set(command.name, command);
            reply += `**${command.name}${args}** = ${command.description}\n`
        }
       
        message.channel.send(reply);
    }
};