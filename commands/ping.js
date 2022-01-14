

module.exports = {
	name: 'ping',
	description: 'Responds to the user with "Pong"',
	execute(message, args, client) {
		message.channel.send('Pong');
	},
};