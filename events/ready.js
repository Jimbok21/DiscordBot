module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`${client.user.tag} has logged into Discord`);
        client.user.setActivity("type .help for help", {type: "PLAYING"});
    },
};