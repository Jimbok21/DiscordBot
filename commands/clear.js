
module.exports = {
	name: 'clear',
	description: 'Clears the number of messages that you input',
    inputs: '<1-100>',
	async execute(message, args, client) {
        if(!args[0]) return message.reply("please enter the number of messages you want deleted");
        if(isNaN(args[0])) return message.reply("please enter a valid number below 100");

        if(args[0] > 100) return message.reply("you cannot delete more than 100 messages");
        if(args[0] < 1) return message.reply("you must choose a number above 1");
        
        //waits to fetch all of the messages that the arguement specifies
        //when they've all been fetched, they're deleted.
        try {
            await message.channel.messages.fetch({limit : args[0]}).then(messages => {
            message.channel.bulkDelete(messages, true);
        })
        } catch (error) {
            message.channel.send("You can only delete messages that are under 14 days old or NOT in DMs");
            console.log(error);
        };
	},
};