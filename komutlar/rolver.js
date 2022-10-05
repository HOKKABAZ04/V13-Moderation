const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');
const { interaction, MessageActionRow, MessageSelectMenu } = require('discord.js');

 


exports.run = async (client, message, args) => {

	
let rolLog = message.guild.channels.cache.find(channel => channel.name === ayarlar.LOGS.rolLog);

if (!ayarlar.ROLLER.RolSistemiKontrol.some(perm => message.member.roles.cache.has(perm))) return message.react(ayarlar.EMOJİ.hata) && message.reply("Yetersiz yetki.").then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
  
const member = message.mentions.members.first()
 if (!member) return message.react(ayarlar.EMOJİ.hata) && message.reply(`Üye bulunamadı, doğru kullanımı: ${ayarlar.BOT.prefix}rolver @Etiket`).then(msg => {
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
      .setCustomId('rolver')
      .setPlaceholder('Rol verme menüsü')
      .addOptions([
        {
          label: 'Register Of Athen',
          description: 'Kişiye kayıt yapabilmesi için rol verir.',
          value: 'kayıtpermiver',
        },

      ]),
  );
    
  const CoOwner = new MessageActionRow()
  .addComponents(
    new MessageSelectMenu()
      .setCustomId('rolver')
      .setPlaceholder('Rol verme menüsü')
      .addOptions([
        {
          label: 'Owner Of Athen',
          description: 'Kişiye Owner Of Athen rolü verir.',
          value: 'CoOwnerofAthen',
        },
        {
          label: 'YETKİLİ ALIM VE DESTEK',
          description: 'Kişiye YETKİLİ ALIM VE DESTEK rolü verir.',
          value: 'yavd',
        },
        {
          label: 'Doğum Günü Rolü',
          description: 'Kişiye DGKO rolü verir.',
          value: 'dgko',
        },
        {
          label: 'Ban Hammer',
          description: 'Kişiye Ban Hammer rolü verir.',
          value: 'BanHammer',
        },
        {
          label: 'Jail Hammer',
          description: 'Kişiye Jail Hammer rolü verir.',
          value: 'JailHammer',
        },
        {
          label: 'Mute Hammer',
          description: 'Kişiye Mute Hammer  rolü verir.',
          value: 'MuteHammer',
        },
        {
          label: 'Sponsor Of Athen',
          description: 'Kişiye Sponsor Of Athen rolü verir.',
          value: 'SponsorOfAthen',
        },
        {
          label: 'Family Of Athen',
          description: 'Kişiye Family Of Athen rolü verir.',
          value: 'FamilyOfAthen',
        },
        {
          label: 'Musician of Athen',
          description: 'Kişiye Musician of Athen rolü verir.',
          value: 'MusicianofAthen',
        },
        {
          label: 'Crew of Athen',
          description: 'Kişiye Crew of Athen rolü verir.',
          value: 'CrewofAthen',
        },
        {
          label: 'Falcı',
          description: 'Kişiye Falcı rolü verir.',
          value: 'falci',
        },
        {
          label: 'Streamer',
          description: 'Kişiye Streamer rolü verir.',
          value: 'Streamer',
        },

      ]),
  );
  const AdminOfAthen = new MessageActionRow()
  .addComponents(
    new MessageSelectMenu()
      .setCustomId('rolver')
      .setPlaceholder('Rol verme menüsü')
      .addOptions([
        {
          label: 'AdminOfAthen',
          description: 'Kişiye Admin Of Athen rolü verir.',
          value: 'AdminOfAthen',
        },
        {
          label: 'Ban Hammer',
          description: 'Kişiye Ban Hammer rolü verir.',
          value: 'BanHammer',
        },
        {
          label: 'Jail Hammer',
          description: 'Kişiye Jail Hammer rolü verir.',
          value: 'JailHammer',
        },
        {
          label: 'Mute Hammer',
          description: 'Kişiye Mute Hammer  rolü verir.',
          value: 'MuteHammer',
        },
        {
          label: 'Sponsor Of Athen',
          description: 'Kişiye Sponsor Of Athen rolü verir.',
          value: 'SponsorOfAthen',
        },
        {
          label: 'Family Of Athen',
          description: 'Kişiye Family Of Athen rolü verir.',
          value: 'FamilyOfAthen',
        },
        {
          label: 'Musician of Athen',
          description: 'Kişiye Musician of Athen rolü verir.',
          value: 'MusicianofAthen',
        },
        {
          label: 'Crew of Athen',
          description: 'Kişiye Crew of Athen rolü verir.',
          value: 'CrewofAthen',
        },
        {
          label: 'Falcı',
          description: 'Kişiye Falcı rolü verir.',
          value: 'falci',
        },
        {
          label: 'Streamer',
          description: 'Kişiye Streamer rolü verir.',
          value: 'Streamer',
        },

      ]),
  ); const ModOfAthen = new MessageActionRow()
  .addComponents(
    new MessageSelectMenu()
      .setCustomId('rolver')
      .setPlaceholder('Rol verme menüsü')
      .addOptions([
        {
          label: 'Mod Of Athen',
          description: 'Kişiye Mod Of Athen rolü verir.',
          value: 'ModOfAthen',
        },
        {
          label: 'Ban Hammer',
          description: 'Kişiye Ban Hammer rolü verir.',
          value: 'BanHammer',
        },
        {
          label: 'Jail Hammer',
          description: 'Kişiye Jail Hammer rolü verir.',
          value: 'JailHammer',
        },
        {
          label: 'Mute Hammer',
          description: 'Kişiye Mute Hammer  rolü verir.',
          value: 'MuteHammer',
        },
        {
          label: 'Sponsor Of Athen',
          description: 'Kişiye Sponsor Of Athen rolü verir.',
          value: 'SponsorOfAthen',
        },
        {
          label: 'Family Of Athen',
          description: 'Kişiye Family Of Athen rolü verir.',
          value: 'FamilyOfAthen',
        },
        {
          label: 'Musician of Athen',
          description: 'Kişiye Musician of Athen rolü verir.',
          value: 'MusicianofAthen',
        },
        {
          label: 'Crew of Athen',
          description: 'Kişiye Crew of Athen rolü verir.',
          value: 'CrewofAthen',
        },
        {
          label: 'Falcı',
          description: 'Kişiye Falcı rolü verir.',
          value: 'falci',
        },
        {
          label: 'Streamer',
          description: 'Kişiye Streamer rolü verir.',
          value: 'Streamer',
        },

      ]),
  );const StaffLeader = new MessageActionRow()
  .addComponents(
    new MessageSelectMenu()
      .setCustomId('rolver')
      .setPlaceholder('Rol verme menüsü')
      .addOptions([
        {
          label: 'Staff Of Athen',
          description: 'Kişiye Staff Of Athen rolü verir.',
          value: 'StaffOfAthen',
        },
        {
          label: 'Ban Hammer',
          description: 'Kişiye Ban Hammer rolü verir.',
          value: 'BanHammer',
        },
        {
          label: 'Jail Hammer',
          description: 'Kişiye Jail Hammer rolü verir.',
          value: 'JailHammer',
        },
        {
          label: 'Mute Hammer',
          description: 'Kişiye Mute Hammer  rolü verir.',
          value: 'MuteHammer',
        },
        {
          label: 'Sponsor Of Athen',
          description: 'Kişiye Sponsor Of Athen rolü verir.',
          value: 'SponsorOfAthen',
        },
        {
          label: 'Family Of Athen',
          description: 'Kişiye Family Of Athen rolü verir.',
          value: 'FamilyOfAthen',
        },
        {
          label: 'Musician of Athen',
          description: 'Kişiye Musician of Athen rolü verir.',
          value: 'MusicianofAthen',
        },
        {
          label: 'Crew of Athen',
          description: 'Kişiye Crew of Athen rolü verir.',
          value: 'CrewofAthen',
        },
        {
          label: 'Falcı',
          description: 'Kişiye Falcı rolü verir.',
          value: 'falci',
        },
        {
          label: 'Streamer',
          description: 'Kişiye Streamer rolü verir.',
          value: 'Streamer',
        },

      ]),
  );
  
client.on("interactionCreate", async(interaction) => {
if(interaction.isButton()) return;


let koruma1 = ["kayıtpermiver", "CoOwnerofAthen", "yavd", "dgko", "BanHammer","JailHammer","MuteHammer","SponsorOfAthen","FamilyOfAthen","MusicianofAthen","CrewofAthen","falci","Streamer","AdminOfAthen","ModOfAthen","StaffOfAthen"]
if (!koruma1.includes(interaction.values[0])) return;

if(interaction.values[0] === 'kayıtpermiver' || interaction.values[1] === 'kayıtpermiver'){
  if(message.member.id != interaction.member.id) return;
  if(member.roles.cache.has(ayarlar.ROLVERSISTEMI.kayitci)) return interaction.reply({content: `Kişide zaten bu rol bulunmnakta.`, ephemeral: true})
  member.roles.add(ayarlar.ROLVERSISTEMI.kayitci)
  await interaction.reply({content: `Başarıyla kişiye <@&${ayarlar.ROLVERSISTEMI.kayitci}> rolü verildi.`, ephemeral: true})
rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiye <@&${ayarlar.ROLVERSISTEMI.kayitci}> rolü verdi.` });
}

if(interaction.values[0] === 'CoOwnerofAthen' || interaction.values[1] === 'CoOwnerofAthen'){
  if(message.member.id != interaction.member.id) return
  if(member.roles.cache.has(ayarlar.ROLVERSISTEMI.owner)) return interaction.reply({content: `Kişide zaten bu rol bulunmnakta.`, ephemeral: true})
     member.roles.add(ayarlar.ROLVERSISTEMI.owner)
     await interaction.reply({content: `Başarıyla kişiye <@&${ayarlar.ROLVERSISTEMI.owner}> rolü verildi.`, ephemeral: true})
rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiye <@&${ayarlar.ROLVERSISTEMI.owner}> rolü verdi.` });      
}

if(interaction.values[0] === 'AdminOfAthen' || interaction.values[1] === 'AdminOfAthen'){
  if(message.member.id != interaction.member.id) return
  if(member.roles.cache.has(ayarlar.ROLVERSISTEMI.Admin)) return interaction.reply({content: `Kişide zaten bu rol bulunmnakta.`, ephemeral: true})
     member.roles.add(ayarlar.ROLVERSISTEMI.Admin)
     await interaction.reply({content: `Başarıyla kişiye <@&${ayarlar.ROLVERSISTEMI.Admin}> rolü verildi.`, ephemeral: true})
rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiye <@&${ayarlar.ROLVERSISTEMI.Admin}> rolü verdi.` });      
}

if(interaction.values[0] === 'ModOfAthen' || interaction.values[1] === 'ModOfAthen'){
  if(message.member.id != interaction.member.id) return
  if(member.roles.cache.has(ayarlar.ROLVERSISTEMI.Mod)) return interaction.reply({content: `Kişide zaten bu rol bulunmnakta.`, ephemeral: true})
     member.roles.add(ayarlar.ROLVERSISTEMI.Mod)
     await interaction.reply({content: `Başarıyla kişiye <@&${ayarlar.ROLVERSISTEMI.Mod}> rolü verildi.`, ephemeral: true})
rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiye <@&${ayarlar.ROLVERSISTEMI.Mod}> rolü verdi.` });      
}

