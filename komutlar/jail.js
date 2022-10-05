const { Discord, MessageEmbed } = require('discord.js');
const Utils = global.Utils;
const ayarlar = require('../ayarlar.json');
const ms = require('ms');

exports.run = async (client, message, args ) => {
let embed = new MessageEmbed().setFooter(ayarlar.BOT.footer).setColor("RANDOM");

let jailLog = message.guild.channels.cache.find(channel => channel.name === ayarlar.LOGS.jailLog);

let yetkili = message.guild.roles.cache.find(rol => rol.name === ayarlar.ROLLER.jailYetkili);
let jailYetkiliID = yetkili.id

let jailRol = message.guild.roles.cache.find(rol => rol.name === ayarlar.ROLLER.jailRolu);
let jailRolID = jailRol.id

let boosterRole = message.guild.roles.cache.find(rol => rol.name === ayarlar.ROLLER.boosterRol);
let boosterRoleID = boosterRole.id


if (!message.member.roles.cache.has(jailYetkiliID) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`**Yetkin yetersiz.**`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      let Surecik = args[1];
      const Reason = args.slice(2).join(" ");

      if (!member) return message.react(ayarlar.EMOJİ.hata) && message.reply(`Doğru kullanımı: .jail @Etiket/ID`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
      if (member.user.id == message.author.id) return message.react(ayarlar.EMOJİ.hata) && message.reply("Kendini cezalıya atamazsın.").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
      if (message.member.roles.highest.position <= member.roles.highest.position) return message.react(ayarlar.EMOJİ.hata) && message.reply("Kişinin yetkisi senden yüksek veya eşit yetkiye sahipsiniz.").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
      if(!Surecik || (Surecik && ms(Surecik) == undefined)) return message.react(ayarlar.EMOJİ.hata) && message.reply(`Hata: Geçerli bir cezalandırma süresi belirtmelisiniz!`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
      Surecik = ms(Surecik);
      if (!Reason) return message.react(ayarlar.EMOJİ.hata) && message.reply(`Hata: Geçerli bir cezalandırma sebebi belirtin!`).catch(err => {});

      if (message.guild.roles.cache.has(jailRolID)) await member.roles.cache.has(boosterRoleID) ? member.roles.set([boosterRoleID, jailRolID]) : member.roles.set([jailRolID]);

      await Utils.CezaEkle(member, message.member, "Jail", Reason, {
          Tarih: Date.now(),
          Sure: Surecik,
          Bitis: Date.now() + Surecik
      });

      message.react(ayarlar.EMOJİ.onay);
      message.channel.send(`${member.toString()} kişisi __${Reason}__ sebebi ile **${Utils.turkishDate(Surecik)}** boyunca cezalı olarak işaretlendi! (Ceza Numarası: \`#${await Utils.cezaNumarasiGetir()-1}\`)`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
      return jailLog.send(`${member}, ${message.member} tarafından cezalıya gönderildi.\nSüresi: **${Utils.turkishDate(Surecik)}** Sebep: ${Reason} (Ceza Numarası: \`#${await Utils.cezaNumarasiGetir()-1}\`) `).catch(err => {});
   
	}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases:['jail'],
    permlevel: 0
};

exports.help = {
    name: "jail"
};
