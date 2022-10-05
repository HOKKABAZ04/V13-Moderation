const { Discord, MessageEmbed } = require('discord.js');
const ayarlar = require('../ayarlar.json');
const table = require('table')
const Utils = global.Utils;
const banLimit = new Map();
exports.run = async (client, message, args ) => {
 let embed = new MessageEmbed().setFooter(ayarlar.BOT.footer).setColor("RANDOM");

let ms = require("ms");

let cezapuanlog = message.guild.channels.cache.find(channel => channel.name === ayarlar.LOGS.cezapuanlog);
let banLog = message.guild.channels.cache.find(channel => channel.name === ayarlar.LOGS.banLog);
let bangifi = "https://c.tenor.com/jJuyU09YX3AAAAAd/thor-banhammer.gif"

let bancıRol = message.guild.roles.cache.find(rol => rol.name === ayarlar.ROLLER.bancıRol);
let bancıRolID = bancıRol.id


if (!message.member.roles.cache.has(bancıRolID) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`**Yetkin yetersiz.**`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
if (ayarlar.SERVER.banlimit > 0 && banLimit.has(message.author.id) && banLimit.get(message.author.id) == ayarlar.SERVER.banlimit) return message.channel.send("Saatlik ban sınırına ulaştın!").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })

        if (args[0] == "bilgi" || args[0] == "info") {
          const ID = args[1];
          if (!ID) return message.reply(`Hata: Geçerli bir kullanıcı ID'si belirtin.`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
          const Embed = embed
          await message.guild.bans.fetch().then(async (xd) => {
            const aranan = xd.find(usr => usr.user.id == ID);
            if (!aranan) return message.reply(`Hata: Bu kullanıcı sunucudan yasaklanmamış.`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
            let text = `${aranan.user.tag} (\`${aranan.user.id}\`) kişisi sunucumuzdan aşağıdaki sebepten ötürü yasaklanmış.\n\n\`•\` ${aranan.reason || "Sebep Belirtilmemiş."}`;

            await message.guild.fetchAuditLogs({ type: 'MEMBER_BAN_ADD', limit: 100 }).then(denetim => {
              const user = denetim.entries.find(xd => xd.target.id == aranan.user.id);

              if (user) {
                text += `\n─────────────────────────────\nKullanıcı, ${user.executor.tag} (\`${user.executor.id}\`) tarafından \`${Utils.tarih(user.createdAt)}\` tarihinde yasaklanmış.`;
                return message.reply({ embeds: [Embed.setDescription(text)] });
              } else {
                text += `\n\nBu yasaklama, son 100 yasaklama içinde olmadığından dolayı ban bilgisini size gösteremiyorum.`;
                return message.reply({ embeds: [ Embed.setDescription(text)] });
              };
            });
          }).catch(err => {
            return message.reply(`Hata: Kullanıcının yasak bilgilerini çekemedim.`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
          });
          return;
        };

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const Reason = args.slice(1).join(" ");

        if (!member) return message.react(ayarlar.EMOJİ.hata) && message.reply(`Doğru kullanımı: .ban @Etiket/ID`).catch(err => {}).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
  
  
        if (member.user.id == message.author.id) return message.react(ayarlar.EMOJİ.hata) && message.reply("Kendini banlayamazsın").catch(err => {}).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
        if (message.member.roles.highest.position <= member.roles.highest.position) return message.react(ayarlar.EMOJİ.hata) && message.reply("Banlamaya çalıştığın kişinin yetkisi senden yüksek.").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
        if (!Reason) return message.react(ayarlar.EMOJİ.hata) && message.reply(`Hata: Geçerli bir yasaklama sebebi belirtin!`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
        if (!member.bannable) return message.react(ayarlar.EMOJİ.hata) && message.reply(`Hata: Bu kullanıcıyı yasaklamak için yetkim yok.`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })

        message.guild.members.ban(member.id, { reason: `Yetkili: ${message.author.tag} | Sebep: ${Reason}` }).catch(err => {});

        await Utils.CezaEkle(member, message.member, "Ban", Reason, {
            Tarih: Date.now(),
            Sure: null,
            Bitis: null
        });
message.react(ayarlar.EMOJİ.onay);
message.channel.send(`${member.toString()} kişisi __${Reason}__ sebebi ile ${message.member.toString()} tarafından sunucudan yasaklandı! (Ceza Numarası: \`#${await Utils.cezaNumarasiGetir()-1}\`)`, {
files: [bangifi]
}).catch(err => {});

return cezapuanlog.send(`${message.author} tarafından, ${member.toString()} banlandı. \nCeza ID: ${await Utils.cezaNumarasiGetir()-1} Sebep: ` + Reason ).catch(err => {});;
    if (ayarlar.SERVER.banlimit > 0) {
      if (!banLimit.has(message.author.id)) banLimit.set(message.author.id, 1);
      else banLimit.set(message.author.id, banLimit.get(message.author.id) + 1);
      setTimeout(() => {
        if (banLimit.has(message.author.id)) banLimit.delete(message.author.id);
      }, 1000 * 60 * 60);
    }
	}



exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases:['ban','yasakla','idam', 'yargı'],
    permlevel: 0
};

exports.help = {
    name: "ban"
};