if(interaction.values[0] === 'StaffOfAthen' || interaction.values[1] === 'StaffOfAthen'){
  if(message.member.id != interaction.member.id) return
  if(member.roles.cache.has(ayarlar.ROLVERSISTEMI.Staff)) return interaction.reply({content: `Kişide zaten bu rol bulunmnakta.`, ephemeral: true})
     member.roles.add(ayarlar.ROLVERSISTEMI.Staff)
     await interaction.reply({content: `Başarıyla kişiye <@&${ayarlar.ROLVERSISTEMI.Staff}> rolü verildi.`, ephemeral: true})
rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiye <@&${ayarlar.ROLVERSISTEMI.Staff}> rolü verdi.` });      
}

if(interaction.values[0] === 'yavd' || interaction.values[1] === 'yavd'){
  if(message.member.id != interaction.member.id) return
  if(member.roles.cache.has(ayarlar.ROLVERSISTEMI.ytalım)) return interaction.reply({content: `Kişide zaten bu rol bulunmnakta.`, ephemeral: true})
     member.roles.add(ayarlar.ROLVERSISTEMI.ytalım)
     await interaction.reply({content: `Başarıyla kişiye <@&${ayarlar.ROLVERSISTEMI.ytalım}> rolü verildi.`, ephemeral: true})
rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiye <@&${ayarlar.ROLVERSISTEMI.ytalım}> rolü verdi.` });      
}

