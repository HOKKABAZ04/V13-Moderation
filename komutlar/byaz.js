const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {
    let mesaj = args.slice(0).join(' ');
    let rol = message.mentions.roles.first()
  if (!message.member.roles.cache.has("1022266297209344151")) return message.react(ayarlar.EMOJİ.hata) && message.channel.send("**Bu Komutu Kullanmak İçin İznin Yok.**").then(msg => { setTimeout(() => msg.delete(), 5000)})
    if (mesaj.length < 1) return message.reply('Yazmam için herhangi bir şey yazmalısın.');
  message.delete();
  message.channel.send(mesaj);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yaz'],
  permLevel: 3
};

exports.help = {
  name: 'byaz',
  description: 'İstediğiniz şeyi bota yazdırır.',
  usage: 'yaz [yazdırmak istediğiniz şey]'
};