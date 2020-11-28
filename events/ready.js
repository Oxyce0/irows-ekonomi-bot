const chalk = require('chalk')//lrows
const moment = require('moment')//lrows
const Discord = require('discord.js')//lrows
const ayarlar = require('../ayarlar.json')//lrows
//lrows
var prefix= ayarlar.prefix;
//lrows
module.exports = client => {//lrows
  console.log(`${client.guilds.size} Tam tamına bu kadar sunucuya hizmet veriyorum`);//lrows
  client.user.setStatus("online");//lrows
  client.user.setActivity("Lrows Ekonomi V12", { type: "LISTENING" });//lrows
  

  
};//lrows