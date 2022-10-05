const { Discord, MessageEmbed } = require('discord.js');
const Utils = global.Utils;
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
      let Surecik = args[1];
      const Reason = args.slice(2).join(" ");

      if (!member) return message.react(ayarlar.EMOJİ.hata) && message.reply(`Doğru kullanımı: .mute @Etiket/ID`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
	  if (member.bot) return message.react(ayarlar.EMOJİ.hata) && message.reply("Botları muteleyemezsin.").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
      if (member.user.id == message.author.id) return message.react(ayarlar.EMOJİ.hata) && message.reply("Kendini muteleyemezsin.").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
      if (message.member.roles.highest.position <= member.roles.highest.position) return message.react(ayarlar.EMOJİ.hata) && message.reply("Kişinin senden daha üst bir yetkisi var veya aynı yetkiye sahipsiniz.").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
      if(!Surecik || (Surecik && ms(Surecik) == undefined)) return message.react(ayarlar.EMOJİ.hata) && message.reply(`Hata: Geçerli bir susturma süresi belirtmelisiniz!`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
      Surecik = ms(Surecik);
      if (!Reason) return message.react(ayarlar.EMOJİ.hata) && message.reply(`Hata: Geçerli bir susturma sebebi belirtin!`).catch(err => {});

      if (message.guild.roles.cache.has(muteRolID)) await member.roles.add(muteRolID).catch(err => {});

      await Utils.CezaEkle(member, message.member, "Chat Mute", Reason, {
          Tarih: Date.now(),
          Sure: Surecik,
          Bitis: Date.now() + Surecik
      });

      message.react(ayarlar.EMOJİ.onay);
      message.channel.send(`${member.toString()} kişisi __${Reason}__ sebebi ile **${Utils.turkishDate(Surecik)}** boyunca metin kanallarında susturuldu!\n(Ceza Numarası: \`#${await Utils.cezaNumarasiGetir()-1}\`)`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
	return muteLog.send(`${member}, ${message.member} tarafından mutelendi.\nMutelenme Süresi: **${Utils.turkishDate(Surecik)}** Sebep: ${Reason} (Ceza Numarası: \`#${await Utils.cezaNumarasiGetir()-1}\`) `).catch(err => {});
    }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases:['mute'],
    permlevel: 0
};

exports.help = {
    name: "mute"
};
