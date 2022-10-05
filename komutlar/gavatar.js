const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
exports.run = async (client, message, args)=> {
  let botkomutları = message.guild.channels.cache.find(channel => channel.name === ayarlar.KANALLAR.botkomutları);

if(message.member.id != "716327849979805736") return message.channel.send("Sen runheaven misin knk, test komutu bi elleşme tşk")
let muser = message.mentions.users.first();


message.channel.send(`${muser.avatarURL()}`)



}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases:['testrh'],
    permlevel: 0
};

exports.help = {
    name: "testrh"
};