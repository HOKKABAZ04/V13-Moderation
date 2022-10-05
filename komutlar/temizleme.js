const { MessageEmbed } = require("discord.js");
const ayarlar = require('../ayarlar.json');

const temizlemeLimit = new Map();
exports.run = function(client, message, args) {

  let boosterRole = message.guild.roles.cache.find(rol => rol.name === ayarlar.ROLLER.boosterRol);
 
  let uye = client.guilds.cache.get(ayarlar.SERVER.sunucu).members.cache.get(message.author.id);

let embed = new MessageEmbed().setFooter(ayarlar.BOT.footer).setColor("RANDOM");

 if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`**Yetkin yetersiz.**`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
if (ayarlar.SERVER.temizlemeLimit > 0 && temizlemeLimit.has(message.author.id) && temizlemeLimit.get(message.author.id) == ayarlar.SERVER.temizlemeLimit) return message.channel.send("Saatlik temizleme sınırına ulaştın!").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })

  let miktar = Number (args[0]);
  if (!miktar || miktar < 1 || miktar > 100) return message.channel.send(`Geçerli bir miktar belirtmelisin.`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
  message.channel.bulkDelete(miktar).then(msjlar => message.channel.send(`Başarıyla **${msjlar.size}** adet mesaj silindi!`)).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
 if (ayarlar.SERVER.temizlemeLimit > 0) {
      if (!temizlemeLimit.has(message.author.id)) temizlemeLimit.set(message.author.id, 1);
      else temizlemeLimit.set(message.author.id, temizlemeLimit.get(message.author.id) + 1);
      setTimeout(() => {
        if (temizlemeLimit.has(message.author.id)) temizlemeLimit.delete(message.author.id);
      }, 1000 * 60 * 60);
    }

};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases:['clear','sil','temizle','sohbetsil'],
    permlevel: 0
};

exports.help = {
    name: "temizle"
};