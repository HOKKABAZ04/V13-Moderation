const { Discord, MessageEmbed } = require('discord.js');
const Utils = global.Utils;
const ayarlar = require('../ayarlar.json');

const table = require('table')

exports.run = async (client, message, args ) => {
        if (!ayarlar.ROLLER.staffRoles.some(perm => message.member.roles.cache.has(perm)) && !message.member.permissions.has(8)) return message.react(ayarlar.EMOJİ.hata) && message.reply("Yetersiz yetki.").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.react(ayarlar.EMOJİ.hata) && message.reply(`Doğru kullanımı: .cezalar @Etiket/ID`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
        const Cezalar = await Utils.CezalariGetir(member);
        if (!Cezalar || Cezalar.length <= 0) return message.react(ayarlar.EMOJİ.hata) && message.reply(`Hata: Belirtilen üyenin ceza bilgisi bulunamadı!`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
        let Data = [["ID", "Durum", "Ceza Tarihi", "Ceza Türü", "Ceza Sebebi"]];

        Data = Data.concat(Cezalar.map((value) => {
          return [
            `#${value.ID}`,
            `${value.Aktif == true ? "✅" : "❌"}`,
            `${Utils.tarih(Number(value.Other.Tarih))}`,
            `${value.Tip}`,
            `${value.Sebep}`
          ]
        }));

        let veriler = table.table(Data, {
            columns: {
                0: {
                    paddingLeft: 1
                },
                1: {
                    paddingLeft: 1
                },
                2: {
                    paddingLeft: 1,
                },
                3: {
                    paddingLeft: 1,
                    paddingRight: 1
                },
            },
            border : table.getBorderCharacters(`void`),
            drawHorizontalLine: function (index, size) {
              return index === 0 || index === 1 || index === size;
            }
        });

       message.react(ayarlar.EMOJİ.onay);
        message.channel.send(`:no_entry_sign: <@${member.id}> (\`${member.user.tag.replace('`', '')}\` **-** \`${member.user.id}\`) kişisinin ceza kayıtları aşağıda belirtilmiştir. Tekli bir cezaya bakmak için \`${ayarlar.BOT.prefix}ceza ID\` komutunu uygulayınız.\n\`\`\`${veriler}\`\`\``).catch(awoken => {
          let dosya;
          dosya = new MessageAttachment(Buffer.from(veriler), `${uye.id}-cezalar.txt`);
          message.channel.send(`:no_entry_sign: <@${member.id}> (\`${member.user.tag.replace('`', '')}\` **-** \`${member.user.id}\`) kişisinin ceza kayıtları **Discord API** sınırını geçtiği için metin belgesi hazırlayıp gönderdim, oradan cezaları kontrol edebilirsin. Tekli bir cezaya bakmak için \`${ayarlar.BOT.prefix}ceza ID\` komutunu uygulayınız.`, dosya);
        });
      }
	

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases:['cezalar'],
    permlevel: 0
};

exports.help = {
    name: "cezalar"
};
