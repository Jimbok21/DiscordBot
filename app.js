const Discord = require('discord.js');
const mongoose = require('/app/src/database/mongoose');
const { Client, Intents } = require('discord.js');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_MEMBERS] });

    
const fs = require('fs');
const message = require('/app/src/events/message');
require('dotenv').config();


//sets the prefix that the user must put before typing a command as a .
client.prefix = process.env.PREFIX;

//puts the commands into a collection
client.commands = new Discord.Collection();

//gets the filenames of the events and commands
const commandFiles = fs.readdirSync('/app/src/commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('/app/src/events').filter(file => file.endsWith('.js'));

//command handler. Allows me to externalise commands
for (const file of commandFiles) {
    const command = require(`/app/src/commands/${file}`);
    client.commands.set(command.name, command);
}

//event handler. Allows me to externalise events
for (const file of eventFiles) {
    const event = require(`/app/src/events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

//initialize the database
mongoose.init();

//logs in with the discord bot token
client.login(process.env.TOKEN);
