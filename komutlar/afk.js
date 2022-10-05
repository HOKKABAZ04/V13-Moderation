const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  let botkomutları = message.guild.channels.cache.find(channel => channel.name === ayarlar.KANALLAR.botkomutları);

 if(message.channel.id != botkomutları) return message.reply(`Bu komutu sadece **${botkomutları}** kanalında kullanabilirsiniz.`).then(msg => {
    setTimeout(() => msg.delete(), 6000)
  })

let reason = args.slice(0).join("  ") 
let rol = message.mentions.roles.first()
 if(reason.toLowerCase().includes(".com") || reason.toLowerCase().includes("youtube.com") || reason.toLowerCase().includes("gg/") || reason.toLowerCase().includes("discord.gg")|| reason.includes("http") || reason.includes(rol) || reason.includes("@here") || reason.includes("@everyone")){
 message.delete(60);
 message.reply("**Huh..**").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
return;
}
 if(!reason) reason = "Şu an afkyım, en kısa sürede geri döneceğim."; 
  setTimeout(function(){
  if (reason) db.set(`${message.author.id}.afk.sebep`, reason);
  db.set(`${message.author.id}.afk.sure`, new Date())
        },500)
  
  if (message.member.manageable) {
	  message.member.setNickname(`[AFK]${message.member.displayName}`);
	  
  } else {
	      message.channel.send(`**AFK moduna başarıyla giriş yaptın ama senin ismini güncelleyemiyorum.**`).then(msg => {
    setTimeout(() => msg.delete(), 3000)
  })
	
  }
  message.react("✔️")

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases:['afk'],
    permlevel: 0
};

exports.help = {
    name: "afk"
};