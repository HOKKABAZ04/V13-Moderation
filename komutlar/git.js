const { MessageEmbed } = require("discord.js");
const ayarlar = require('../ayarlar.json');
const Discord = require("discord.js")
exports.run = async (client, message, args, ayar, emoji) => {

	let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let log = message.guild.channels.cache.find(log => log.name === ayarlar.LOGS.moveLog);

  let embed = new MessageEmbed().setFooter(ayarlar.BOT.footer).setColor("RED")

  let botkomutları = message.guild.channels.cache.find(channel => channel.name === ayarlar.KANALLAR.botkomutları);

 if(message.channel.id != botkomutları && message.channel.id != "1021119961105694730") return message.reply(`Bu komutu sadece **${botkomutları}/<#1021119961105694730>** kanallarında kullanabilirsiniz.`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
 
  if (!uye) return message.channel.send({ embeds: [embed.setDescription("**Ses odasına gidilecek üyeyi belirtmelisin!**")]}).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
  
  if (!message.member.voice.channel || !uye.voice.channel || message.member.voice.channel === uye.voice.channel) return message.channel.send({ embeds: [embed.setDescription("**Belirtilen üyenin ve kendinin ses kanalında olduğundan emin ol!**")]}).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
  
  if (message.member.permissions.has("ADMINISTRATOR")) {
    await message.member.voice.setChannel(uye.voice.channelID);
    message.react('✅').catch();
	log.send({ embeds: [embed.setDescription(`**${uye} odana __git__ komutuyla ${message.author} giriş yaptı.**`)]});
	
  } else {
	  
       const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setCustomId("EVET")
            .setLabel("EVET")
            .setStyle("SUCCESS"),
            new Discord.MessageButton()
            .setCustomId("HAYIR")
            .setLabel("HAYIR")
            .setStyle("PRIMARY"),
            new Discord.MessageButton()
            .setCustomId("İPTAL")
            .setLabel("İPTAL")
            .setStyle("DANGER")
        )
		
        const embed = new Discord.MessageEmbed()
        .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
         .setColor("RANDOM")
        .setDescription(`
${uye}, ${message.member} üyesi sizin olduğunuz kanala gelmek istiyor izin veriyor musun?
        `)
		.setFooter(ayarlar.BOT.footer)
		
        let msg = await message.channel.send({ content: `${uye}`, embeds: [embed], components: [row] })

        var filter = (button) => button.user.id === uye.id;
        const collector = msg.createMessageComponentCollector({ filter, time: 20000 })

        collector.on("collect", async (button) => {
           
            if(button.customId === "EVET") {
                row.components[0].setDisabled(true)
                row.components[1].setDisabled(true)
                row.components[2].setDisabled(true)
                msg.edit({ components: [row] })

         message.member.voice.setChannel(uye.voice.channel);
        button.reply(`Başarıyla ${message.member} kişisi kanalınıza geldi.`)
	 
          message.react('✅').catch();
		 log.send({ embeds: [embed.setDescription(`**${uye} odana __git__  komutuyla ${message.author} giriş yaptı.**`)]});
    } else if(button.customId === "HAYIR") {
        row.components[0].setDisabled(true)
        row.components[1].setDisabled(true)
        row.components[2].setDisabled(true)
        msg.edit({ components: [row] })

        button.reply("Odaya gitme işlemi reddedildi.")
    } else if(button.customId === "İPTAL") {
        button.reply("Odaya gitme işlemi iptal edildi.")
        row.components[0].setDisabled(true)
        row.components[1].setDisabled(true)
        row.components[2].setDisabled(true)
        msg.edit({ components: [row] })

    }
        })

        collector.on("end", async (button) => {
            row.components[0].setDisabled(true)
            row.components[1].setDisabled(true)
            row.components[2].setDisabled(true)
            msg.edit({ components: [row] })

        })



      };





};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases:['git'],
    permlevel: 0
};

exports.help = {
    name: "git"
};