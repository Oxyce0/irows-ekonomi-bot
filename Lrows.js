const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const YouTube = require("simple-youtube-api");
const queue = new Map();
const ffmpeg = require("ffmpeg"); 
const express = require("express");

const ytdl = require("ytdl-core");
const db = require('quick.db');
const http = require('http');

require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');



const app = express();//lrows
var prefix = ayarlar.prefix;//lrows
//lrows
const log = message => {
    console.log(`${message}`);//lrows
};
//lrows
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {//lrows
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});



//lrows
client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];//lrows
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);//lrows
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);//lrows
            });
            client.commands.set(command, cmd);//lrows
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);//lrows
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};
//lrows
client.load = command => {
    return new Promise((resolve, reject) => {//lrows
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);//lrows
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};//lrows




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {//lrows
            delete require.cache[require.resolve(`./komutlar/${command}`)];//lrows
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });//lrows
            resolve();
        } catch (e) {//lrows
            reject(e);
        }
    });
};//lrows

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;//lrows
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;//lrows
    if (message.author.id === ayarlar.sahip) permlvl = 4;//lrows
    return permlvl;
};//lrows

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });lrows

client.on('warn', e => {//lrows
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});//lrows

client.on('error', e => {//lrows
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});//lrows

client.login(ayarlar.token);






