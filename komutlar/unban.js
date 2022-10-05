const { MessageEmbed } = require("discord.js");
const ayarlar = require('../ayarlar.json');
const moment = require("moment")

const Discord = require('discord.js');
const Utils = global.Utils;
const Database = require('../Schemas/Ceza');
const table = require('table')
const bankaldırma = new Map();
exports.run = async (client, message, args ) => {

let embed = new MessageEmbed().setFooter(ayarlar.BOT.footer).setColor("RANDOM");

  let ms = require("ms");
  let banLog = message.guild.channels.cache.find(channel => channel.name === ayarlar.LOGS.banLog);
  
let bancıRol = message.guild.roles.cache.find(rol => rol.name === ayarlar.ROLLER.bancıRol);
let bancıRolID = bancıRol.id

  if (!message.member.roles.cache.has(ayarlar.bancıRolID) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`**Yetkin yetersiz.**`).then(msg => { setTimeout(() => msg.delete(), 10000)})
  if (ayarlar.SERVER.bankaldırma > 0 && bankaldırma.has(message.author.id) && bankaldırma.get(message.author.id) == ayarlar.SERVER.bankaldırma) return message.channel.send("Saatlik ban kaldırma sınırına ulaştın!").then(msg => { setTimeout(() => msg.delete(), 10000)})


if (!args[0]) return message.channel.send(`**Yasaklamasını kaldırmak istediğin kişinin idsini gir.**`).then(msg => { setTimeout(() => msg.delete(), 10000)})

let sorguid = args[0]
const fetchBans =  message.guild.bans.fetch()
    
fetchBans.then(async (bans) => {
  let ban = await bans.find(a => a.user.id === sorguid)
  if (!ban) {
     message.channel.send(`${sorguid} idli kullanıcı zaten sunucuda yasaklı değil.`).then(msg => { setTimeout(() => msg.delete(), 10000)})

     
    } else {

if (!args[0]) return message.reply(`Doğru kullanım: ${ayarlar.BOT.prefix}unban ID`).then(msg => { setTimeout(() => msg.delete(), 10000)})

let reasonn = args.slice(1).join(" ") || "Sebep Girilmedi";
message.guild.bans.fetch(args[0]).then(async ({ user, reason }) => {
let Data = await Database.find({Activity: true, userID: user.id, Type: "Ban" });
if ((Data.length <= 0)) {};
Data.forEach(x => {
x.Activity = false;
x.save();
});
message.channel.send(`Ban başarılı bir şekilde açıldı.`).then(msg => { setTimeout(() => msg.delete(), 10000)})

message.guild.members.unban(user.id, `${message.author.tag} tarafından banı açıldı.`)
banLog.send(user.tag + ` adlı kullanıcının yasağı ${message.author} tarafından kaldırıldı.`)

    if (ayarlar.SERVER.bankaldırma > 0) {
      if (!bankaldırma.has(message.author.id)) bankaldırma.set(message.author.id, 1);
      else bankaldırma.set(message.author.id, bankaldırma.get(message.author.id) + 1);
      setTimeout(() => {
        if (bankaldırma.has(message.author.id)) bankaldırma.delete(message.author.id);
      }, 1000 * 60 * 60);
    }
});

 };
});




}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases:['unban','bankaldır','bankaldir'],
    permlevel: 0
};

exports.help = {
    name: "unban"
};