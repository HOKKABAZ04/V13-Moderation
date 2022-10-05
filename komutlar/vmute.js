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


  if (!message.member.roles.cache.has(muteYetkiliID) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`**Yetkin yetersiz.**`).then(msg => { msg.delete({ timeout: 10000 })}).catch(console.error);
  
      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      let Surecik = args[1];
      const Reason = args.slice(2).join(" ");

      if (!member) return message.react(ayarlar.EMOJİ.hata) && message.reply(`Doğru kullanımı: .vmute @Etiket/ID`).then(msg => { setTimeout(() => msg.delete(), 10000)})
      if (member.user.id == message.author.id) return message.react(ayarlar.EMOJİ.hata) && message.reply("Kendine mute atamazsın.").then(msg => { setTimeout(() => msg.delete(), 10000)})
      if (message.member.roles.highest.position <= member.roles.highest.position) return message.react(ayarlar.EMOJİ.hata) && message.reply("Kişinin yetkisi senden yüksek veya aynı yetkidesiniz.").then(msg => { setTimeout(() => msg.delete(), 10000)})
      if(!Surecik || (Surecik && ms(Surecik) == undefined)) return message.react(ayarlar.EMOJİ.hata) && message.reply(`Hata: Geçerli bir susturma süresi belirtmelisiniz!`).then(msg => { setTimeout(() => msg.delete(), 10000)})
      Surecik = ms(Surecik);
      if (!Reason) return message.react(ayarlar.EMOJİ.hata) && message.reply(`Hata: Geçerli bir susturma sebebi belirtin!`).then(msg => { setTimeout(() => msg.delete(), 10000)})

      await Utils.CezaEkle(member, message.member, "Voice Mute", Reason, {
          Tarih: Date.now(),
          Sure: Surecik,
          Bitis: Date.now() + Surecik
      });

      if (member.voice && member.voice.channelID !== null) await member.voice.setMute(true).catch(err => {});

      message.react(ayarlar.EMOJİ.onay);
      message.channel.send(`${member.toString()} kişisi __${Reason}__ sebebi ile **${Utils.turkishDate(Surecik)}** boyunca sesli kanallarda susturuldu! (Ceza Numarası: \`#${await Utils.cezaNumarasiGetir()-1}\`)`);
return muteLog.send(`${member} kişisi ${message.member} tarafından sesli kanallarda susturuldu!\nSebep: ${Reason} Süre: ${Utils.turkishDate(Surecik)} Ceza ID: ${await Utils.cezaNumarasiGetir()-1}`).catch(err => {});
    }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases:['vmute'],
    permlevel: 0
};

exports.help = {
    name: "vmute"
};
