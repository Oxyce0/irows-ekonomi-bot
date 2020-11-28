const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
const ms = require('ms')
exports.run = async (client, message, args) => {
let lrowskişi = message.mentions.users.first() || message.author

let lrowspara = await db.fetch(`lrowspara_${lrowskişi.id}`) || 0  
  
  message.channel.send(`${lrowspara}`)
};
exports.conf = {
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'para'
};

