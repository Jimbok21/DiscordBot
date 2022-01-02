module.exports = {
    name: 'message',
    execute(message, client) {
        //stops the bot from replying to itself, to a dm or a message without the prefix
        if (message.author.bot) return;
        //if (message.channel.type == 'dm') return;
        if (!message.content.startsWith(client.prefix));
        

        //takes the users input and reads it
        const args = message.content.slice(client.prefix.length)
        const commandName = args

        //checks if a command exists
        if (!client.commands.has(commandName)) return;

        //puts the user input and gets the corresponding command
        const command = client.commands.get(commandName);
        
        //executes the command based on the clients input
        try {
            command.execute(message, args);
        } catch (err) {
            console.log(err);
        }
    },
};