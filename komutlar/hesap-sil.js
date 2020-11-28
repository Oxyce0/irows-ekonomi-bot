const Discord = require('discord.js')//lrows
const db = require('quick.db');//lrows
const { randomRange, verify } = require('../util/Util.js');//lrows

exports.run = async (client, message, args) => {//lrows
  const lrows = message.author
  const lrowsbakiye = await db.fetch(`para_${message.author.id}`);//lrows
 
  let lrowskontrol = await db.fetch(`hesapisim_${message.author.id}`);//lrows

  
  if (!lrowskontrol) return message.channel.send('Açık bir hesabın bulunmamakta') //lrows

 
  message.channel.send(`Bu işlem geri alınamaz emin misin?`)//lrows
    const verification = await verify(message.channel, lrows);//lrows
                if (!verification) {//lrows
                    this.fighting.delete(message.channel.id);//lrows
                    return message.channel.send(`Kabul Etmediğin İçin ${lrows} İşlem İptal Oldu!`);//lrows
                }
              db.delete(`para_${message.author.id}`)//lrows
  db.delete(`hesapdurum-${message.author.id}`)//lrows
  db.delete(`hesapisim_${message.author.id}`)//lrows
  message.channel.send(`Hesabın Silindi`)//lrows
}//lrows

exports.conf = {//lrows
    enabled: false,//lrows
    guildOnly: true,//lrows
    aliases: [],//lrows
    permLevel: 0//lrows
}//lrows

exports.help = {//lrows
    name: 'hesabımı-sil'//lrows
}//lrows