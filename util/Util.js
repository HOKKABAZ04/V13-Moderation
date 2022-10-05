const Discord = require('discord.js');
const mongoose = require('mongoose');
const moment = require('moment');
const ms = require('ms');
const ayarlar = require('../ayarlar.json');
const client = global.client;
require('moment-duration-format');
require('moment-timezone')

class Awoken {
    static tarih(tarih) {
        const Aylar = {
            "01": "Ocak",
            "02": "Şubat",
            "03": "Mart",
            "04": "Nisan",
            "05": "Mayıs",
            "06": "Haziran",
            "07": "Temmuz",
            "08": "Ağustos",
            "09": "Eylül",
            "10": "Ekim",
            "11": "Kasım",
            "12": "Aralık"
        };

        let tarihxd = moment(tarih).tz("Europe/Istanbul").format("DD") + " " + Aylar[moment(tarih).tz("Europe/Istanbul").format("MM")] + " " + moment(tarih).tz("Europe/Istanbul").format("YYYY HH:mm")
        return tarihxd;
    };

    static turkishDate (date) {
        if (!date || typeof date !== "number") return;
        const awoken = require('ms');
        let convert = awoken(date, { verbose: true })
          .replace("minutes", "dakika")
          .replace("minute", "dakika")
          .replace("hours", "saat")
          .replace("hour", "saat")
          .replace("seconds", "saniye")
          .replace("second", "saniye")
          .replace("days", "gün")
          .replace("day", "gün")
          .replace("years", "yıl")
          .replace("year", "yıl");
        return convert
    }

    static async getUser (userID) {
        try {
            return await global.client.users.fetch(userID);
        } catch (error) {
            return undefined;
        };
    };

    /////////////////////////////////////////////////////////////////

    static async cezaNumarasiGetir () {
        const Cezafln = require('../Schemas/Ceza.js');
        let Cezalar = await Cezafln.find({});
        if(!Cezalar || Cezalar.length <= 0) return 1;

        return Number(Cezalar[Cezalar.length -1].ID)+1;
    };

    static async CezaEkle (member, yetkili, type, reason = "Sebep Belirtilmemiş.", Times = {}) {
        const Cezafln = require('../Schemas/Ceza.js');
        const CezaID = await this.cezaNumarasiGetir();

        // Chat Mute, Voice Mute, Uyarı, Jail, Ban

        await Cezafln.insertMany({
            ID: CezaID,
            Aktif: true,
            userID: member.id,
            yetkiliID: yetkili.user.id,
            Tip: type,
            Sebep: reason,
            Kaldiran: "Kaldırılmamış.",

            Other: {
                Tarih: Date.now(),
                Sure: Times.Sure ? Times.Sure : null,
                Bitis: Times.Bitis ? Times.Bitis : null
            }
        }).catch(err => console.log(this.logger('warn', `${CezaID} ID'sine sahip ceza veri tabanına kayıt edilirken bir hata oluştu!`)));
    };

    static async CezaBilgi (cezaID) {
        const Cezafln = require('../Schemas/Ceza.js');
        const Ceza = await Cezafln.findOne({ ID: cezaID });

        return Ceza;
    };

    static async CezaPuanGetir (member) {
        const Cezafln = require('../Schemas/Ceza.js');
        const Ceza = await Cezafln.find({ userID: member.user.id });

        if (!Ceza) return 0;
        let filterArr = Ceza.map(x => (x.Tip));

        let chatMute = filterArr.filter(x => x == "Chat Mute").length || 0;
        let voiceMute = filterArr.filter(x => x == "Voice Mute").length || 0;
        let jail = filterArr.filter(x => x == "Jail").length || 0;
        let ban = filterArr.filter(x => x == "Ban").length || 0;
        let uyarı = filterArr.filter(x => x == "Uyarı").length || 0;

        let point = (chatMute * 8) + (voiceMute * 10) + (jail * 15) + (ban * 20) + (uyarı * 3);
        return point;
    };

    static async CezalariGetir (member, options = {}) {
        const Cezafln = require('../Schemas/Ceza.js');
        const Ceza = await Cezafln.find({ userID: member.id });

        if(options.type == "category") {
            let Datas = [
                { name: "Yasaklama", data: Ceza.filter(C => C.Tip == "Ban").length },
                { name: "Jail", data: Ceza.filter(C => C.Tip == "Jail").length },
                { name: "Sohbet Susturması", data: Ceza.filter(C => C.Tip == "Chat Mute").length },
                { name: "Ses Susturması", data: Ceza.filter(C => C.Tip == "Voice Mute").length },
                { name: "Uyarı", data: Ceza.filter(C => C.Tip == "Uyarı").length },
            ]
            Datas = Datas.filter(xd => xd.data > 0);

            const Text = [];
            for(let index = 0; index < Datas.length; index++) {
                const Data = Datas[index];

                Text.push(`**${Data.data}** adet **${Data.name}**`);
            };

            return Text.join(', ');
        };

        return Ceza;
    };

}

module.exports = Awoken;