if(interaction.values[0] === 'dgko' || interaction.values[1] === 'dgko'){
  if(message.member.id != interaction.member.id) return
  if(member.roles.cache.has(ayarlar.ROLVERSISTEMI.dgko)) return interaction.reply({content: `Kişide zaten bu rol bulunmnakta.`, ephemeral: true})
    member.roles.add(ayarlar.ROLVERSISTEMI.dgko)
    await interaction.reply({content: `Başarıyla kişiye <@&${ayarlar.ROLVERSISTEMI.dgko}> rolü verildi.`, ephemeral: true})
rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiye <@&${ayarlar.ROLVERSISTEMI.dgko}> rolü verdi.` });    
}

if(interaction.values[0] === 'BanHammer' || interaction.values[1] === 'BanHammer'){
  if(message.member.id != interaction.member.id) return
  if(member.roles.cache.has(ayarlar.ROLVERSISTEMI.Ban)) return interaction.reply({content: `Kişide zaten bu rol bulunmnakta.`, ephemeral: true})
    member.roles.add(ayarlar.ROLVERSISTEMI.Ban)
    await interaction.reply({content: `Başarıyla kişiye <@&${ayarlar.ROLVERSISTEMI.Ban}> rolü verildi.`, ephemeral: true})
rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiye <@&${ayarlar.ROLVERSISTEMI.Ban}> rolü verdi.` });    
}

