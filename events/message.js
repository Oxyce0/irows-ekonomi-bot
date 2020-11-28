const Discord = require("discord.js");//lrows
const ayarlar = require("../ayarlar.json");//lrows
let talkedRecently = new Set();//lrows
module.exports = message => {//lrows
  if (talkedRecently.has(message.author.id)) {
    return;//lrows
  }//lrows
  talkedRecently.add(message.author.id);//lrows
  setTimeout(() => {//lrows
    talkedRecently.delete(message.author.id);//lrows
  }, 2500);//lrows
  let client = message.client;//lrows
  if (message.author.bot) return;//lrows
  if (!message.content.startsWith(ayarlar.prefix)) return;//lrows
  let command = message.content.split(" ")[0].slice(ayarlar.prefix.length);//lrows
  let params = message.content.split(" ").slice(1);//lrows
  let perms = client.elevation(message);//lrows
  let cmd;//lrows//lrows
  if (client.commands.has(command)) {//lrows
    cmd = client.commands.get(command);//lrows
  } else if (client.aliases.has(command)) {//lrows
    cmd = client.commands.get(client.aliases.get(command));//lrows
  }//lrows
    if (perms < cmd.conf.permLevel) return;//lrows
    cmd.run(client, message, params, perms);//lrows
}; 
//lrows

