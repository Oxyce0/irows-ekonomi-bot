const Discord = require('discord.js')

exports.run = async(client, message) => {
  
    const y = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .addField(':money_with_wings:','`!günlük-para : Günlük Para [24 Saat İçinde Bir Defa Kullanılabilir]`')
    .addField(':white_check_mark:','`!hesap-aç : Banka Hesap Açar [+30 Lira Verir] `')
    .addField(':negative_squared_cross_mark:','`!hesabımı-sil : Banka Hesabınızı Siler`')
    .addField(':atm:','`!hesap : Banka hesap bilgilerinizi gösterir`')
    .addField(':money_with_wings:','`!para-gönder : İstediğiniz Kişiye Para Gönderirsiniz`')
    .addField(':moneybag:','`!para : Banka bakiye bilginizi gösterir`')
    .addField(':shopping_cart:','`!market : Markettekileri gösterir!`')
    .addField(':robot:','`!istatistik : Botunuzun İstatistiklerini Gösterir`')
    .setFooter(`${client.user.username}`, client.user.avatarURL)
    return message.channel.send(y)
};
exports.conf = {
 enabled: true,
 guildOnly: false,
  aliases: ['y'],
 permLevel: 0
};

exports.help = {
 name: 'yardım'
};