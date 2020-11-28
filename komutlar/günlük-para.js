
const Discord = require('discord.js');//lrows
//lrows
const ayarlar = require('../ayarlar.json');//lrows
//lrows
const db = require('quick.db');

const ms = require('ms')//lrows
//lrows
exports.run = async (client, message, args) => {
  
 var lrowsşans = ['150','50','75','100','250','25','0'];//lrows
      var lrowsşans = lrowsşans[Math.floor(Math.random() * lrowsşans.length)];//lrows

  let lrowsgün = 8.64e+7, 
//lrows
        amount = Math.floor(Math.random() * 1000) + 4000;    //lrows  


    let lastDaily = await db.fetch(`lrowsgünlük_${message.guild.id}`);

    if (lastDaily !== null && lrowsgün - (Date.now() - lastDaily) > 0) {

        let timeObj = ms(lrowsgün - (Date.now() - lastDaily));





      return message.reply(`24 Saat Geçmeden Bu Komutu Kullanamazsın`)

      

    } else {

      db.add(`para_${message.author.id}`, lrowsşans)
message.channel.send(`${lrowsşans} Bugünlük Böyle Olsun`);
}
       db.set(`lrowsgünlük_${message.guild.id}`, Date.now());

    }



//lrows
exports.conf = {
  aliases: [],
  permLevel: 0
};
//lrows
exports.help = {
  name: 'günlük-para'
};

//lrows