if(interaction.values[0] === 'JailHammer' || interaction.values[1] === 'JailHammer'){
  if(message.member.id != interaction.member.id) return
  if(member.roles.cache.has(ayarlar.ROLVERSISTEMI.Jail)) return interaction.reply({content: `Kişide zaten bu rol bulunmnakta.`, ephemeral: true})
    member.roles.add(ayarlar.ROLVERSISTEMI.Jail)
    await interaction.reply({content: `Başarıyla kişiye <@&${ayarlar.ROLVERSISTEMI.Jail}> rolü verildi.`, ephemeral: true})
rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiye <@&${ayarlar.ROLVERSISTEMI.Jail}> rolü verdi.` });    
}

if(interaction.values[0] === 'MuteHammer' || interaction.values[1] === 'MuteHammer'){
  if(message.member.id != interaction.member.id) return
  if(member.roles.cache.has(ayarlar.ROLVERSISTEMI.Mute)) return interaction.reply({content: `Kişide zaten bu rol bulunmnakta.`, ephemeral: true})
    member.roles.add(ayarlar.ROLVERSISTEMI.Mute)
    await interaction.reply({content: `Başarıyla kişiye <@&${ayarlar.ROLVERSISTEMI.Mute}> rolü verildi.`, ephemeral: true})
rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiye <@&${ayarlar.ROLVERSISTEMI.Mute}> rolü verdi.` });    
}

if(interaction.values[0] === 'SponsorOfAthen' || interaction.values[1] === 'SponsorOfAthen'){
  if(message.member.id != interaction.member.id) return
  if(member.roles.cache.has(ayarlar.ROLVERSISTEMI.Sponsor)) return interaction.reply({content: `Kişide zaten bu rol bulunmnakta.`, ephemeral: true})
    member.roles.add(ayarlar.ROLVERSISTEMI.Sponsor)
    await interaction.reply({content: `Başarıyla kişiye <@&${ayarlar.ROLVERSISTEMI.Sponsor}> rolü verildi.`, ephemeral: true})
rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiye <@&${ayarlar.ROLVERSISTEMI.Sponsor}> rolü verdi.` });    
}

if(interaction.values[0] === 'FamilyOfAthen' || interaction.values[1] === 'FamilyOfAthen'){
  if(message.member.id != interaction.member.id) return
  if(member.roles.cache.has(ayarlar.ROLVERSISTEMI.Family)) return interaction.reply({content: `Kişide zaten bu rol bulunmnakta.`, ephemeral: true})
    member.roles.add(ayarlar.ROLVERSISTEMI.Family)
    await interaction.reply({content: `Başarıyla kişiye <@&${ayarlar.ROLVERSISTEMI.Family}> rolü verildi.`, ephemeral: true})
rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiye <@&${ayarlar.ROLVERSISTEMI.Family}> rolü verdi.` });    
}

