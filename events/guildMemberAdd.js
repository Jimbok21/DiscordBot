const dm_setup = require("../commands/dm_setup");

module.exports = {
    name: 'guildMemberAdd',
    execute(member, client) {
        member.send('Hello, This bot will help you learn useful Chinese words and phrases. \n' +
            'it will show you Chinese characters and you have to answer the translation in English.\n' + 
            'For a full list of commands, type .help');
        },
};