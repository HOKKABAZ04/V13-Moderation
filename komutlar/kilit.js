const Discord = require('discord.js');

const ayarlar = require('../ayarlar.json');
const kilitKapatLimit = new Map();
exports.run = (client, message, args) => {
    let uye = client.guilds.cache.get(ayarlar.SERVER.sunucu).members.cache.get(message.author.id);

    let boosterRole = message.guild.roles.cache.find(rol => rol.name === ayarlar.ROLLER.boosterRol);
    let jailRole = message.guild.roles.cache.find(rol => rol.name === ayarlar.ROLLER.jailRolu);

    if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`**Yetkin yetersiz.**`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
if (ayarlar.SERVER.kilitKapatLimit > 0 && kilitKapatLimit.has(message.author.id) && kilitKapatLimit.get(message.author.id) == ayarlar.SERVER.kilitKapatLimit) return message.channel.send("Saatlik kilitleme sınırına ulaştın!").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
  

message.channel.send(`${message.channel} kanalı kilitlendi.`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
  

let everyone = message.guild.roles.cache.find(a => a.name === 'Member of Athen');

message.channel.permissionOverwrites.edit(everyone, { 'SEND_MESSAGES': false }, 'Kilitleyen '+message.author.tag);


      if (ayarlar.SERVER.kilitKapatLimit > 0) {
      if (!kilitKapatLimit.has(message.author.id)) kilitKapatLimit.set(message.author.id, 1);
      else kilitKapatLimit.set(message.author.id, kilitKapatLimit.get(message.author.id) + 1);
      setTimeout(() => {
        if (kilitKapatLimit.has(message.author.id)) kilitKapatLimit.delete(message.author.id);
      }, 1000 * 60 * 60);
    }
 };


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases:['kilit','sohbetkilit'],
    permlevel: 0
};

exports.help = {
    name: "kilit"
};