const { Discord, MessageEmbed } = require('discord.js');
const Utils = global.Utils;
const ayarlar = require('../ayarlar.json');
const Ceza = require('../Schemas/Ceza');
const table = require('table')


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
        if (!member) return message.react(ayarlar.EMOJİ.hata) && message.reply("Üye bulunamadı").catch(err => {});
        if (member.user.id == message.author.id) return message.react(ayarlar.EMOJİ.hata) && message.reply("Kendinden cezalıdan çıkarmayı deneyemezsin.").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
        if (message.member.roles.highest.position <= member.roles.highest.position) return message.react(ayarlar.EMOJİ.hata) && message.reply("Kişinin yetkisi senden üstün veya aynı yetkidesiniz.").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })

        let Jail = await Utils.CezalariGetir(member) || [];
        Jail = Jail.filter(cezacik => cezacik.Aktif == true && cezacik.Tip == "Jail");
        if (Jail.length == 0) return message.react(ayarlar.EMOJİ.hata) && message.reply(`Hata: Bu kullanıcının davam eden bir cezası bulunmuyor.`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })

        for (jails of Jail) {
          const usr = message.guild.members.cache.get(jails.userID);
         jailLog.send(`${usr}, ${message.member} tarafından cezalısı kaldırıldı.(Jail Numarası: \`#${jails.ID}\`) `).catch(err => {});
  
        await Ceza.findOneAndUpdate({ ID: jails.ID }, { Aktif: false, Kaldiran: message.author.id });
		member.roles.cache.has(boosterRoleID) ? member.roles.set([boosterRoleID, ayarlar.ROLLER.teyitsizRolleri]) : member.roles.set([ayarlar.ROLLER.teyitsizRolleri]);


        }

        await message.react(ayarlar.EMOJİ.onay);
        return message.reply(`${member} kişisinin cezası başarılı bir şekilde kaldırıldı!`);
      }


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases:['unjail'],
    permlevel: 0
};

exports.help = {
    name: "unjail"
};

