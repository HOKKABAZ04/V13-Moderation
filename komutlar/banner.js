const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const ayarlar = require('../ayarlar.json');
exports.run = async (client, message, args) => {

	  let botkomutları = message.guild.channels.cache.find(channel => channel.name === ayarlar.KANALLAR.botkomutları);
	let embed = new MessageEmbed().setFooter(ayarlar.BOT.footer).setColor("RANDOM");

 if(message.channel.id != botkomutları) return message.reply(`Bu komutu sadece **${botkomutları}** kanalında kullanabilirsiniz.`).then(msg => {
    setTimeout(() => msg.delete(), 6000)
  })
    const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

    let uid = user.id
	

    let response = fetch(`https://discord.com/api/v8/users/${uid}`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${client.token}`
        }
    })

    let receive = ''
	let banner;
    response.then(a => {
        if (a.status !== 404) {
            a.json().then(data => {
                receive = data['banner']

                if (receive !== null) {

                    let response2 = fetch(`https://cdn.discordapp.com/banners/${uid}/${receive}.gif`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bot ${client.token}`
                        }
                    })
                    let statut = ''
                    response2.then(b => {
                        statut = b.status
                        banner = `https://cdn.discordapp.com/banners/${uid}/${receive}.gif?size=1024`
                        if (statut === 415) {
                            banner = `https://cdn.discordapp.com/banners/${uid}/${receive}.png?size=1024`
                        }

                    })
                }
            })
        }
    })

    setTimeout(() => {
        if (!receive) return message.channel.send("Bu kullanıcının banneri bulunamadı!")

        message.channel.send(banner)

    }, 1000)

}



exports.conf = {
  aliases: ['banner'],
  permLevel: 0,
  kategori: "Moderasyon",
};

exports.help = {
  name: 'Banner',
  description: 'İstediğiniz kullanıcının Bannerını verir.',
  usage: 'banner <Kullanıcı Adı>',
};