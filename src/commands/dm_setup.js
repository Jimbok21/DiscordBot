module.exports = {
	name: 'dm_setup',
	description: 'Used in the server if the user has deleted the DM with the bot and '
    + 'wants to start a new one. Also used if bot has to restart and DMs wont work',
	execute(message, args, client) {
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