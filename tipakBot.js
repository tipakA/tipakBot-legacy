const { Client } = require('discord.js');
const client = new Client({ disableEveryone: true });
require('dotenv').config();

client.on('ready', () => console.log(`Logged in as ${client.user.tag}.`));

client.login(process.env.TESTTOKEN);