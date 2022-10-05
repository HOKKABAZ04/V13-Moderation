const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');
const { interaction, MessageActionRow, MessageSelectMenu } = require('discord.js');

 


exports.run = async (client, message, args) => {
	
let rolLog = message.guild.channels.cache.find(channel => channel.name === ayarlar.LOGS.rolLog);

if (!ayarlar.ROLLER.RolSistemiKontrol.some(perm => message.member.roles.cache.has(perm))) return message.react(ayarlar.EMOJİ.hata) && message.reply("Yetersiz yetki.").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
  
const member = message.mentions.members.first()
 if (!member) return message.react(ayarlar.EMOJİ.hata) && message.reply(`Üye bulunamadı, doğru kullanımı: ${ayarlar.BOT.prefix}rolal @Etiket`).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })

      if (member.user.id == message.author.id) return message.react(ayarlar.EMOJİ.hata) && message.reply("Kendine rol veremezsin veya alamazsın.").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
      if (message.member.roles.highest.position <= member.roles.highest.position) return message.react(ayarlar.EMOJİ.hata) && message.reply("Kişinin yetkisi senden yüksek veya eşit yetkiye sahipsiniz.").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })

  const registermenüsü = new MessageActionRow()
  .addComponents(
    new MessageSelectMenu()
      .setCustomId('rolal')
      .setPlaceholder('Rol alma menüsü')
      .addOptions([
        {
          label: 'Register Of Athen',
          description: 'Kişiden kayıt yapabilme rolünü alır.',
          value: 'kayıtpermiver',
        },

      ]),
  );
    
  const CoOwner = new MessageActionRow()
  .addComponents(
    new MessageSelectMenu()
      .setCustomId('rolal')
      .setPlaceholder('Rol alma menüsü')
      .addOptions([
        {
          label: 'Owner Of Athen',
          description: 'Kişiden Owner Of Athen rolünü alır.',
          value: 'CoOwnerofAthen',
        },
        {
          label: 'YETKİLİ ALIM VE DESTEK',
          description: 'Kişiden YETKİLİ ALIM VE DESTEK rolünü alır.',
          value: 'yavd',
        },
        {
          label: 'Doğum Günü Rolü',
          description: 'Kişiden DGKO rolünü alır.',
          value: 'dgko',
        },
        {
          label: 'Ban Hammer',
          description: 'Kişiden Ban Hammer rolünü alır.',
          value: 'BanHammer',
        },
        {
          label: 'Jail Hammer',
          description: 'Kişiden Jail Hammer rolünü alır.',
          value: 'JailHammer',
        },
        {
          label: 'Mute Hammer',
          description: 'Kişiden Mute Hammer  rolünü alır.',
          value: 'MuteHammer',
        },
        {
          label: 'Sponsor Of Athen',
          description: 'Kişiden Sponsor Of Athen rolünü alır.',
          value: 'SponsorOfAthen',
        },
        {
          label: 'Family Of Athen',
          description: 'Kişiden Family Of Athen rolünü alır.',
          value: 'FamilyOfAthen',
        },
        {
          label: 'Musician of Athen',
          description: 'Kişiden Musician of Athen rolünü alır.',
          value: 'MusicianofAthen',
        },
        {
          label: 'Crew of Athen',
          description: 'Kişiden Crew of Athen rolünü alır.',
          value: 'CrewofAthen',
        },
        {
          label: 'Falcı',
          description: 'Kişiden falcı rolünü alır.',
          value: 'falci',
        },
        {
          label: 'Streamer',
          description: 'Kişiden Streamer rolünü alır.',
          value: 'Streamer',
        },

      ]),
  );
  const AdminOfAthen = new MessageActionRow()
  .addComponents(
    new MessageSelectMenu()
      .setCustomId('rolal')
      .setPlaceholder('Rol alma menüsü')
      .addOptions([
        {
          label: 'AdminOfAthen',
          description: 'Kişiden Admin Of Athen rolünü alır.',
          value: 'AdminOfAthen',
        },
        {
          label: 'Ban Hammer',
          description: 'Kişiden Ban Hammer rolünü alır.',
          value: 'BanHammer',
        },
        {
          label: 'Jail Hammer',
          description: 'Kişiden Jail Hammer rolünü alır.',
          value: 'JailHammer',
        },
        {
          label: 'Mute Hammer',
          description: 'Kişiden Mute Hammer  rolünü alır.',
          value: 'MuteHammer',
        },
        {
          label: 'Sponsor Of Athen',
          description: 'Kişiden Sponsor Of Athen rolünü alır.',
          value: 'SponsorOfAthen',
        },
        {
          label: 'Family Of Athen',
          description: 'Kişiden Family Of Athen rolünü alır.',
          value: 'FamilyOfAthen',
        },
        {
          label: 'Musician of Athen',
          description: 'Kişiden Musician of Athen rolünü alır.',
          value: 'MusicianofAthen',
        },
        {
          label: 'Crew of Athen',
          description: 'Kişiden Crew of Athen rolünü alır.',
          value: 'CrewofAthen',
        },
        {
          label: 'Falcı',
          description: 'Kişiden falcı rolünü alır.',
          value: 'falci',
        },
        {
          label: 'Streamer',
          description: 'Kişiden Streamer rolünü alır.',
          value: 'Streamer',
        },

      ]),
  ); const ModOfAthen = new MessageActionRow()
  .addComponents(
    new MessageSelectMenu()
      .setCustomId('rolalma')
      .setPlaceholder('Rol alma menüsü')
      .addOptions([
        {
          label: 'Mod Of Athen',
          description: 'Kişiden Mod Of Athen rolünü alır',
          value: 'ModOfAthen',
        },
        {
          label: 'Ban Hammer',
          description: 'Kişiden Ban Hammer rolünü alır.',
          value: 'BanHammer',
        },
        {
          label: 'Jail Hammer',
          description: 'Kişiden Jail Hammer rolünü alır.',
          value: 'JailHammer',
        },
        {
          label: 'Mute Hammer',
          description: 'Kişiden Mute Hammer  rolünü alır.',
          value: 'MuteHammer',
        },
        {
          label: 'Sponsor Of Athen',
          description: 'Kişiden Sponsor Of Athen rolünü alır.',
          value: 'SponsorOfAthen',
        },
        {
          label: 'Family Of Athen',
          description: 'Kişiden Family Of Athen rolünü alır.',
          value: 'FamilyOfAthen',
        },
        {
          label: 'Musician of Athen',
          description: 'Kişiden Musician of Athen rolünü alır.',
          value: 'MusicianofAthen',
        },
        {
          label: 'Crew of Athen',
          description: 'Kişiden Crew of Athen rolünü alır.',
          value: 'CrewofAthen',
        },
        {
          label: 'Falcı',
          description: 'Kişiden falcı rolünü alır.',
          value: 'falci',
        },
        {
          label: 'Streamer',
          description: 'Kişiden Streamer rolünü alır.',
          value: 'Streamer',
        },

      ]),
  );const StaffLeader = new MessageActionRow()
  .addComponents(
    new MessageSelectMenu()
      .setCustomId('rolal')
      .setPlaceholder('Rol alma menüsü')
      .addOptions([
        {
          label: 'Staff Of Athen',
          description: 'Kişiden Staff Of Athen rolünü alır.',
          value: 'StaffOfAthen',
        },
        {
          label: 'Ban Hammer',
          description: 'Kişiden Ban Hammer rolünü alır.',
          value: 'BanHammer',
        },
        {
          label: 'Jail Hammer',
          description: 'Kişiden Jail Hammer rolünü alır.',
          value: 'JailHammer',
        },
        {
          label: 'Mute Hammer',
          description: 'Kişiden Mute Hammer  rolünü alır.',
          value: 'MuteHammer',
        },
        {
          label: 'Sponsor Of Athen',
          description: 'Kişiden Sponsor Of Athen rolünü alır.',
          value: 'SponsorOfAthen',
        },
        {
          label: 'Family Of Athen',
          description: 'Kişiden Family Of Athen rolünü alır.',
          value: 'FamilyOfAthen',
        },
        {
          label: 'Musician of Athen',
          description: 'Kişiden Musician of Athen rolünü alır.',
          value: 'MusicianofAthen',
        },
        {
          label: 'Crew of Athen',
          description: 'Kişiden Crew of Athen rolünü alır.',
          value: 'CrewofAthen',
        },
        {
          label: 'Falcı',
          description: 'Kişiden falcı rolünü alır.',
          value: 'falci',
        },
        {
          label: 'Streamer',
          description: 'Kişiden Streamer rolünü alır.',
          value: 'Streamer',
        },

      ]),
  );
  
