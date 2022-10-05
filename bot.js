const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const Discord = require('discord.js');
const { Client, Intents,Collection, interaction, MessageActionRow, MessageSelectMenu } = require('discord.js');

const client = (global.client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING 	]
}));

const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');

const Utils = global.Utils = require('./util/Util.js')
const fs = require('fs');
const queue = new Map();
const ms = require('ms');
const data = require('quick.db');
const db = require('quick.db');
require('./util/eventLoader.js')(client);
const { joinVoiceChannel } = require("@discordjs/voice");

mongoose.connect(ayarlar.SERVER.mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true })


mongoose.connection.on("connected", () => {
  console.log("Database bağlantısı tamamlandı!");
});
mongoose.connection.on("error", () => {
  console.error("[HATA] Database bağlantısı kurulamadı!");
});

var prefix = ayarlar.BOT.prefix;


const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

fs.readdir("./Events", (err, files) => {
  if(err) return console.error(err);
  files.filter(file => file.endsWith(".js")).forEach(file => {
      let prop = require(`./Events/${file}`);
      if(!prop.configuration) return;
      client.on(prop.configuration.name, prop);
  });
});


client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.permissions.has("BAN_MEMBERS")) permlvl = 2;
    if (message.member.permissions.has("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});
  


client.on("ready", async () => {
	


const VoiceChannel = client.channels.cache.get(ayarlar.BOT.botVoiceChannelID);
joinVoiceChannel({
	channelId: VoiceChannel.id,
	guildId: VoiceChannel.guild.id,
	adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
	selfDeaf: true
});


client.user.setActivity(ayarlar.BOT.durum, { type: "WATCHING"});
client.user.setStatus("idle");
console.log('PASS - '+ client.user.tag +' ismiyle API\'ye bağlanıldı ve bot hazır durumda.')
 

});    
// BOOSTED BASTI
client.on('guildMemberUpdate', async (oldMember, newMember) => {
  const hadRole = oldMember.roles.cache.find(role => role.id === '1019732038468775957');
  const hasRole = newMember.roles.cache.find(role => role.id === '1019732038468775957');
	
  if (!hadRole && hasRole) {
newMember.guild.channels.cache.get("1019372004111036619").send(`${newMember}`)
    newMember.guild.channels.cache.get("1019372004111036619").send(`
🎉  sunucuya takviye yaptiğin için teşekkür ederiz! ❤️ Artik '.zengin' komutu ile #bot-komut kanalinda sunucu ismini değiştirebilirsin. <a:heart:1020054303689424957>
	
	`);
  }

});

   let iltifatSayi = 0;
    let iltifatlar = [
      "Mucizelerden bahsediyordum. Tam o sırada gözlerin geldi aklıma.",
      "Benim için mutluluğun tanımı, seninle birlikteyken geçirdiğim vakittir.",
      "Mavi gözlerin, gökyüzü oldu dünyamın.",
      "Seni gören kelebekler, narinliğin karşısında mest olur.",
      "Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.",
      "Sabah olmuş. Sen mi uyandın yoksa gönlüme güneş mi doğdu.",
      "Huzur kokuyor geçtiğin her yer.",
      "En güzel manzaramsın benim, seyretmeye doyamadığım.",
      "Sen benim düşlerimin surete bürünmüş halisin.",
      "Bir sahil kasabasının huzuru birikmiş yüzüne.",
      "Gülüşünde nice ilaçlar var yarama merhem olan.",
      "Gece nasıl sabahı bekliyorsa aydınlanmak için ben de seni öyle bekliyorum.",
      "Işığınla gecemi aydınlatıyorsun.",
      "Yağmurdan sonra açan gök kuşağı gibisin, öyle güzel ve özel!",
      "Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.",
      "Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.",
      "Seni kelimeler ile anlatmak çok zor. Muhteşem desem yine eksik kalıyor anlamın.",
      "Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.",
      "Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.",
      "Bu kadar muhteşem olamaz bir insan. Bu kadar kusursuz bu kadar mükemmel.. Kirpiklerinin dizilişi bile sırayla senin.",
      "Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.",
      "Senin güzelliğini anlatmaya dünyalar değil, lisanlar bile yetmez.",
      "Etkili gülüş kavramını ben senden öğrendim.",
      "Seni yanlışlıkla cennetten düşürmüşler. Dünyada yaşayan bir meleksin sen.",
      "Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.",
      "Gözlerinin gördüğü her yer benimdir. Bakışına şahit olan her toprak benim de vatanımdır.",
      "Gözlerinle baharı getirdin garip gönlüme.",
      "Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.",
      "Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.",
      "Seni de bu dünyada görünce yaşama sebebimi anladım. Meğer senmişsin beni dünyada yaşamaya zorlayan.",
      "Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.",
      "Sen benim yanımda olduğun sürece benim nerde olduğum hiç önemli değil .Kokunu aldığım her yer cennet bana.",
      "Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.",
      "Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.",
      "Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.",
      "Aynı zaman diliminde yaşamak benim için büyük ödüldür.",
      "Seninle aşkı yaşamak çok güzel bir şey ama sensiz kalma korkusunu düşünmek korkutuyor beni.",
      "Seni severek meslek sahibi oldum ben. Seni sevmeye başladıkça şair oldum.",
      "Gülüşün güzelliğine anlam katıyor. Gamzelerin ise bambaşka diyarların kapılarını açıyor.",
      "Senin gülüşünü gördüğüm günden beri ağlamalarımı unuttum.",
      "Kimse konuşmasın yalnız sen konuş bana. Yalnız sen bak gözlerimin içine. Kimse olmasın yalnızca sen ol benim hayatımda.",
      "Ben seninle birlikte yaşayabilmek için ikinci kere geldim hayata.",
      "Senin attığın adımlarda seni korumak için geçtiğin yol olmak isterdim. Seni emniyete alan ve sonsuz bir yolculuğa çıkaran bir yol.",
      "Tak jileti dudağına şah damarımdan öp beni!",
      "Mucizelerden bahsediyordum. Tam o sırada gözlerin geldi aklıma.",
      "Benim için mutluluğun tanımı, seninle birlikteyken geçirdiğim vakittir.",
      "Mavi gözlerin, gökyüzü oldu dünyamın.",
      "Seni gören kelebekler, narinliğin karşısında mest olur.",
      "Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.",
      "Sabah olmuş. Sen mi uyandın yoksa gönlüme güneş mi doğdu.",
      "Huzur kokuyor geçtiğin her yer.",
      "En güzel manzaramsın benim, seyretmeye doyamadığım.",
      "Sen benim düşlerimin surete bürünmüş halisin.",
      "Bir sahil kasabasının huzuru birikmiş yüzüne.",
      "Gülüşünde nice ilaçlar var yarama merhem olan.",
      "Gece nasıl sabahı bekliyorsa aydınlanmak için ben de seni öyle bekliyorum.",
      "Işığınla gecemi aydınlatıyorsun.",
      "Yağmurdan sonra açan gök kuşağı gibisin, öyle güzel ve özel!",
      "Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.",
      "Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.",
      "Seni kelimeler ile anlatmak çok zor. Muhteşem desem yine eksik kalıyor anlamın.",
      "Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.",
      "Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.",
      "Bu kadar muhteşem olamaz bir insan. Bu kadar kusursuz bu kadar mükemmel.. Kirpiklerinin dizilişi bile sırayla senin.",
      "Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.",
      "Senin güzelliğini anlatmaya dünyalar değil, lisanlar bile yetmez.",
      "Etkili gülüş kavramını ben senden öğrendim.",
      "Seni yanlışlıkla cennetten düşürmüşler. Dünyada yaşayan bir meleksin sen.",
      "Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.",
      "Gözlerinin gördüğü her yer benimdir. Bakışına şahit olan her toprak benim de vatanımdır.",
      "Gözlerinle baharı getirdin garip gönlüme.",
      "Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.",
      "Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.",
      "Seni de bu dünyada görünce yaşama sebebimi anladım. Meğer senmişsin beni dünyada yaşamaya zorlayan.",
      "Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.",
      "Sen benim yanımda olduğun sürece benim nerde olduğum hiç önemli değil .Kokunu aldığım her yer cennet bana.",
      "Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.",
      "Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.",
      "Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.",
      "Aynı zaman diliminde yaşamak benim için büyük ödüldür.",
      "Seninle aşkı yaşamak çok güzel bir şey ama sensiz kalma korkusunu düşünmek korkutuyor beni.",
      "Seni severek meslek sahibi oldum ben. Seni sevmeye başladıkça şair oldum.",
      "Gülüşün güzelliğine anlam katıyor. Gamzelerin ise bambaşka diyarların kapılarını açıyor.",
      "Senin gülüşünü gördüğüm günden beri ağlamalarımı unuttum.",
      "Kimse konuşmasın yalnız sen konuş bana. Yalnız sen bak gözlerimin içine. Kimse olmasın yalnızca sen ol benim hayatımda.",
      "Ben seninle birlikte yaşayabilmek için ikinci kere geldim hayata.",
      "Senin attığın adımlarda seni korumak için geçtiğin yol olmak isterdim. Seni emniyete alan ve sonsuz bir yolculuğa çıkaran bir yol.",
      "Aklıma sevmek geldiğinde, gözlerimin önüne sen geliyorsun. Günün her saati canım sevmek istiyor ve seni düşünüyor kalbim",
      "Kalbimin tek sahibisin.",
      "Bu gce birşeyler yapsak mı ?  🔥",
      "Yanlıyorum beni söndürmek istermisin 🔥",
      "Tak jileti dudağına şah damarımdan öp beni!",
      "Oha bu çocuk Türk müüüüüüüüüüüü?",
      "dur beynimi çıkarayım, eşit şartlarda konuşalım",
      "gitsen tek kaybım mal kaybı olur hahaha",
      "bunun adı kalp güzelim. Tersten okuduğun gibi plak değil ki sürekli sende takılı kalsın.",
      "kafamı yaşasan kafana sıkarsın",
      "sanırım seni getiren leyleğin bıraktığı izdi, kuş beyinli olman.",
      "senin için savaşırdım ama verimsiz toprakları feth etmeye gerek yok",
      "birbirimizi çift görmem için kaç duble daha içmeliyim?",
      "azrail bile ayağıma geliyor ne bu tripler?",
      "Buralarda yeniyim de kalbinin yolunu tarif eder misin?",
      "Nasıl yani şimdi sen gerçek misin?",
      "Bunca zaman neredeydin ?",
      "seni seviyorum.",
      "Allah seni yaratmış fakat takip etmiyor sanırım, bu tip ne?",
      "sarılalım mı?",
      "benimle evlenir misin?",
      "azıcık beynini kullan diyeceğim fakat seni zor durumda bırakmak istemiyorum.",
      "akıllara zarar bi mükemmelliğin var",
      "attan indiysek leopar falan gelmiştir ben anlamam eşekten",
      "dedikodu yapalım mı?",
      "iyi ki varsın 💕",
      "şu üstteki aptik ne anlatıyor ya?",
      "o kadar haklısın ki... seni öpesim var",
      "öpşuelimi? çabuk!",
      "yavrum hepsi senin mi?",
      "bi alo de gelmezsem gençliğim solsun.",
      "çok şişkosun.",
      "sevgilim var yazma?",
      "zenginsen evlenelim mi?",
      "halk pazarı gibisin canım sana olan tek ilgim ucuzluğundan",
      "o kadar çok meslek türü varken neden şerefsizlik tatlım?",
      "bu güne aynayı öperek başladım",
      "çok bereketli topraklarımız yok mu? her türlü şerefsiz yetişiyor",
      "taş gibisin!",
      "kalitesizliğinin kokusu geldi...",
      "Şey gözlerin çok güzelmiş tanışalım mı ?",
      "Kalbinin yolunu gösterir misin...",
      "Corona olsan bile sana sarılırdım",
      "Oha sen gerçek misin ?",
      "kahveyi sütsüz seni tereddütsüz seviyorum",
      "senin hava attığın yerde benim rüzgarım esiyor",
      "çok güzel bi tablo gördüm tam alacaktım ama aynaymış...",
      "canım haddin hariç her şeyi biliyorsun",
      "havalar alev gibii, tatile serin bi yerlere gitsene mesela morg?",
      "tavla oynayalım ama sen beni tavla",
      "hava sıcak değil aşkından yanıyorum",
      "konum atta belamızı bulalım bebeğim",
      "üşüdüysen sana abayı yakayım mı?",
      "gel biraz otur yanıma ölünce gidersin",
      "sütüm yarım yağlı mutluluğum sana bağlı",
      "eğer ahtapot olsaydım üç kalbimi de sana verirdim",
      "salağa yatarken uyuya falan mı kaldın?",
      "meleksin ama canımı alıyorsun yoksa Azrailim misin?",
      "ben varya fay hattı olsam kesin daha az kırılırdım",
      "iban at hayallerimi yollayayım harcarsın",
      "ankarada deniz sende karakter",
      "sana hayatım diyorum çünkü o kadar kötüsün",
      "görüşelim mi? mahşer yeri uygun mu?",
      "eşekten yarış atı olmaz ama sen genede koş spor yaparsın",
      "Anlatsana biraz neden bu kadar mükemmelsin?",
      "Nasılsın diye sorma bebeğim, sana göreyim kıpss",
      "Kakaolu sütsün seni sevmeyen ölsün",
      "Ya sen hep böyle hoşuma mı gideceksin ?",
      "Çikolatalı keksin bu alemde teksin",
      "8 milyar gülüş varken seninki favorim",
      "dalin gibi kokuyorsun",
      "seni her gün görenlerin şansından istiyorum",
      "en iyisine layıksın yani bana hıh",
      "ateşimin çıkma sebebi corona değil, sensin",
      "yemeğimi yedim şimdi seni yeme vakti",
      "beni biraz takar mısın?",
      "aklın başına gelir ama ben sana gelmem",
      "sen beni birde sevgilinken gör",
      "naber lan karakter kanseri",
      "soğuk davranacaksan üzerime bir şey alayım?",
      "sana beyin alacam",
      "Allah belanı vermiyor artık ben bir şey yapacağım",
      "artık benimsin",
      "o kadar pubg oynadım böyle vurulmadım",
      "canın yandı mı? cenneten düşerken?",
      "seni mumla ararken elektrikler geldi",
      "burnunda sümük var",
      "Suyun içinde klorür senin kalbinde bir ömür...",
      "Çok tatlı olmayı bırak artık... Kalbim başa çıkamıyor !",
      "Kalbini dinle dediklerinde seni dinleyesim geliyor",
      "Polisi arıyorum çünkü bu kadar tatlı olman yasadışı !",
      "Ölüm ani dünya fani bi kere sevsen nolur ki yani ?",
      "Bana yüzünü dönme gece oluyor sanıyorum.",
      "Güneş aya ben sana tutuldum.",
      "Sana gemi alalım dümende bir numarasın.",
      "AÇILIN DÜNYANIN 8.HARİKASI GELDİ !",
      "Ben küçücük bi botum ama sana kocaman sarılırım",
      "Kafam çok güzel çünkü içinde sen varsın.",
      "Alnın güzelmiş yazısı olabilir miyim ?",
      "Gülüşün şimşek içermiyiz birer milkşeyk ?",
	  "Gözlerindeki saklı cenneti benden başkası fark etsin istemiyorum.",
  "Mavi gözlerin, gökyüzü oldu dünyamın.",
  "Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.",
  "Huzur kokuyor geçtiğin her yer.",
  "Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.",
  "Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.",
  "Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.",
   "Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.",
   "Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.",
   "Etkili gülüş kavramını ben senden öğrendim.",
   "Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.",
   "Gözlerinle baharı getirdin garip gönlüme.",
   "Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.",
   "Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.",
   "Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.",
   "Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.",
   "Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.",
   "Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.",
   "Aynı zaman diliminde yaşamak benim için büyük ödüldür.",
  "Biraz Çevrendeki İnsanları Takarmısın ?",
  "İğrenç İnsansın!",
   "Kalbime giden yolu aydınlatıyor gözlerin.  Sadece sen görebilirsin kalbimi. Ve sadece ben hissedebilirim bana karşı olan hislerini.",
   "Onu Bunu Boşver de bize gel 2 bira içelim.",
    "Taş gibi kızsın ama okey taşı… Elden elde gidiyorsun farkında değilsin.",
    "Ateş bacayı sardı ❤️‍🔥",
    "Mucizelerden bahsediyordum.",
    "Mucizelerden bahsediyordum. Tam o sırada gözlerin geldi aklıma.",
    "Benim için mutluluğun tanımı, seninle birlikteyken geçirdiğim vakittir.",
    "Mavi gözlerin, gökyüzü oldu dünyamın.",
    "Seni gören kelebekler, narinliğin karşısında mest olur.",
    "Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.",
    "Sabah olmuş. Sen mi uyandın yoksa gönlüme güneş mi doğdu.",
    "Huzur kokuyor geçtiğin her yer.",
    "En güzel manzaramsın benim, seyretmeye doyamadığım.",
    "Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.",
    "Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.",
    "Seni kelimeler ile anlatmak çok zor. Muhteşem desem yine eksik kalıyor anlamın.",
    "Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.",
    "Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.",
    "Bu kadar muhteşem olamaz bir insan. Bu kadar kusursuz bu kadar mükemmel.. Kirpiklerinin dizilişi bile sırayla senin.",
    "Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.",
    "Senin güzelliğini anlatmaya dünyalar değil, lisanlar bile yetmez.",
    "Etkili gülüş kavramını ben senden öğrendim.",
    "Seni yanlışlıkla cennetten düşürmüşler. Dünyada yaşayan bir meleksin sen.",
    "Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.",
    "Gözlerinin gördüğü her yer benimdir. Bakışına şahit olan h er toprak benim de vatanımdır.",
    "Gözlerinle baharı getirdin garip gönlüme.",
    "Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.",
    "Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.",
    "Seni de bu dünyada görünce yaşama sebebimi anladım. Meğer senmişsin beni dünyada yaşamaya zorlayan.",
    "Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.",
    "Sen benim yanımda olduğun sürece benim nerde olduğum hiç önemli değil .Kokunu aldığım her yer cennet bana.",
    "Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.",
    "Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.",
    "Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.",
    "Aynı zaman diliminde yaşamak benim için büyük ödüldür.",
    "Seninle aşkı yaşamak çok güzel bir şey ama sensiz kalma korkusunu düşünmek korkutuyor beni.",
    "Seni severek meslek sahibi oldum ben. Seni sevmeye başladıkça şair oldum.",
    "Gülüşün güzelliğine anlam katıyor. Gamzelerin ise bambaşka diyarların kapılarını açıyor.",
    "Senin gülüşünü gördüğüm günden beri ağlamalarımı unuttum.",
    "Kimse konuşmasın yalnız sen konuş bana. Yalnız sen bak gözlerimin içine. Kimse olmasın yalnızca sen ol benim hayatımda.",
    "Ben seninle birlikte yaşayabilmek için ikinci kere geldim hayata.",
    "Senin attığın adımlarda seni korumak için geçtiğin yol olmak isterdim. Seni emniyete alan ve sonsuz bir yolculuğa çıkaran bir yol.",
    "Aklıma sevmek geldiğinde, gözlerimin önüne sen geliyorsun. Günün her saati canım sevmek istiyor ve seni düşünüyor kalbim."
    ];
  Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
  };
client.on("message", async message => {
        if (message.channel.id === "1019372004111036619" && !message.author.bot) {
        iltifatSayi++;
        if (iltifatSayi >= 50) {
          iltifatSayi = 0;
          message.reply({ content: iltifatlar.random()});
        };
      };
});


// AFK
	
client.on("message", async message => {
		
 
      let ms = require("ms");
      
     if (message.author.bot || message.channel.type === "dm") return;
    
	const embed = new Discord.MessageEmbed().setColor("RANDOM");

    if(message.mentions.users.size >= 1){
      let victim = message.mentions.users.first();
      if(db.has(`${victim.id}.afk`)) {
        let data = db.get(`${victim.id}.afk`);
        let tarih = client.tarihHesapla(data.sure);
        return message.channel.send({ embeds: [embed.setDescription(`${victim} adlı üye ${data.sebep ? `**${data.sebep}** sebebiyle ` : ""}${tarih} AFK oldu.`)]}).then(msg => {
    setTimeout(() => msg.delete(), 5000)
  })
      };
    };
    if(!db.has(`${message.author.id}.afk`)) return;
    if(message.member.manageable) message.member.setNickname(message.member.displayName.replace("[AFK]", "")).catch();
    db.delete(`${message.author.id}.afk`);
    message.channel.send(`${message.author} artık AFK değilsin!`).then(msg => {
    setTimeout(() => msg.delete(), 3000)
  })
  
        });
 
 


// TARİH HESAPLA
client.tarihHesapla = (date) => {
  const startedAt = Date.parse(date);
  var msecs = Math.abs(new Date() - startedAt);

  const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
  msecs -= years * 1000 * 60 * 60 * 24 * 365;
  const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
  msecs -= months * 1000 * 60 * 60 * 24 * 30;
  const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
  msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
  const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
  msecs -= days * 1000 * 60 * 60 * 24;
  const hours = Math.floor(msecs / (1000 * 60 * 60));
  msecs -= hours * 1000 * 60 * 60;
  const mins = Math.floor((msecs / (1000 * 60)));
  msecs -= mins * 1000 * 60;
  const secs = Math.floor(msecs / 1000);
  msecs -= secs * 1000;

  var string = "";
  if (years > 0) string += `${years} yıl ${months} ay`
  else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`
  else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`
  else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`
  else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`
  else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`
  else if (secs > 0) string += `${secs} saniye`
  else string += `saniyeler`;

  string = string.trim();
  return `\`${string} önce\``;
};


setInterval(() => {
        checkMutes();
        checkJails();

    }, 10000)
async function checkMutes () {
    const Cezalarfln = require('./Schemas/Ceza');
    let Cezaxd = await Cezalarfln.find({ Aktif: true, "Other.Bitis": { $lte: Date.now() } });
    Cezaxd = Cezaxd.filter(xd => xd.Tip == "Chat Mute" || xd.Tip == "Voice Mute");
    if (!Cezaxd || Cezaxd.length <= 0) return;

    let finishedMutes = Cezaxd.filter(awoken => Date.now() > Number(awoken.Other.Bitis));
    let guild = client.guilds.cache.get(ayarlar.SERVER.sunucu);
    if (!guild) return;
    let clientUser = guild.members.cache.get(client.user.id);

    finishedMutes.forEach(async (Cezacik) => {
      Cezacik.Aktif = false;
      const member = guild.members.cache.get(Cezacik.userID);
      if(!member) return
      let muteRolu = member.guild.roles.cache.find(rol => rol.name === ayarlar.ROLLER.muterol);
      let muteRolID = muteRolu.id
      let muteLog = member.guild.channels.cache.find(channel => channel.name === ayarlar.LOGS.muteLog);

      if(member) {
		  console.log(`${member} kişisinin mute cezası kaldırıldı.`)
        if(member.roles.cache.has(muteRolID)) member.roles.remove(muteRolID)
        if(Cezacik.Tip == "Voice Mute" && (member.voice.channelID !== null && member.voice.serverMute !== false)) member.voice.setMute(false)
        Cezacik.save().then(() => {
            if (Cezacik.Tip == "Voice Mute") muteLog.send(`${member} üyenin ses mute cezası bitti.  {Ceza ID: ${Cezacik.ID}}`);
            else if (Cezacik.Tip == "Chat Mute") muteLog.send(`${member} üyenin chat mute cezası bitti.  {Ceza ID: ${Cezacik.ID}}`);
        });
      };
    });

    await Cezalarfln.updateMany({Activity: true, "Other.Bitis": {$exists: true, $lte: Date.now()}}, {$set: {Activity: false}}, {multi: true}).exec();
};

async function checkJails () {
    const Cezalarfln = require('./Schemas/Ceza');
    let Cezaxd = await Cezalarfln.find({ Aktif: true, "Other.Bitis": { $lte: Date.now() } });
    Cezaxd = Cezaxd.filter(xd => xd.Tip == "Jail");
    if (!Cezaxd || Cezaxd.length <= 0) return;

    let finishedJails = Cezaxd.filter(awoken => Date.now() > Number(awoken.Other.Bitis));
    let guild = client.guilds.cache.get(ayarlar.SERVER.sunucu);
    if (!guild) return;
    let clientUser = guild.members.cache.get(client.user.id);

    finishedJails.forEach(async (Cezacik) => {
      Cezacik.Aktif = false;
      const member = guild.members.cache.get(Cezacik.userID);
	  if(!member) return
		let jailLog = member.guild.channels.cache.find(channel => channel.name === ayarlar.LOGS.jailLog);
let jailRol = member.guild.roles.cache.find(rol => rol.name === ayarlar.ROLLER.jailRolu);
let jailRolID = jailRol.id

      if(member) {
		console.log(`${member} kişisinin jail cezası kaldırıldı.`)
		if(member.manageable) member.setNickname(`İsim`)
        await member.roles.add(ayarlar.ROLLER.teyitsizRolleri)
		await member.roles.remove(jailRolID);

        Cezacik.save().then(async () => {
            jailLog.send(`${member} üyesinin cezası bitti. {Ceza ID: ${Cezacik.ID}}`);
        });
      };
    });

    await Cezalarfln.updateMany({Activity: true, "Other.Bitis": {$exists: true, $lte: Date.now()}}, {$set: {Activity: false}}, {multi: true}).exec();
};



 // SON MESAJ
client.on("messageDelete", async(message) => {
  if (message.channel.type === "dm" || !message.guild || message.author.bot) return;
let snipe = {
mesaj: message.content || null,
image: message.attachments.first()?.proxyURL || null,
mesajyazan: message.author.id,
starihi: Date.now(), 
kanal: message.channel.id
}
await db.set(`snipe.${message.guild.id}`, snipe)
}); 

// MESAJ Silinme Logu


client.on('messageDelete', async message => {    
  if(message.author.bot) return;
  
  const embed = new Discord.MessageEmbed().setFooter(ayarlar.BOT.footer).setColor("RANDOM");
  const channel = message.guild.channels.cache.find(c => c.name === ayarlar.LOGS.mesajLog);
  

  let resim = message.attachments.first()?.proxyURL || null
  
channel.send({ embeds: [embed.setDescription(`

  **Silen Kişi**;
  \`${message.author.username} (${message.author.id})\`

  **Silinen Mesaj**: \`${message.content}\`
  **Silindiği Kanal**: \`${message.channel.name}\`

`).setTitle("Mesaj Silindi!")]})

  if(resim != null) return channel.send({ embeds: [embed.setDescription(`

  **Silen Kişi**;
  \`${message.author.username} (${message.author.id})\`

  **Silinen Mesaj Bir Dosya**: \`${resim}\`
  **Silindiği Kanal**: \`${message.channel.name}\`

  `).setTitle("Mesaj Silindi!")]})

});

// Mesaj Düzenleme Logu
client.on('messageUpdate', async(oldMessage, newMessage) => {
    if(oldMessage.author.bot) return;
    if(oldMessage.content == newMessage.content) return;

    const embed = new Discord.MessageEmbed().setFooter(ayarlar.BOT.footer).setColor("RANDOM");
    const channel = newMessage.guild.channels.cache.find(c => c.name === ayarlar.LOGS.mesajLog);

channel.send({ embeds: [embed.setDescription(`

  **Mesajını Güncelleyen Kişi**;
  \`${newMessage.author.username} (${newMessage.author.id})\`

  **Eski Mesaj**: \`${oldMessage.content}\`
  **Yeni Mesaj**: \`${newMessage.content}\`
  **Mesajın Güncellendiği Kanal**: \`${newMessage.channel.name}\`
`).setTitle("Mesaj Güncellendi!")]})
});

// MESAJ ŞEYLERİ
let beklemeSuresi = new Set();
client.on("message", (message) => {
  if(message.author.bot || message.channel.type == "dm") return;
 if (message.content.toLowerCase().startsWith('!link') || message.content.toLowerCase().startsWith('.link') || message.content.toLowerCase().startsWith('?link')) {
    if (beklemeSuresi.has(message.author.id+2)) return;
    message.channel.send(ayarlar.SERVER.sınırsızInviteLink);
    beklemeSuresi.add(message.author.id+2);
    setTimeout(() => { beklemeSuresi.delete(message.author.id+2); }, 15000);
    return;
  }
});









// SES LOG
       client.on('voiceStateUpdate', async (oldState, newState) => {
		      let logKanali = oldState.guild.channels.cache.find(c => c.name === ayarlar.LOGS.sesLog);
   
        if (!oldState.channelId && newState.channelId) { 
          //  let users = newState.guild.members.cache.get(newState.id)
            let member = newState.guild.members.cache.get(newState.id)
            let microphone = member.voice.selfMute ? "kapalı" : "açık";
            let headphones = member.voice.selfDeaf ? "kapalı" : "açık";
            //console.log()
            let SesMicEmbed = new MessageEmbed()
          .setColor("RANDOM")
          .setAuthor(newState.member.user.username, newState.member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
          .setThumbnail(newState.member.user.displayAvatarURL({ dynamic: true}))
          .setDescription(`
          <@${newState.member.user.id}> üyesi <#${newState.channel.id}> kanalına giriş yaptı.
          
**Kanala girdiği anda:**
\`•\` Mikrofon durumu: \`${microphone}\`. 
\`•\` Kulaklık durumu: \`${headphones}\`.
      
      \`\`\`
Giridiği kanal: ${newState.channel.name}
(${newState.channelId})
Kullanıcı: ${newState.member.user.tag}
(${newState.member.user.id})
Eylem Gerçekleşme: ${moment(newState.createdAt).locale("tr").format('LLL')}\`\`\`   
      Girdiği kanalda bulunan üyeler:
      ${newState.channel.members.map(x => `${x.user} - \`${x.user.id}\``).join("\n")}
          `)   
          return logKanali.send({ 
            embeds: [SesMicEmbed]
            })
        } 
	   });

        client.on('voiceStateUpdate', async (oldState, newState) => {
		      let logKanali = oldState.guild.channels.cache.find(c => c.name === ayarlar.LOGS.sesLog);
		
  if (oldState.channelId && newState.channelId && oldState.channel && newState.channel) {
    if (oldState.channelId !== newState.channelId) {
    let member = newState.guild.members.cache.get(newState.id);
    let microphone = member.voice.selfMute ? "kapalı" : "açık";
    let headphones = member.voice.selfDeaf ? "kapalı" : "açık";
    if(oldState.channel.members.map(x => x)[0]){
            var makro = oldState.channel.members.map(x => `${x.user} - \`${x.user.id}\``).join("\n")
          } else {
            var makro = "Maalesef bu kanalda üye bulunmamaktadır.";
          }
          let SesMicEmbed1 = new MessageEmbed()
          .setColor("RANDOM")
          .setAuthor(oldState.member.user.username, oldState.member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
          .setThumbnail(oldState.member.user.displayAvatarURL({ dynamic: true}))
          .setDescription(`
<@${oldState.member.user.id}> üyesi <#${oldState.channel.id}> kanalından <#${newState.channel.id}> kanalına geçiş yaptı.

**Kanal Değiştirdiği Anda:**
          \`•\` Mikrofon durumu: \`${microphone}\`. 
          \`•\` Kulaklık durumu: \`${headphones}\`.

          \`\`\`
Çıktığı kanal: ${oldState.channel.name}
(${oldState.channelId})
Kullanıcı: ${oldState.member.user.tag}
(${oldState.member.user.id})
Eylem Gerçekleşme: ${moment(oldState.createdAt).locale("tr").format('LLL')}\`\`\`

Eski Kanalında Bulunan Üyeler:
${makro}

Yeni Kanalında Bulunan Üyeler:        
${newState.channel.members.map(x => `${x.user} - \`${x.user.id}\``).join("\n")}
`)   
          return logKanali.send({ 
              embeds: [SesMicEmbed1]
              })
			  return;
  }}
  
      });



 client.on('voiceStateUpdate', async (oldState, newState) => {
		      let logKanali = oldState.guild.channels.cache.find(c => c.name === ayarlar.LOGS.sesLog);
          if(oldState.channelId && !newState.channelId){
            let member = newState.guild.members.cache.get(newState.id);
          let microphone = member.voice.selfMute ? "kapalı" : "açık";
          let headphones = member.voice.selfDeaf ? "kapalı" : "açık";
          if(oldState.channel.members.map(x => x)[0]){
            var makro = oldState.channel.members.map(x => `${x.user} - \`${x.user.id}\``).join("\n")
          } else {
            var makro = "Maalesef bu kanalda üye bulunmamaktadır.";
          }
          let SesMicEmbed = new MessageEmbed()
          .setColor("RANDOM")
          .setAuthor(oldState.member.user.username, oldState.member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
          .setThumbnail(oldState.member.user.displayAvatarURL({ dynamic: true}))
          .setDescription(`
<@${oldState.member.user.id}> üyesi <#${oldState.channel.id}> kanalından ayrıldı.
       
**Kanaldan Çıktığı anda:**
          \`•\` Mikrofon durumu: \`${microphone}\`. 
          \`•\` Kulaklık durumu: \`${headphones}\`.

          \`\`\`
Çıktığı kanal: ${oldState.channel.name}
(${oldState.channelId})
Kullanıcı: ${oldState.member.user.tag}
(${oldState.member.user.id})
Eylem Gerçekleşme: ${moment(oldState.createdAt).locale("tr").format('LLL')}\`\`\`
          Çıktığı kanalda bulunan üyeler:
          ${makro}
          `)   
          return logKanali.send({ 
              embeds: [SesMicEmbed]
              })
			  return;
          }
		
 });

   

