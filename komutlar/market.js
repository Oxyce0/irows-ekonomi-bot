const Discord = require('discord.js')
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  if (!args[0]) return message.reply(`Mevcut Markettekiler : `)
  
  if (args[0] === 'sa') {
    let lrowspara = await db.get(`para_${message.author.id}`) 
    let lrowsfiyat = 100 
    
    if (lrowspara < lrowsfiyat) return message.reply('Yetersiz Bakiye')
    
    db.set(`ìştebişiler_${message.author.id}`, "Aktif")
    db.add(`para_${message.author.id}`, -lrowsfiyat)
    
    return message.reply(`Ürün başarıyla satın alındı!`)
  }


  
}
exports.conf = {
  
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: 'market'
}