client.on("interactionCreate", async(interaction) => {
if(interaction.isButton()) return;


let koruma1 = ["kayıtpermiver", "CoOwnerofAthen", "yavd", "dgko", "BanHammer","JailHammer","MuteHammer","SponsorOfAthen","FamilyOfAthen","MusicianofAthen","CrewofAthen","falci","Streamer","AdminOfAthen","ModOfAthen","StaffOfAthen"]
if (!koruma1.includes(interaction.values[0])) return;

if(interaction.values[0] === 'kayıtpermiver' || interaction.values[1] === 'kayıtpermiver'){
  if(message.member.id != interaction.member.id) return
  if(!member.roles.cache.has(ayarlar.ROLVERSISTEMI.kayitci)) return interaction.reply({content: `Kişide bu rol bulunmamakta.`, ephemeral: true})
setTimeout(async function(){  
member.roles.remove(ayarlar.ROLVERSISTEMI.kayitci)
  await interaction.reply({content: `Başarıyla kişiden <@&${ayarlar.ROLVERSISTEMI.kayitci}> rolü alındı.`, ephemeral: true})
  rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiden <@&${ayarlar.ROLVERSISTEMI.kayitci}> rolü aldı.` });
}, 450)
}

if(interaction.values[0] === 'CoOwnerofAthen' || interaction.values[1] === 'CoOwnerofAthen'){
  if(message.member.id != interaction.member.id) return
  if(!member.roles.cache.has(ayarlar.ROLVERSISTEMI.owner)) return interaction.reply({content: `Kişide bu rol bulunmamakta.`, ephemeral: true})
setTimeout(async function(){      
member.roles.remove(ayarlar.ROLVERSISTEMI.owner)
     await interaction.reply({content: `Başarıyla kişiden <@&${ayarlar.ROLVERSISTEMI.owner}> rolü alındı.`, ephemeral: true})
	rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiden <@&${ayarlar.ROLVERSISTEMI.owner}> rolünü aldı.` });      
}, 450)
}

