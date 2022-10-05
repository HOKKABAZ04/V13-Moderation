
const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');
let talkedRecently = new Set();

module.exports = message => {
  if (talkedRecently.has(message.author.id)) {
    return;
  }

  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.BOT.prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.BOT.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
	client.channels.cache.get("1022839076266704917").send(`[${message.author.id}] ${message.author.username}, [${cmd.help.name}] isimli komudu [<#${message.channel.id}>] kanalında çalıştırdı.`);
    cmd.run(client, message, params, perms);
	console.log(`[${message.author.id}] ${message.author.username}, [${cmd.help.name}] isimli komudu [<#${message.channel.id}>] kanalında çalıştırdı.`);
  }
    talkedRecently.add(message.author.id);
	setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 2000);

};

