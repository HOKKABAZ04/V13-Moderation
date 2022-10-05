const Discord = require("discord.js");
const data = require('quick.db');
exports.run = async (client, message, args) => {




if (!args[0]) return;


if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`Yetkin yetersiz.`).then(msg => {
    setTimeout(() => msg.delete(), 10000)

  })

  
message.channel.send(`Bakalım o şanslı kişi kim..`).then(ss => {
                setTimeout(() => {
                        ss.edit(`10`);
        }, 1000);
        setTimeout(() => {
                        ss.edit(`9`);
        }, 2000);
                setTimeout(() => {
                        ss.edit(`8`);
        }, 3000);
                setTimeout(() => {
                        ss.edit(`7`);
        }, 5000);
                setTimeout(() => {
                        ss.edit(`6`);
        }, 6000);
                setTimeout(() => {
                        ss.edit(`5`);
        }, 7000);
                setTimeout(() => {
                        ss.edit(`4`);
        }, 8000);
                setTimeout(() => {
                        ss.edit(`3`);
        }, 9000);
                setTimeout(() => {
                        ss.edit(`2`);
        }, 10000);
                setTimeout(() => {
                        ss.edit(`1`);
        }, 11000);
                setTimeout(() => {
let bıhtımyaa = Array.from(message.guild.channels.cache.get(args[0]).members);
let beko = bıhtımyaa[Math.floor(Math.random() * bıhtımyaa.length)];
                ss.edit(`Kazanan ${beko}`);
                //ss.edit(`Kazanan id,<@id>`);
        }, 12000);
});
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases:['sesçekilişi','sesçek','sesteçek','sesliçekiliş'],
    permlevel: 0
};

exports.help = {
    name: "sesçekilişi"
};