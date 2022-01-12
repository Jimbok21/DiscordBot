module.exports = {
	name: 'dm_setup',
	description: 'The bot DMs the user for the first time',
	execute(message, args) {
        //sends the user a dm and puts a log in the console
        if(message.channel.type == 'DM') {
		message.author.send('You are already direct messaging me');
        console.log('dm has been sent');
        } else {
            message.author.send('Hello, This bot will help you learn useful Chinese words and phrases. \n' +
            'it will show you Chinese characters and you have to answer the translation in English.\n' + 
            'For a full list of commands, type .help');
        }
	},
};