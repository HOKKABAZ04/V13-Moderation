const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const kilitAcLimit = new Map();
exports.run = (client, message, args) => {

if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`**Yetkin yetersiz.**`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
if (ayarlar.SERVER.kilitAcLimit > 0 && kilitAcLimit.has(message.author.id) && kilitAcLimit.get(message.author.id) == ayarlar.SERVER.kilitAcLimit) return message.channel.send("Saatlik kilit açma sınırına ulaştın!").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
message.channel.send(`${message.channel} kanalının kilidi açıldı.`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })

let everyone = message.guild.roles.cache.find(a => a.name === 'Member of Athen');
message.channel.permissionOverwrites.edit(everyone, { 'SEND_MESSAGES': true }, 'Kilidi açan '+message.author.tag);

      if (ayarlar.SERVER.kilitAcLimit > 0) {
      if (!kilitAcLimit.has(message.author.id)) kilitAcLimit.set(message.author.id, 1);
      else kilitAcLimit.set(message.author.id, kilitAcLimit.get(message.author.id) + 1);
      setTimeout(() => {
        if (kilitAcLimit.has(message.author.id)) kilitAcLimit.delete(message.author.id);
      }, 1000 * 60 * 60);
    }

 };


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases:['kilitac','kilitaç','sohbetkilitac','sohbetkilitaç'],
    permlevel: 0
};

exports.help = {
    name: "kilitaç"
};