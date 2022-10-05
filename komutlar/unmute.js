const { Discord, MessageEmbed } = require('discord.js');
const Utils = global.Utils;
const Ceza = require('../Schemas/Ceza.js');
const table = require('table')
const ayarlar = require('../ayarlar.json');
const ms = require('ms');

exports.run = async (client, message, args ) => {

  let embed = new MessageEmbed().setFooter(ayarlar.BOT.footer).setColor("RANDOM");
  let muteLog = message.guild.channels.cache.find(channel => channel.name === ayarlar.LOGS.muteLog);
  let muteRolu = message.guild.roles.cache.find(rol => rol.name === ayarlar.ROLLER.muterol);
  let muteRolID = muteRolu.id

  let muteYetkili = message.guild.roles.cache.find(rol => rol.name === ayarlar.ROLLER.muteYetkili);
  let muteYetkiliID = muteYetkili.id


  if (!message.member.roles.cache.has(muteYetkiliID) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`**Yetkin yetersiz.**`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
  
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.reply("Üye bulunamadı").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
  
		if (member.bot) return message.react(ayarlar.EMOJİ.hata) && message.reply("Botları mutesini açamazsın.").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
	   if (member.user.id == message.author.id) return message.react(ayarlar.EMOJİ.hata) && message.reply("Kendi muteni açamazsın.").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
        if (message.member.roles.highest.position <= member.roles.highest.position) return message.react(ayarlar.EMOJİ.hata) && message.reply("Kişinin yetkisi senden yüksek veya seninle aynı yetkiye sahip.").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })

        let Mutes = await Utils.CezalariGetir(member) || [];
        Mutes = Mutes.filter(cezacik => cezacik.Aktif == true && cezacik.Tip == "Chat Mute");
        if (Mutes.length == 0) return message.react(ayarlar.EMOJİ.hata) && message.reply(`Hata: Bu kullanıcının davam eden bir sohbet susturması bulunmuyor.`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })

        for (mutes of Mutes) {
          const usr = message.guild.members.cache.get(mutes.userID);
          muteLog.send(`${member} mutesi ${message.member} tarafından kaldırıldı.`);
          await Ceza.findOneAndUpdate({ ID: mutes.ID }, { Aktif: false, Kaldiran: message.author.id });
        };

        message.react(ayarlar.EMOJİ.onay);
        if (member.roles.cache.has(muteRolID)) await member.roles.remove(muteRolID);
        return message.reply(`${member} kişisinin sohbet susturması başarılı bir şekilde kaldırıldı!`);
		
      }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases:['unmute'],
    permlevel: 0
};

exports.help = {
    name: "unmute"
};