if(interaction.values[0] === 'AdminOfAthen' || interaction.values[1] === 'AdminOfAthen'){
  if(message.member.id != interaction.member.id) return
  if(!member.roles.cache.has(ayarlar.ROLVERSISTEMI.Admin)) return interaction.reply({content: `Kişide bu rol bulunmamakta.`, ephemeral: true})
setTimeout(async function(){          
 member.roles.remove(ayarlar.ROLVERSISTEMI.Admin)
     await interaction.reply({content: `Başarıyla kişiden <@&${ayarlar.ROLVERSISTEMI.Admin}> rolü alındı.`, ephemeral: true})
rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiden <@&${ayarlar.ROLVERSISTEMI.Admin}> rolü aldı.` });      
}, 450)
}

if(interaction.values[0] === 'ModOfAthen' || interaction.values[1] === 'ModOfAthen'){
  if(message.member.id != interaction.member.id) return
  if(!member.roles.cache.has(ayarlar.ROLVERSISTEMI.Mod)) return interaction.reply({content: `Kişide bu rol bulunmamakta.`, ephemeral: true})
setTimeout(async function(){          
member.roles.remove(ayarlar.ROLVERSISTEMI.Mod)
     await interaction.reply({content: `Başarıyla kişiden <@&${ayarlar.ROLVERSISTEMI.Mod}> rolü alındı.`, ephemeral: true})
rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiden <@&${ayarlar.ROLVERSISTEMI.Mod}> rolü aldı.` });      
}, 450)
}

