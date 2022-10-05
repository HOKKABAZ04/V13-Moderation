const { Discord, MessageEmbed } = require('discord.js');
const Utils = global.Utils;
const ayarlar = require('../ayarlar.json');
const ms = require('ms');
const Ceza = require('../Schemas/Ceza');
const table = require('table')

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
        if (!member) return message.react(ayarlar.EMOJİ.hata) && message.reply("Üye bulunamadı").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  });
        if (member.user.id == message.author.id) return message.react(ayarlar.EMOJİ.hata) && message.reply("Kendi muteni kaldıramazsın.").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
        if (message.member.roles.highest.position <= member.roles.highest.position) return message.react(ayarlar.EMOJİ.hata) && message.reply("Kişinin yetkisi senden yüksek veya aynı yetkiye sahipsiniz.").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })

        let Mutes = await Utils.CezalariGetir(member) || [];
        Mutes = Mutes.filter(cezacik => cezacik.Aktif == true && cezacik.Tip == "Voice Mute");
        if (Mutes.length == 0) return message.react(ayarlar.EMOJİ.hata) && message.reply(`Hata: Bu kullanıcının davam eden bir ses susturması bulunmuyor.`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })

        for (mutes of Mutes) {
          const usr = message.guild.members.cache.get(mutes.userID);
          muteLog.send(`${usr} kişisinin sesli mutesi ${message.member} tarafından kaldırıldı. {Ceza ID: ${mutes.ID}}`);
          await Ceza.findOneAndUpdate({ ID: mutes.ID }, { Aktif: false, Kaldiran: message.author.id });
        };

        await message.react(ayarlar.EMOJİ.onay);
        if (member.voice && member.voice.channelID !== null) await member.voice.setMute(false);
        return message.reply(`${member} kişisinin sesli sohbet susturması başarılı bir şekilde kaldırıldı!`);
    }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases:['unvmute'],
    permlevel: 0
};

exports.help = {
    name: "unvmute"
};