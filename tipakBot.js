const { Client } = require('discord.js');
const client = new Client({ disableEveryone: true });
require('dotenv').config();

client.config = require('./config.json');

async function clear(input) {
  let output = input;
  if (input && input.constructor.name === 'Promise') output = await output;
  if (typeof evaled !== 'string') output = require('util').inspect(input, { depth: 1 }); /* eslint-disable-line global-require */

  return output
    .replace(/`/g, `\`${String.fromCharCode(8203)}`)
    .replace(/@/g, `@${String.fromCharCode(8203)}`)
    .replace(client.token, '👌');
}

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
  } else if (command === 'eval') {
    if (message.author.id !== client.config.owner) return;
    const code = args.join(' ');
    try {
      const evaled = eval(code);
      const clean = await clear(evaled);
      message.channel.send(`\`\`\`js\n${clean}\n\`\`\``);
    } catch (err) {
      message.channel.send(`\`\`\`xl\n${await clear(err)}\n\`\`\``);
    }
  }
});

client.login(process.env.TESTTOKEN);