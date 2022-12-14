const Discord = require('discord.js');
const Utils = global.Utils;
const ayarlar = require('../ayarlar.json');

const table = require('table')

exports.run = async (client, message, args ) => {
        if (!ayarlar.ROLLER.staffRoles.some(perm => message.member.roles.cache.has(perm)) && !message.member.permissions.has(8)) return message.react(ayarlar.EMOJİ.hata) && message.reply("Yetersiz yetki.").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
        const ID = args[0];
        if(!ID || isNaN(ID)) return message.react(ayarlar.EMOJİ.hata) && message.reply(`Hata: Geçerli bir Ceza ID'si belirtin.`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
        const Ceza = await Utils.CezaBilgi(ID);
        if(!Ceza) return message.react(ayarlar.EMOJİ.hata) && message.reply(`Hata: (\`#${ID}\`) numaralı ceza bulunamadı.`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
        const User = await Utils.getUser(Ceza.userID);
        const Yetkili = await Utils.getUser(Ceza.yetkiliID);

        const Embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(User ? User.tag : message.guild.name, User ? User.avatarURL({ dynamic: true }) : message.guild.iconURL({ dynamic: true }))
        .setFooter(`${ayarlar.BOT.footer} | Ceza Numarası: #${Ceza.ID}`, client.user.avatarURL({ dynamic: true, format: "png" }))
        .setDescription(`
            ${User ? `<@${User.id}> (\`${User.tag}\` **-** \`${User.id}\`)` : `<@${Ceza.userID}> **-** \`${Ceza.userID}\``} kişisine uygulanan **#${Ceza.ID}** ID'li ceza bilgileri aşağıdadır.
            ─────────────────
            » Üye Bilgisi: ${User ? `<@${User.id}> (\`${User.tag}\` **-** \`${User.id}\`)` : `<@${Ceza.userID}> **-** \`${Ceza.userID}\``}
            » Yetkili Bilgisi: ${Yetkili ? `<@${Yetkili.id}> (\`${Yetkili.tag}\` **-** \`${Yetkili.id}\`)` : `<@${Ceza.yetkiliID}> **-** \`${Ceza.yetkiliID}\``}
            » Ceza Tarihi: \`${Utils.tarih(Number(Ceza.Other.Tarih))}\`
            » Ceza Sebebi: \`${Ceza.Sebep}\`
            » Ceza Süresi: \`${Ceza.Other.Sure ? Utils.turkishDate(Number(Ceza.Other.Sure)) : `Yok!`}\`
            » Ceza Durumu: \`${Ceza.Aktif == true ? `✅ Devam Ediyor!` : `❌ Bitmiş!`}\`
            ${Ceza.Kaldiran !== "Kaldırılmamış." ? `» Cezayı Kaldıran: <@${Ceza.Kaldiran}> (\`${Ceza.Kaldiran}\`)` : ``}
            `)

        message.react(ayarlar.EMOJİ.onay);
        return message.reply({ embeds: [Embed]}).catch(err => {});
      }
	

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases:['ceza'],
    permlevel: 0
};

exports.help = {
    name: "ceza"
};