if(interaction.values[0] === 'StaffOfAthen' || interaction.values[1] === 'StaffOfAthen'){
  if(message.member.id != interaction.member.id) return
  if(!member.roles.cache.has(ayarlar.ROLVERSISTEMI.Staff)) return interaction.reply({content: `Kişide bu rol bulunmamakta.`, ephemeral: true})
 setTimeout(async function(){          
 member.roles.remove(ayarlar.ROLVERSISTEMI.Staff)
     await interaction.reply({content: `Başarıyla kişiden <@&${ayarlar.ROLVERSISTEMI.Staff}> rolü alındı.`, ephemeral: true})
rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiden <@&${ayarlar.ROLVERSISTEMI.Staff}> rolü aldı.` });      
}, 450)
}

if(interaction.values[0] === 'yavd' || interaction.values[1] === 'yavd'){
  if(message.member.id != interaction.member.id) return
  if(!member.roles.cache.has(ayarlar.ROLVERSISTEMI.ytalım)) return interaction.reply({content: `Kişide bu rol bulunmamakta.`, ephemeral: true})
setTimeout(async function(){         
member.roles.remove(ayarlar.ROLVERSISTEMI.ytalım)
     await interaction.reply({content: `Başarıyla kişiden <@&${ayarlar.ROLVERSISTEMI.ytalım}> rolü alındı.`, ephemeral: true})
rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiden <@&${ayarlar.ROLVERSISTEMI.ytalım}> rolü aldı.` });      
}, 450)
}

if(interaction.values[0] === 'dgko' || interaction.values[1] === 'dgko'){
  if(message.member.id != interaction.member.id) return
  if(!member.roles.cache.has(ayarlar.ROLVERSISTEMI.dgko)) return interaction.reply({content: `Kişide bu rol bulunmamakta.`, ephemeral: true})
setTimeout(async function(){          
member.roles.remove(ayarlar.ROLVERSISTEMI.dgko)
    await interaction.reply({content: `Başarıyla kişiden <@&${ayarlar.ROLVERSISTEMI.dgko}> rolü alındı.`, ephemeral: true})
rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiden <@&${ayarlar.ROLVERSISTEMI.dgko}> rolü aldı.` });    
}, 450)
}

if(interaction.values[0] === 'BanHammer' || interaction.values[1] === 'BanHammer'){
  if(message.member.id != interaction.member.id) return
  if(!member.roles.cache.has(ayarlar.ROLVERSISTEMI.Ban)) return interaction.reply({content: `Kişide bu rol bulunmamakta.`, ephemeral: true})
setTimeout(async function(){          
member.roles.remove(ayarlar.ROLVERSISTEMI.Ban)
    await interaction.reply({content: `Başarıyla kişiden <@&${ayarlar.ROLVERSISTEMI.Ban}> rolü alındı.`, ephemeral: true})
rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiden <@&${ayarlar.ROLVERSISTEMI.Ban}> rolü aldı.` });    
}, 450)
}

