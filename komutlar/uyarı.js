const { Discord, MessageEmbed } = require('discord.js');
const Utils = global.Utils;
const ayarlar = require('../ayarlar.json');

const table = require('table')
exports.run = async (client, message, args ) => {
	let uyarıLog = message.guild.channels.cache.find(channel => channel.name === ayarlar.LOGS.uyarıLog);
        if (!ayarlar.ROLLER.ÜststaffRoles.some(perm => message.member.roles.cache.has(perm)) && !message.member.permissions.has(8)) return message.react(ayarlar.EMOJİ.hata) && message.reply("Yetersiz yetki.").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.react(ayarlar.EMOJİ.hata) && message.reply("Üye bulunamadı.").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
        if (member.user.id == message.author.id) return message.react(ayarlar.EMOJİ.hata) && message.reply("Kendine uyarı veremezsin.").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
        if (message.member.roles.highest.position <= member.roles.highest.position) return message.react(ayarlar.EMOJİ.hata) && message.reply("Kişinin yetkisi senden yüksek veya aynı yetkiye sahipsiniz.").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
        const Reason = args.slice(1).join(" ");
        if (!Reason) return message.react(ayarlar.EMOJİ.hata) && message.reply(`Hata: Lütfen bir uyarı sebebi belirtin.`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
        await Utils.CezaEkle(member, message.member, "Uyarı", Reason, {
            Tarih: Date.now(),
            Sure: null,
            Bitis: null
        });

        let Cezacik = await Utils.CezalariGetir(member) || [];
        Cezacik = Cezacik.filter(xd => xd.Tip == "Uyarı");
        let cezaPuan = Cezacik.length > 3 ? (Cezacik.length -3) * 250 : 0;

        await message.react(ayarlar.EMOJİ.onay);
        message.reply(`${member.toString()} kişisi __${Reason}__ sebebi ile uyarıldı! (Ceza Numarası: \`#${await Utils.cezaNumarasiGetir()-1}\`)`).catch(err => {});

        return uyarıLog.send(`${member} kişisi ${message.member} tarafından uyarıldı.\nSebep: ${Reason} Ceza ID: ${await Utils.cezaNumarasiGetir()-1} `).catch(err => {});;
    }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases:['uyarı','warn'],
    permlevel: 0
};

exports.help = {
    name: "warn"
};

