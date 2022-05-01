module.exports = {
    name: 'message',
    execute(message, client) {
        //stops the bot from replying to itself, to a dm or a message without the prefix
        if (message.author.bot) return;
        if (!message.content.startsWith(client.prefix)) return;


        //takes the users input and reads it
        //gets the arguments as the message, then reads the command name and removes it from the arguements
        const args = message.content.slice(client.prefix.length).trim().split(', ');
        const commandName = args.shift().toLowerCase();

        //checks if a command exists
        if (!client.commands.has(commandName)) {

            message.channel.send("That command does not exist, type .help to see a list of commands")
            return
        }

        //puts the user input and gets the corresponding command
        const command = client.commands.get(commandName);
        //executes the command based on the clients input
        try {
            command.execute(message, args, client);
        } catch (err) {
            console.log(err);
        }
    },
};