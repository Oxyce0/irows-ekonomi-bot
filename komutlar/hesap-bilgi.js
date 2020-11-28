const Discord = require('discord.js');//lrows
const ayarlar = require('../ayarlar.json');//lrows
const db = require('quick.db');//lrows
const ms = require('ms')//lrows
exports.run = async (client, message, args) => {//lrows
  
let lrowskişi = message.mentions.users.first() || message.author//lrows

  let lrowspara = await db.fetch(`para_${lrowskişi.id}`) || 0  
    let lrowsisim = await db.fetch(`hesapisim_${lrowskişi.id}`) || 'Hesap Yok'//lrows

 const lrows = new Discord.MessageEmbed()
 .setDescription(`Kullanıcı : ${lrowskişi} \n Bakiyesi : ${lrowspara} \n Hesap Adı ${lrowsisim}`)//lrows
 return message.channel.send(lrows)//lrows
};
exports.conf = {//lrows
  aliases: [],//lrows
  permLevel: 0//lrows
};
exports.help = {//lrows
  name: 'hesap'//lrows
};//lrows
//lrows