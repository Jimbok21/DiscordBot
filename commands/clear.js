
module.exports = {
	name: 'clear',
	description: 'Clears the messages of the server',
	execute(message, args) {
        if(!args[0]) return message.reply("please enter the number of messages you want deleted");
        if(isNaN(args[0])) return message.reply("please enter a valid number below 100");

        if(args[0] > 100) return message.reply("you cannot delete more than 100 messages");
        if(args[0] < 1) return message.reply("you must choose a number above 1");
        
	},
};