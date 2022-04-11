// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');

const cmdList = require('./CommandsList')

require("dotenv").config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on("messageCreate", (msg) => {
    console.log("bruhh")
    for (let i = 0; i < cmdList.length; i++) {
        const cmdData = cmdList[i]
        if (msg.content.toLowerCase().substring(0, cmdData.cmd.length) == cmdData.cmd.toLowerCase()) {         
            cmdData.action(msg, client)
            console.log("hi")
        }
    }
})

client.once('ready', () => {
	console.log('Ready!');
});


client.login(process.env.TOKEN);