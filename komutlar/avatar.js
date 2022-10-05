const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
exports.run = async (client, message, args)=> {
  let botkomutları = message.guild.channels.cache.find(channel => channel.name === ayarlar.KANALLAR.botkomutları);

 if(message.channel.id != botkomutları) return message.reply(`Bu komutu sadece **${botkomutları}** kanalında kullanabilirsiniz.`).then(msg => {
    setTimeout(() => msg.delete(), 6000)
  })
let muser = message.mentions.users.first();
let userid;
if(isNaN(args[0])){
  if(!muser){
    userid = message.author.id;
  }else{
    userid = muser.id;
  }
}else{
  userid = args[0];
}
try{
	if(userid == "716327849979805736") {
		if(message.author.id == "716327849979805736") {
			message.channel.send(`${muser.displayAvatarURL()}`)
			return message.channel.send(":'(");
		}

	} else {
	

let user = await client.users.fetch(userid);
let avatar = user.displayAvatarURL({dynamic: true, size: 1024})
if(avatar.endsWith(".gif?size=1024")) {

let embed = new Discord.MessageEmbed()
.setAuthor(user.tag + '', user.displayAvatarURL())
.setDescription(`**[[PNG]](${user.displayAvatarURL({ format: 'png', size: 1024 })})** | **[[JPEG]](${user.displayAvatarURL({ format: 'jpeg', size: 1024 })})** | **[[GIF]](${user.displayAvatarURL({ format: 'gif', size: 1024 })})** | **[[WEBP]](${user.displayAvatarURL({ format: 'webp', size: 1024 })})**`)
.setImage(user.displayAvatarURL({dynamic: true, size: 1024}))
.setColor("RANDOM")
message.channel.send({ embeds: [embed] })

} else {

  let embed = new Discord.MessageEmbed()
.setAuthor(user.tag + '', user.displayAvatarURL())
.setDescription(`**[[PNG]](${user.displayAvatarURL({ format: 'png',  size: 1024 })})** | **[[JPEG]](${user.displayAvatarURL({ format: 'jpeg',  size: 1024 })})** | **~~[GIF]~~** | **[[WEBP]](${user.displayAvatarURL({ format: 'webp',  size: 1024 })})**`)
.setImage(user.displayAvatarURL({dynamic: true, size: 1024}))
.setColor("RANDOM")
message.channel.send({ embeds: [embed] })

}
	};
}catch{
  message.channel.send("Kullanıcıyı Bulamadım!").then(msg => {
    setTimeout(() => msg.delete(), 6000)
  })
  return;
}

 };


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases:['avatar'],
    permlevel: 0
};

exports.help = {
    name: "avatar"
};