if(interaction.values[0] === 'MusicianofAthen' || interaction.values[1] === 'MusicianofAthen'){
  if(message.member.id != interaction.member.id) return
  if(member.roles.cache.has(ayarlar.ROLVERSISTEMI.Musician)) return interaction.reply({content: `Kişide zaten bu rol bulunmnakta.`, ephemeral: true})
    member.roles.add(ayarlar.ROLVERSISTEMI.Musician)
    await interaction.reply({content: `Başarıyla kişiye <@&${ayarlar.ROLVERSISTEMI.Musician}> rolü verildi.`, ephemeral: true})
rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiye <@&${ayarlar.ROLVERSISTEMI.Musician}> rolü verdi.` });    
}

if(interaction.values[0] === 'CrewofAthen' || interaction.values[1] === 'CrewofAthen'){
  if(message.member.id != interaction.member.id) return
  if(member.roles.cache.has(ayarlar.ROLVERSISTEMI.Crew)) return interaction.reply({content: `Kişide zaten bu rol bulunmnakta.`, ephemeral: true})
    member.roles.add(ayarlar.ROLVERSISTEMI.Crew)
    await interaction.reply({content: `Başarıyla kişiye <@&${ayarlar.ROLVERSISTEMI.Crew}> rolü verildi.`, ephemeral: true})
rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiye <@&${ayarlar.ROLVERSISTEMI.Crew}> rolü verdi.` });    
}

if(interaction.values[0] === 'falci' || interaction.values[1] === 'falci'){
  if(message.member.id != interaction.member.id) return
  if(member.roles.cache.has(ayarlar.ROLVERSISTEMI.Falcı)) return interaction.reply({content: `Kişide zaten bu rol bulunmnakta.`, ephemeral: true})
    member.roles.add(ayarlar.ROLVERSISTEMI.Falcı)
    await interaction.reply({content: `Başarıyla kişiye <@&${ayarlar.ROLVERSISTEMI.Falcı}> rolü verildi.`, ephemeral: true})
rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiye <@&${ayarlar.ROLVERSISTEMI.Falcı}> rolü verdi.` });    
}

if(interaction.values[0] === 'Streamer' || interaction.values[1] === 'Streamer'){
  if(message.member.id != interaction.member.id) return
  if(member.roles.cache.has(ayarlar.ROLVERSISTEMI.Streamer)) return interaction.reply({content: `Kişide zaten bu rol bulunmnakta.`, ephemeral: true})
    member.roles.add(ayarlar.ROLVERSISTEMI.Streamer)
    await interaction.reply({content: `Başarıyla kişiye <@&${ayarlar.ROLVERSISTEMI.Streamer}> rolü verildi.`, ephemeral: true})
rolLog.send({content: `${message.member} adlı yetkili ${member} adlı kişiye <@&${ayarlar.ROLVERSISTEMI.Streamer}> rolü verdi.` });    
}
});



  if(message.member.roles.cache.has("1019786677717319792")) { message.channel.send({ content: `
Aşağıda bulunan menüden belirtmiş olduğunuz kişiye rol verebilirsiniz.
Not: Unutmayın bu mesaj kendini **15 saniye** sonra imha edecek.`, components: [registermenüsü]  }).then(msg => {
	message.delete()
    setTimeout(() => msg.delete(), 15000)
  })
  .catch()
  return;
  } else if(message.member.roles.cache.has("1020704631795499018")) { message.channel.send({ content: `
Aşağıda bulunan menüden belirtmiş olduğunuz kişiye rol verebilirsiniz.
Not: Unutmayın bu mesaj kendini **15 saniye** sonra imha edecek.`, components: [StaffLeader]  }).then(msg => {
    message.delete()
      setTimeout(() => msg.delete(), 15000)
    })
    .catch()
    return;
    } else if(message.member.roles.cache.has("1020703784319586496")) { message.channel.send({ content: `
Aşağıda bulunan menüden belirtmiş olduğunuz kişiye rol verebilirsiniz.
Not: Unutmayın bu mesaj kendini **15 saniye** sonra imha edecek.`, components: [ModOfAthen]  }).then(msg => {
      message.delete()
        setTimeout(() => msg.delete(), 15000)
      })
      .catch()
      return;
     } else if(message.member.roles.cache.has("1019372002898890809")) { message.channel.send({ content: `
Aşağıda bulunan menüden belirtmiş olduğunuz kişiye rol verebilirsiniz.
Not: Unutmayın bu mesaj kendini **15 saniye** sonra imha edecek.`, components: [AdminOfAthen]  }).then(msg => {
        message.delete()
          setTimeout(() => msg.delete(), 15000)
        })
        .catch()
        return;
} else if(message.member.roles.cache.has("1019372002898890807")) { message.channel.send({ content: `
Aşağıda bulunan menüden belirtmiş olduğunuz kişiye rol verebilirsiniz.
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
    aliases:['rol'],
    permlevel: 0
};

exports.help = {
    name: "rolver"
};