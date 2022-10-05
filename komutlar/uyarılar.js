const Discord = require('discord.js');
const Utils = global.Utils;
const ayarlar = require('../ayarlar.json');

const table = require('table')
exports.run = async (client, message, args ) => {

        if (!ayarlar.ROLLER.ÜststaffRoles.some(perm => message.member.roles.cache.has(perm)) && !message.member.permissions.has(8)) return message.react(ayarlar.EMOJİ.hata) && message.reply("Yetersiz yetki.").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!member) return message.react(ayarlar.EMOJİ.hata) && message.reply(`Doğru kullanımı: .uyarılar @Etiket/ID`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
			
        let user = member.user;

        let Cezalar = await Utils.CezalariGetir(member);
        Cezalar = Cezalar.filter(xd => xd.Tip == "Uyarı");
        if(!Cezalar || Cezalar.length == 0) return message.react(ayarlar.EMOJİ.hata) && message.reply(`Hata: Bu kullanıcının veri tabanında bir ceza kayıtı bulunamadı.`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
  
        let sayi = 1;
        const Uyarılar = Cezalar.map((ceza) => `- ${sayi++}. uyarı ${client.users.cache.has(ceza.yetkiliID) ? client.users.cache.get(ceza.yetkiliID).tag : "Bilinmeyen Kullanıcı"} tarafından ${Utils.tarih(Number(ceza.Other.Tarih))} tarihinde "${ceza.Sebep}" sebebiyle verildi.\n`).join('\n');

        const Embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
        .setFooter(ayarlar.BOT.footer, client.user.avatarURL({dynamic: true}))
        .setDescription(`${member.toString()} kullanıcısının uyarıları aşağıda belirtilmiştir:\n\n\`\`\`${Uyarılar}\`\`\``)

        message.react(ayarlar.EMOJİ.onay);
        return message.reply({ embeds: [Embed] }).catch(err => {});
    }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases:['uyarılar','warns'],
    permlevel: 0
};

exports.help = {
    name: "warns"
};