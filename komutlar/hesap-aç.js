const Discord = require("discord.js");//lrows
const db = require("quick.db");
//lrows

exports.run =  async (client, message, args) =>  { //lrows
const  lrowshesap =  await db.fetch(`hesap-${message.guild.id}`)//lrows
  const lrowshesapdurumu = await db.fetch(`hesapdurum-${message.guild.id}`)//lrows
  const lrowshesapisim = await db.fetch(`hesapisim_${message.guild.id}`);//lrows
  let lrowskontrol = await db.fetch(`hesapisim_${message.author.id}`);//lrows

  
  if (lrowskontrol) return message.channel.send('Hesabın bulunmakta!') //lrows

let lrowsisim = args.slice(0).join(' ')//lrows

  if(!lrowsisim) return message.channel.send("Bir İsim Gir")//lrows

db.set(`lrowshesap-${message.author.id}`,"İşlem başarılı hesabın oluşturuldu!")//lrows
  db.set(`lrowshesapisim_${message.author.id}`,lrowsisim)//lrows
  db.add(`lrowspara_${message.author.id}`, 30)//lrows
  if(!lrowshesap) return message.channel.send("Hesabın başarılı bir şekilde kuruldu bizi tercih ettiğiniz için 30TL hesabınıza yatırdık") //lrows
  
}
exports.conf = {//lrows
  aliases: [],//lrows
  permLevel: 0,//lrows
};//lrows

exports.help = {//lrows
  name: "hesap-aç"//lrows
};