const Discord = require("discord.js");

exports.run = async (client, message, args) => {


if (!message.member.permissions.has('ADMINISTRATOR')) return;

message.channel.send(`Sesli kanallarda toplam **${message.guild.channels.cache.filter(channel => channel.type == "GUILD_VOICE").map(channel => channel.members.filter(member => !member.user.bot).size).reduce((a, b) => a + b)}** üye bulunmaktadır.`)
   
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases:['sesli','ses'],
    permlevel: 0
};

exports.help = {
    name: "sesli"
};