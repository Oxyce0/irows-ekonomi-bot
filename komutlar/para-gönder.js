const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
const ms = require('ms')
exports.run = async (client, message, args) => {
let lrowskişi = message.mentions.members.first() 
if (!lrowskişi) return message.reply('Kişi Belirt')
  let lrowsparası = await db.fetch(`lrowspara_${lrowskişi.id}`) 
  let lrowshesap =  await db.fetch(`lrowshesap-${message.guild.id}`)
  
  if (lrowskişi.bot) return message.reply('Botlara para gönderemezsin')
    if (lrowskişi.id === message.author.id) return message.reply('Kendine para gönderemezsin')

let lrowsparagönderme = args.slice(1).join(' ')

if (!lrowsparagönderme) return message.reply('Miktar Belirt')
  if (isNaN(lrowsparagönderme)) return message.reply('Sadece sayı kullanabilirsin')
  
  if (lrowsparası < lrowsparagönderme) return message.reply('Yetersiz Bakiye.')

  
  db.add(`lrowspara_${lrowskişi.id}`, lrowsparagönderme)
  db.add(`lrowspara_${message.author.id}`, -lrowsparagönderme)
  return message.reply(`${lrowskişi} Adlı Kullanıcıya ${lrowsparagönderme} Para transfer edildi ${lrowsparagönderme} Bakiyenden düşüldü.`)
  
};
exports.conf = {
  aliases: [],
  permLevel: 0
};
exports.help = {

  name: 'para-gönder'
};
