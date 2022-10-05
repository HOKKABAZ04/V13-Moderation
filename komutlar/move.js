const { MessageEmbed } = require("discord.js");
const ayarlar = require('../ayarlar.json');
const Discord = require("discord.js")
exports.run = async (client, message, args) => {
	let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let log = message.guild.channels.cache.find(log => log.name === ayarlar.LOGS.moveLog);

  let embed = new MessageEmbed().setFooter(ayarlar.BOT.footer).setColor("GREEN");

  let botkomutları = message.guild.channels.cache.find(channel => channel.name === ayarlar.KANALLAR.botkomutları);

 if(message.channel.id != botkomutları && message.channel.id != "1021119961105694730") return message.reply(`Bu komutu sadece **${botkomutları}/<#1021119961105694730>** kanallarında kullanabilirsiniz.`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
  
  if (!uye) return message.channel.send({ embeds: [embed.setDescription("**Ses odana çekilecek üyeyi belirtmelisin!**")]}).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
  if (!message.member.voice.channel || !uye.voice.channel || message.member.voice.channel === uye.voice.channel) return message.channel.send({ embeds: [embed.setDescription("**Belirtilen üyenin ve kendinin ses kanalında olduğundan emin ol!**")]}).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
  if (message.member.permissions.has("ADMINISTRATOR")) {
    await message.guild.members.cache.get(uye.id).voice.setChannel(message.member.voice.channel)
    message.react("✅").catch();
		log.send({ embeds: [embed.setDescription(`**${uye} __çek__ komutuyla ${message.author} adlı kişinin olduğu odaya çekildi.**`)]});
  } else {
	  
       const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setCustomId("GİT")
            .setLabel("GİT")
            .setStyle("SUCCESS"),
            new Discord.MessageButton()
            .setCustomId("GİTME")
            .setLabel("GİTME")
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
${uye}, ${message.member} üyesi sizi ${message.member.voice.channel.name} adlı kanala çekmek istiyor kabul ediyor musun?
        `)
		.setFooter(ayarlar.BOT.footer)
		
        let msg = await message.channel.send({ content: `${uye}`, embeds: [embed], components: [row] })

        var filter = (button) => button.user.id === uye.id;
        const collector = msg.createMessageComponentCollector({ filter, time: 20000 })

        collector.on("collect", async (button) => {
           
            if(button.customId === "GİT") {
                row.components[0].setDisabled(true)
                row.components[1].setDisabled(true)
                row.components[2].setDisabled(true)
                msg.edit({ components: [row] })

        message.guild.members.cache.get(uye.id).voice.setChannel(message.member.voice.channel)
        button.reply(`Başarıyla ${message.member} kişisinin bulunduğu \`${message.member.voice.channel.name}\` isimli kanala gittiniz.`)
		          message.react("✅").catch();
		log.send({ embeds: [embed.setDescription(`**${uye} __çek__ komutuyla ${message.author} adlı kişinin olduğu odaya çekildi.**`)]});
            
    } else if(button.customId === "GİTME") {
        row.components[0].setDisabled(true)
        row.components[1].setDisabled(true)
        row.components[2].setDisabled(true)
        msg.edit({ components: [row] })

        button.reply("Odaya çekilme işlemi reddedildi.")
    } else if(button.customId === "İPTAL") {
        button.reply("Odaya çekilme işlemi iptal edildi.")
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
    aliases:['move','transport','çek','taşı','gel'],
    permlevel: 0
};

exports.help = {
    name: "move"
};