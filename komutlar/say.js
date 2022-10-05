const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const ayarlar = require('../ayarlar.json');
exports.run = async (client, message, args, ayar, emoji) => {



let boosterRolu = message.guild.roles.cache.find(rol => rol.name === ayarlar.ROLLER.boosterRol);

const embed = new MessageEmbed().setColor("BLACK").setFooter(ayarlar.BOT.footer)
message.channel.send({ embeds: [embed.setDescription(`

➤ Sunucuda toplam **${message.guild.memberCount}** üye bulunmakta.
➤ Sunucuda toplam **${message.guild.members.cache.filter(m => (m.presence && m.presence.status !== "offline")).size}** üye çevrimiçi.
➤ Sunucuda toplam **${message.guild.channels.cache.filter(channel => channel.type == "GUILD_VOICE").map(channel => channel.members.filter(member => !member.user.bot).size).reduce((a, b) => a + b)}** kişi ses kanallarında.
➤ Sunucuda toplam **${message.guild.premiumSubscriptionCount}** boost bulunmakta.


`)]});
};

exports.conf = {
enabled: true,
guildOnly: true,
aliases:['say'],
permlevel: 0
};

exports.help = {
name: "say"
};