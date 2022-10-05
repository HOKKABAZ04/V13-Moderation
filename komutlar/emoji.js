const { MessageEmbed } = require("discord.js");
const data = require('quick.db')
const ayarlar = require('../ayarlar.json');
const emojiOlusturmaLimit = new Map();
exports.run = async (client, message, args, ayar, emoji) => {


 
   let guild = message.guild;
  
if(args[0] === "oluştur" || args[0] === "ekle") {

  if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply(`**Yetkin yetersiz.**`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })

    let [link, ad] = args.slice(1).join(" ").split(" ");
    if (!link) return message.channel.send(`Bir link yazmalısın. Doğru kullanım: **${ayarlar.BOT.prefix}emoji oluştur <link> <isim>**`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })    
  
  if (!ad) return message.channel.send(`Bir isim yazmalısın. Doğru kullanım: **${ayarlar.BOT.prefix}emoji oluştur <link> <isim>**`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
    guild.emojis.create(link, ad)
      .then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
    return;
  };
  if (ayarlar.SERVER.emojiOlusturmaLimit > 0 && emojiOlusturmaLimit.has(message.author.id) && emojiOlusturmaLimit.get(message.author.id) == ayarlar.SERVER.emojiOlusturmaLimit) return message.channel.send("Saatlik emoji oluşturma sınırına ulaştın!").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
  if(args[0] === "id") {
    if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply(`**Yetkin yetersiz.**`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
    try {
      message.channel.send(`Sunucuda Bulunan Emojiler (${message.guild.emojis.cache.size} adet) \n\n${message.guild.emojis.cache.map(emoji => emoji.id + " | " + emoji.toString()).join('\n')}`, {code: 'xl', split: true})
    } catch (err) { };
    return
  };
  
  if (message.guild.emojis.cache.some(x => `${x.name}`.includes(args[0]))) {
    if (!message.guild.emojis.cache.some(x => `${x.name}`.includes(args[0]))) return message.channel.send(`Sunucuda  \`${args[0]}\`  adında bir emoji bulunamadı!`);
    const emoji = new MessageEmbed()
    .setColor('RANDOM')
    .setFooter(client.user.username, client.user.avatarURL)
    .setDescription(`**Emoji:**  ${message.guild.emojis.cache.find(a => a.name === args[0])} \n**Emoji Adı:**  ${message.guild.emojis.cache.find(a => a.name === args[0]).name} \n**Emoji ID'si:**  ${message.guild.emojis.cache.find(a => a.name === args[0]).id} \n**Emoji Kodu:**  \`${message.guild.emojis.cache.find(x => x.name == args[0]).toString()}\``);
    try {
      message.channel.send(emoji)
    } catch (err) {
      const embed = new MessageEmbed()
      .addField(`Sunucuda Bulunan Emojiler`, `Üzgünüm ama sunucuda ya çok fazla emoji bulunuyor ya da hiç emoji bulunmuyor. Bunları gösteremiyorum. Discord buna izin vermiyor.`)
      .setColor(0x00ffff)
      message.channel.send({ embeds: [embed] })
    };
    return;
  };
  
  
      if (ayarlar.SERVER.emojiOlusturmaLimit > 0) {
      if (!emojiOlusturmaLimit.has(message.author.id)) emojiOlusturmaLimit.set(message.author.id, 1);
      else emojiOlusturmaLimit.set(message.author.id, emojiOlusturmaLimit.get(message.author.id) + 1);
      setTimeout(() => {
        if (emojiOlusturmaLimit.has(message.author.id)) emojiOlusturmaLimit.delete(message.author.id);
      }, 1000 * 60 * 60);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases:['emojiyükle','emoji'],
    permlevel: 0
};

exports.help = {
    name: "emojiyükle"
};