client.on('messageCreate', async message => {


	if (message.content === '.help') {

  if (message.channel.id != "1019372004111036622") return message.channel.send(`**Bu komut sadece <#1019372004111036622> kanalında çalışır.**`).then(msg => {
	message.delete()
    setTimeout(() => msg.delete(), 10000)
  })
  .catch()

		const menu1 = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('menu1')
					.setPlaceholder('Yardım Menüsü')
					.addOptions([
						{
							label: 'Üye Komutları',
							description: 'Genel tüm komutları içerir.',
							value: 'uye',
						},
						{
							label: 'Teyit Komutları',
							description: 'Genel tüm kayıt komutlarını içerir.',
							value: 'teyit',
						},
						{
							label: 'Yetkili Komutları',
							description: 'Genel tüm yetkili komutlarını içerir.',
							value: 'yetkili',
						},
						{
							label: 'Yönetim Komutları',
							description: 'Genel tüm yönetim komutlarını içerir.',
							value: 'yönetim',
						},
					]),
			);


     message.channel.send({ content: `
Aşağıda bulunan menüden yardım almak istediğiniz kategoriyi seçin.
Not: Unutmayın bu mesaj kendini **25 saniye** sonra imha edecek.`, components: [menu1]  }).then(msg => {
	message.delete()
    setTimeout(() => msg.delete(), 30000)
  })
  .catch()



	}
});
client.on("interactionCreate", async(interaction) => {
	if(interaction.isButton()) return;
let prefix = ayarlar.BOT.prefix

let koruma1 = ["uye", "teyit", "yetkili", "yönetim"]
if (!koruma1.includes(interaction.values[0])) return;
if(interaction.values[0] === 'uye' || interaction.values[1] === 'uye'){
	

		
				await interaction.reply({content: `
	
\`${prefix}invite\` Sizin veya etiketleyeceğiniz kişinin davet sayısını gösterir.
\`${prefix}topinvite\` Sunucu davet sıralamasını gösterir.
\`${prefix}me\` Sunucudaki istatistiklerinizi veya etiketleyeceğiniz kişinin gösterir.
\`${prefix}top\` Sunucudaki istatistik sıralamasını gösterir.
\`${prefix}afk sebep\` Sunucuda afk moduna geçmenizi sağlar.
\`${prefix}avatar\` Sizin veya etiketleyeceğiniz kişinin avatarını gösterir.
\`${prefix}banner\` Sizin veya etiketleyeceğiniz kişinin bannerini gösterir.
\`${prefix}git @Etiket\` Etiketleyeceğiniz kişinin odasına gitmek için istek gönderir.
\`${prefix}çek @Etiket\` Etiketleyeceğiniz kişiyi odanıza çekmek için istek gönderir.
\`${prefix}say\` Sunucunun genel verilerini gösterir.


				`, ephemeral: true})
				
			
}

if(interaction.values[0] === 'teyit' || interaction.values[1] === 'teyit'){
	

		
				await interaction.reply({content: `
				
\`${prefix}k @Etiket İsim\` Etiketleyeceğiniz kişiyi belirttiğiniz isim ile kayıt işlemine sokar.
\`${prefix}isimler @Etiket\` Etiketleyeceğiniz kişinin geçmiş kayıtlarını gösterir.
\`${prefix}nick @Etiket İsim\` Etiketleyeceğiniz kişinin ismini düzenler.
\`${prefix}güvenilir @Etiket\` Etiketleyeceğiniz kişiyi şüpheli hesaptan çıkarır.
\`${prefix}kbilgi\` Sizin veya etiketleyeceğiniz kişinin kaç kayıtı olduğunu gösterir.
\`${prefix}kayıtsız @Etiket\` Etiketleyeceğiniz kişiyi kayıtsıza atar.


				`, ephemeral: true})
				
			
}

if(interaction.values[0] === 'yetkili' || interaction.values[1] === 'yetkili'){
	

		
				await interaction.reply({content: `
				
\`${prefix}mute @Etiket Süre Sebep\` Etiketleyeceğiniz kişiyi belirttiğiniz süre ve sebep ile yazı kanallarında muteler.
Örnek kullanım: ${prefix}mute @RunHeaven 5m Troll ( 5 dakika boyunca yazı kanallarında muteler. )

\`${prefix}vmute @Etiket Süre Sebep\` Etiketleyeceğiniz kişiyi belirttiğiniz süre ve sebep ile ses kanallarında muteler.
Örnek kullanım: ${prefix}vmute @RunHeaven 5m Troll ( 5 dakika boyunca ses kanallarında muteler. )

\`${prefix}jail @Etiket Süre Sebep\` Etiketleyeceğiniz kişiyi belirttiğiniz süre ve sebep ile jaile gönderir.
Örnek kullanım: ${prefix}jail @RunHeaven 5m Troll ( 5 dakika boyunca jaile gönderir. )

\`${prefix}ban @Etiket Sebep\` Etiketleyeceğiniz kişiyi belirttiğiniz sebep ile sunucudan yasaklar.
\`${prefix}unmute @Etiket\` Etiketleyeceğiniz kişinin yazı kanallarında bulunan mutesini kaldırır.
\`${prefix}unvmute @Etiket\` Etiketleyeceğiniz kişinin ses kanallarında bulunan mutesini kaldırır.
\`${prefix}unjail @Etiket\` Etiketleyeceğiniz kişinin jailini kaldırır.
\`${prefix}unban ID\` Girilen ID kiminse banını kaldırır.
\`${prefix}ceza CezaID\` Girilen ceza numarasının detaylarını gösterir.
\`${prefix}cezalar @Etiket\` Etiketleyeceğiniz kişinin aldığı cezaları gösterir.
\`${prefix}uyarı @Etiket Sebep\` Etiketleyeceğiniz kişiye belirttiğiniz sebep ile uyarı verir.
\`${prefix}uyarılar @Etiket\` Etiketleyeceğiniz kişinin aldığı uyarıları gösterir.
				`, ephemeral: true})
				
			
}

if(interaction.values[0] === 'yönetim' || interaction.values[1] === 'yönetim'){
	

		
				await interaction.reply({content: `
				
\`${prefix}sil Sayı\` Komutu kullandığınız kanaldaki mesajlardan belirttiğiniz sayı kadarını siler. (Tek seferde en fazla 100 mesaj siler.)
\`${prefix}kilit\` Komutu kullandığınız kanal mesaj gönderimine kapanır.
\`${prefix}kilitac\` Komutu kullandığınız kanal mesaj gönderimine açılır.
\`${prefix}banlananlar\` Sunucuda toplam yasaklanan kişi sayısını gösterir.
\`${prefix}sesli\` Sunucuda anlık olarak kaç kişinin seste olduğunu gösterir.
\`${prefix}slowmode Saniye\` Komutu kullandığınız kanala yazdığınız saniye kadar slowmode uygular.
\`${prefix}snipe\` Silinen son mesajı gösterir.
\`${prefix}bilgi @Etiket\` Etiketlediğiniz kişinin hesap ve sunucu bilgilerini gösterir.


				`, ephemeral: true})
				
			
}

});
client.on("userUpdate", async (oldUser, newUser) => {
    if(oldUser.bot || newUser.bot) return;
	
	
	
    let client = oldUser.client;
    let guild = client.guilds.cache.get(ayarlar.SERVER.sunucu);
    if(!guild) return console.error(`${__filename} Sunucu bulunamadı!`);
    let user = guild.members.cache.get(oldUser.id);
    if(!user) return;

    const embed = new Discord.MessageEmbed().setAuthor(user.displayName, user.user.avatarURL({dynamic: true})).setFooter(ayarlar.BOT.footer).setColor("RANDOM")
  
  
  
   let yasaklıTag = user.guild.roles.cache.find(rol => rol.name === ayarlar.ROLLER.yasaklıTagRol);
  let yasaklıTagID = yasaklıTag.id
     let boosterRol = user.guild.roles.cache.find(rol => rol.name === ayarlar.ROLLER.boosterRol);
  let boosterRolID = boosterRol.id

  let yasaklıTagLog = user.guild.channels.cache.find(c => c.name === ayarlar.LOGS.yasaklıTag);

  if(oldUser.username != newUser.username) {
    
  if(ayarlar.SERVER.yasaklıTags.some(a => newUser.username.toLowerCase().includes(a.toLowerCase()))){
  
    if(yasaklıTagLog) return yasaklıTagLog.send({ embeds: [embed.setDescription(`<@${user.id}>(${user.id}) kişisi ismine yasaklı tagı aldığı için cezalıya atıldı!`).setColor("#32FF00")]}).catch();
   if(user.manageable) user.roles.cache.has(boosterRolID) ? user.roles.set([boosterRolID, yasaklıTagID]) : user.roles.set([yasaklıTagID]);
 if(!user.manageable) user.roles.add(yasaklıTagID)
  } else if(!ayarlar.SERVER.yasaklıTags.every(s => newUser.username.toLowerCase().includes(s.toLowerCase())) && ayarlar.SERVER.yasaklıTags.some(a => oldUser.username.toLowerCase().includes(a.toLowerCase()))) {
 if(ayarlar.SERVER.yasaklıEtiket.every(s => oldUser.discriminator.toLowerCase().includes(s.toLowerCase())) && ayarlar.SERVER.yasaklıEtiket.some(a => newUser.discriminator.toLowerCase().includes(a.toLowerCase()))) return;
 user.roles.cache.has(boosterRolID) ? user.roles.set([boosterRolID, ayarlar.ROLLER.teyitsizRolleri]) : user.roles.set([ayarlar.ROLLER.teyitsizRolleri]);
if(!user.manageable) user.roles.remove(yasaklıTagID)
     if(yasaklıTagLog) return yasaklıTagLog.send({ embeds: [embed.setDescription(`<@${user.id}>(${user.id}) kişisi isminden yasaklı tagı çıkararak cezalıdan çıktı!`).setColor("#B20000")]}).catch();
   

  
    };

  
  };  

  if(oldUser.discriminator != newUser.discriminator) {
  
  if(!ayarlar.SERVER.yasaklıEtiket.every(s => oldUser.discriminator.toLowerCase().includes(s.toLowerCase())) && ayarlar.SERVER.yasaklıEtiket.some(a => newUser.discriminator.toLowerCase().includes(a.toLowerCase()))){
if(user.manageable) user.roles.cache.has(boosterRolID) ? user.roles.set([boosterRolID, yasaklıTagID]) : user.roles.set([yasaklıTagID]);
 if(!user.manageable) user.roles.add(yasaklıTagID)
    if(yasaklıTagLog) return yasaklıTagLog.send({ embeds: [embed.setDescription(`<@${user.id}>(${user.id}) kişisi ismine yasaklı etiketi aldığı için cezalıya atıldı!`).setColor("#32FF00")]}).catch();
   
  } else if(!ayarlar.SERVER.yasaklıEtiket.every(s => newUser.discriminator.toLowerCase().includes(s.toLowerCase())) && ayarlar.SERVER.yasaklıEtiket.some(a => oldUser.discriminator.toLowerCase().includes(a.toLowerCase()))) {
  if(ayarlar.SERVER.yasaklıTags.every(s => oldUser.username.toLowerCase().includes(s.toLowerCase())) && ayarlar.SERVER.yasaklıTags.some(a => newUser.username.toLowerCase().includes(a.toLowerCase()))) return;

 user.roles.cache.has(boosterRolID) ? user.roles.set([boosterRolID, ayarlar.ROLLER.teyitsizRolleri]) : user.roles.set([ayarlar.ROLLER.teyitsizRolleri]);
if(!user.manageable) user.roles.remove(yasaklıTagID)
     if(yasaklıTagLog) return yasaklıTagLog.send({ embeds: [embed.setDescription(`<@${user.id}>(${user.id}) kişisi isminden yasaklı etiketi çıkararak cezalıdan çıktı!`).setColor("#B20000")]}).catch();
   
  
  
    }
  };


});

client.login(ayarlar.BOT.token).then(c => console.log()).catch(err => console.error("Bota giriş yapılırken başarısız olundu!"));


