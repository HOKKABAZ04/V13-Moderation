const Discord = require('discord.js');
const slowModeLimit = new Map();
const ayarlar = require('../ayarlar.json');
exports.run = async(client, message, args) => {

  let boosterRole = message.guild.roles.cache.find(rol => rol.name === ayarlar.ROLLER.boosterRol);
  let jailRole = message.guild.roles.cache.find(rol => rol.name === ayarlar.ROLLER.jailRolu);

let uye = client.guilds.cache.get(ayarlar.SERVER.sunucu).members.cache.get(message.author.id);

  if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`**Yetkin yetersiz.**`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
if (ayarlar.SERVER.slowModeLimit > 0 && slowModeLimit.has(message.author.id) && slowModeLimit.get(message.author.id) == ayarlar.SERVER.slowModeLimit) return message.channel.send("Saatlik slowmode koyma sınırına ulaştın!").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })



      if (!args[0])
      return message.channel.send(
        `Yavaş modu ayarlamam için bir sayı yazmalısın!`
      ).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
  if (isNaN(args[0])) return message.channel.send(`Sayı yaz..`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
  if (args[0] > 21600) return message.channel.send("Slowmode en fazla **21600** olabilir.").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
   
    message.channel.setRateLimitPerUser(args[0]);
    message.channel.send(`**${args[0]}** saniye olarak ayarlandı.`);

    if (ayarlar.SERVER.slowModeLimit > 0) {
      if (!slowModeLimit.has(message.author.id)) slowModeLimit.set(message.author.id, 1);
      else slowModeLimit.set(message.author.id, slowModeLimit.get(message.author.id) + 1);
      setTimeout(() => {
        if (slowModeLimit.has(message.author.id)) slowModeLimit.delete(message.author.id);
      }, 1000 * 60 * 60);
    }
};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases:["slow-mode", "slowmode", "yavas-mod", 'yavasmod', 'yavaşmod'],
    permlevel: 0
};

exports.help = {
    name: "slow-mode"
};