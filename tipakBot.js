const { Client } = require('discord.js');
const client = new Client({ disableEveryone: true });
require('dotenv').config();

client.config = require('./config.json');

client.on('ready', () => console.log(`Logged in as ${client.user.tag}.`));

client.on('message', async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(client.config.prefix)) return;
  if (![ 'text', 'news' ].includes(message.channel.type)) return;
  if (!message.member) await message.guild.members.fetch(message);
  const args = message.content.slice(client.config.prefix.length).split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    if (!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) return;
    message.reply('Pong!');
  }
});

client.login(process.env.TESTTOKEN);