if(interaction.values[0] === 'JailHammer' || interaction.values[1] === 'JailHammer'){
  if(message.member.id != interaction.member.id) return
  if(!member.roles.cache.has(ayarlar.ROLVERSISTEMI.Jail)) return interaction.reply({content: `Kişide bu rol bulunmamakta.`, ephemeral: true})
setTimeout(async function(){         
member.roles.remove(ayarlar.ROLVERSISTEMI.Jail)
    await interaction.reply({content: `Başarıyla kişiden <@&${ayarlar.ROLVERSISTEMI.Jail}> rolü alındı.`, ephemeral: true})
rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiden <@&${ayarlar.ROLVERSISTEMI.Jail}> rolü aldı.` });    
}, 450)
}

if(interaction.values[0] === 'MuteHammer' || interaction.values[1] === 'MuteHammer'){
  if(message.member.id != interaction.member.id) return
  if(!member.roles.cache.has(ayarlar.ROLVERSISTEMI.Mute)) return interaction.reply({content: `Kişide bu rol bulunmamakta.`, ephemeral: true})
setTimeout(async function(){        
member.roles.remove(ayarlar.ROLVERSISTEMI.Mute)
    await interaction.reply({content: `Başarıyla kişiden <@&${ayarlar.ROLVERSISTEMI.Mute}> rolü alındı.`, ephemeral: true})
rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiden <@&${ayarlar.ROLVERSISTEMI.Mute}> rolü aldı.` });    
}, 450)
}

if(interaction.values[0] === 'SponsorOfAthen' || interaction.values[1] === 'SponsorOfAthen'){
  if(message.member.id != interaction.member.id) return
  if(!member.roles.cache.has(ayarlar.ROLVERSISTEMI.Sponsor)) return interaction.reply({content: `Kişide bu rol bulunmamakta.`, ephemeral: true})
setTimeout(async function(){        
member.roles.remove(ayarlar.ROLVERSISTEMI.Sponsor)
    await interaction.reply({content: `Başarıyla kişiden <@&${ayarlar.ROLVERSISTEMI.Sponsor}> rolü alındı.`, ephemeral: true})
rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiden <@&${ayarlar.ROLVERSISTEMI.Sponsor}> rolü aldı.` });    
}, 450)
}

if(interaction.values[0] === 'FamilyOfAthen' || interaction.values[1] === 'FamilyOfAthen'){
  if(message.member.id != interaction.member.id) return
  if(!member.roles.cache.has(ayarlar.ROLVERSISTEMI.Family)) return interaction.reply({content: `Kişide bu rol bulunmamakta.`, ephemeral: true})
setTimeout(async function(){        
member.roles.remove(ayarlar.ROLVERSISTEMI.Family)
    await interaction.reply({content: `Başarıyla kişiden <@&${ayarlar.ROLVERSISTEMI.Family}> rolü alındı.`, ephemeral: true})
rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiden <@&${ayarlar.ROLVERSISTEMI.Family}> rolü aldı.` });    
}, 450)
}

if(interaction.values[0] === 'MusicianofAthen' || interaction.values[1] === 'MusicianofAthen'){
  if(message.member.id != interaction.member.id) return
  if(!member.roles.cache.has(ayarlar.ROLVERSISTEMI.Musician)) return interaction.reply({content: `Kişide bu rol bulunmamakta.`, ephemeral: true})
setTimeout(async function(){        
member.roles.remove(ayarlar.ROLVERSISTEMI.Musician)
    await interaction.reply({content: `Başarıyla kişiye <@&${ayarlar.ROLVERSISTEMI.Musician}> rolü verildi.`, ephemeral: true})
rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiden <@&${ayarlar.ROLVERSISTEMI.Musician}> rolü aldı.` });    
}, 450)
}

if(interaction.values[0] === 'CrewofAthen' || interaction.values[1] === 'CrewofAthen'){
  if(message.member.id != interaction.member.id) return
  if(!member.roles.cache.has(ayarlar.ROLVERSISTEMI.Crew)) return interaction.reply({content: `Kişide bu rol bulunmamakta.`, ephemeral: true})
setTimeout(async function(){          
member.roles.remove(ayarlar.ROLVERSISTEMI.Crew)
    await interaction.reply({content: `Başarıyla kişiden <@&${ayarlar.ROLVERSISTEMI.Crew}> rolü alındı.`, ephemeral: true})
rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiden <@&${ayarlar.ROLVERSISTEMI.Crew}> rolü aldı.` });    
}, 450)
}

