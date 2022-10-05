const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json")

module.exports.run = async (bot, message, args) => { 
    
if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`**Yetkin yetersiz.**`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
  
 message.delete();
 message.guild.bans.fetch().then(rbanlar => message.channel.send(`Sunucuda toplam \`${rbanlar.size}\` yasaklı kişi bulunmaktadır!`)).catch(console.error).then(msg => {
    setTimeout(() => msg.delete(), 7000)
  })
		
};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases:['banlananlar'],
    permlevel: 0
};

exports.help = {
    name: "banlananlar"
};