if(interaction.values[0] === 'falci' || interaction.values[1] === 'falci'){
  if(message.member.id != interaction.member.id) return
  if(!member.roles.cache.has(ayarlar.ROLVERSISTEMI.Falcı)) return interaction.reply({content: `Kişide bu rol bulunmamakta.`, ephemeral: true})
  setTimeout(async function(){      
member.roles.remove(ayarlar.ROLVERSISTEMI.Falcı)
    await interaction.reply({content: `Başarıyla kişiden <@&${ayarlar.ROLVERSISTEMI.Falcı}> rolü alındı.`, ephemeral: true})
rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiden <@&${ayarlar.ROLVERSISTEMI.Falcı}> rolü aldı.` });    
}, 450)
}

if(interaction.values[0] === 'Streamer' || interaction.values[1] === 'Streamer'){
  if(message.member.id != interaction.member.id) return
  if(!member.roles.cache.has(ayarlar.ROLVERSISTEMI.Streamer)) return interaction.reply({content: `Kişide bu rol bulunmamakta.`, ephemeral: true})
setTimeout(async function(){         
member.roles.remove(ayarlar.ROLVERSISTEMI.Streamer)
    await interaction.reply({content: `Başarıyla kişiden <@&${ayarlar.ROLVERSISTEMI.Streamer}> rolü alındı.`, ephemeral: true})
rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiden <@&${ayarlar.ROLVERSISTEMI.Streamer}> rolü aldı.` });    
}, 450)
}
});



  if(message.member.roles.cache.has("1019786677717319792")) { message.channel.send({ content: `
Aşağıda bulunan menüden belirtmiş olduğunuz kişi'den rol alabilirsiniz.
Not: Unutmayın bu mesaj kendini **15 saniye** sonra imha edecek.`, components: [registermenüsü]  }).then(msg => {
	message.delete()
    setTimeout(() => msg.delete(), 15000)
  })
  .catch()
  return;
  } else if(message.member.roles.cache.has("1020704631795499018")) { message.channel.send({ content: `
Aşağıda bulunan menüden belirtmiş olduğunuz kişi'den rol alabilirsiniz.
Not: Unutmayın bu mesaj kendini **15 saniye** sonra imha edecek.`, components: [StaffLeader]  }).then(msg => {
    message.delete()
      setTimeout(() => msg.delete(), 15000)
    })
    .catch()
    return;
    } else if(message.member.roles.cache.has("1020703784319586496")) { message.channel.send({ content: `
Aşağıda bulunan menüden belirtmiş olduğunuz kişi'den rol alabilirsiniz.
Not: Unutmayın bu mesaj kendini **15 saniye** sonra imha edecek.`, components: [ModOfAthen]  }).then(msg => {
      message.delete()
        setTimeout(() => msg.delete(), 15000)
      })
      .catch()
      return;
     } else if(message.member.roles.cache.has("1019372002898890809")) { message.channel.send({ content: `
Aşağıda bulunan menüden belirtmiş olduğunuz kişi'den rol alabilirsiniz.
Not: Unutmayın bu mesaj kendini **15 saniye** sonra imha edecek.`, components: [AdminOfAthen]  }).then(msg => {
        message.delete()
          setTimeout(() => msg.delete(), 15000)
        })
        .catch()
        return;
} else if(message.member.roles.cache.has("1019372002898890807")) { message.channel.send({ content: `
Aşağıda bulunan menüden belirtmiş olduğunuz kişi'den rol alabilirsiniz.
Not: Unutmayın bu mesaj kendini **15 saniye** sonra imha edecek.`, components: [CoOwner]  }).then(msg => {
          message.delete()
            setTimeout(() => msg.delete(), 15000)
          })
          .catch()
          return;
          }

  





  

};


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases:['rola'],
    permlevel: 0
};

exports.help = {
    name: "rolal"
};