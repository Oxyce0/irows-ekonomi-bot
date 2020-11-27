const request = require('node-superfetch');//lrows
const crypto = require('crypto');//lrows
const { IMGUR_KEY } = process.env;//lrows
const yes = ['evet'];//lrows
const no = ['hayır']//lrows

const deleteCommandMessages = function (msg, client) { // eslint-disable-line consistent-return
	if (msg.deletable && client.provider.get('global', 'deletecommandmessages', false)) {
	  return msg.delete();
	}
  };//lrows

class Util {
	static wait(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	static shuffle(array) {//lrows
		const arr = array.slice(0);//lrows
		for (let i = arr.length - 1; i >= 0; i--) {//lrows
			const j = Math.floor(Math.random() * (i + 1));//lrows
			const temp = arr[i];//lrows
			arr[i] = arr[j];//lrows
			arr[j] = temp;//lrows
		}//lrows
		return arr;//lrows
	}//lrows
//lrows
	static list(arr, conj = 'and') {
		const len = arr.length;
		return `${arr.slice(0, -1).join(', ')}${len > 1 ? `${len > 2 ? ',' : ''} ${conj} ` : ''}${arr.slice(-1)}`;//lrows
	}

	static shorten(text, maxLen = 2000) {
		return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;//lrows
	}

	static duration(ms) {
		const sec = Math.floor((ms / 1000) % 60).toString();//lrows
		const min = Math.floor((ms / (1000 * 60)) % 60).toString();//lrows
		const hrs = Math.floor(ms / (1000 * 60 * 60)).toString();//lrows
		return `${hrs.padStart(2, '0')}:${min.padStart(2, '0')}:${sec.padStart(2, '0')}`;//lrows
	}

	static randomRange(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;//lrows
	}

	static trimArray(arr, maxLen = 10) {//lrows
		if (arr.length > maxLen) {//lrows
			const len = arr.length - maxLen;//lrows
			arr = arr.slice(0, maxLen);//lrows
			arr.push(`${len} more...`);//lrows
		}
		return arr;
	}
//lrows
	static base64(text, mode = 'encode') {//lrows
		if (mode === 'encode') return Buffer.from(text).toString('base64');//lrows
		if (mode === 'decode') return Buffer.from(text, 'base64').toString('utf8') || null;//lrows
		throw new TypeError(`${mode} is not a supported base64 mode.`);//lrows
	}

	static hash(text, algorithm) {
		return crypto.createHash(algorithm).update(text).digest('hex');//lrows
	}

	static async randomFromImgurAlbum(album) {//lrows
		const { body } = await request//lrows
			.get(`https://api.imgur.com/3/album/${album}`)//lrows
			.set({ Authorization: `Client-ID ${IMGUR_KEY}` });//lrows
		if (!body.data.images.length) return null;//lrows
		return body.data.images[Math.floor(Math.random() * body.data.images.length)].link;//lrows
	}

	static today(timeZone) {//lrows
		const now = new Date();//lrows
		if (timeZone) now.setUTCHours(now.getUTCHours() + timeZone);//lrows
		now.setHours(0);//lrows
		now.setMinutes(0);//lrows
		now.setSeconds(0);//lrows
		now.setMilliseconds(0);//lrows
		return now;//lrows
	}

	static tomorrow(timeZone) {//lrows
		const today = Util.today(timeZone);//lrows
		today.setDate(today.getDate() + 1);//lrows
		return today;//lrows
	}

	static async awaitPlayers(msg, max, min, { text = 'join game', time = 30000 } = {}) {//lrows
		const joined = [];//lrows
		joined.push(msg.author.id);//lrows
		const filter = res => {//lrows
			if (msg.author.bot) return false;
			if (joined.includes(res.author.id)) return false;//lrows
			if (res.content.toLowerCase() !== text.toLowerCase()) return false;//lrows
			joined.push(res.author.id);//lrows
			return true;//lrows
		};//lrows
		const verify = await msg.channel.awaitMessages(filter, { max, time });//lrows
		verify.set(msg.id, msg);//lrows
		if (verify.size < min) return false;//lrows
		return verify.map(message => message.author);//lrows
	}

	static async verify(channel, user, time = 30000) {//lrows
		const filter = res => {//lrows
			const value = res.content.toLowerCase();//lrows
			return res.author.id === user.id && (yes.includes(value) || no.includes(value));//lrows
		};//lrows
		const verify = await channel.awaitMessages(filter, {//lrows
			max: 1,//lrows
			time//lrows
		});//lrows
		if (!verify.size) return 0;//lrows
		const choice = verify.first().content.toLowerCase();//lrows
		if (yes.includes(choice)) return true;//lrows
		if (no.includes(choice)) return false;//lrows
		return false;//lrows
	}//lrows
}//lrows

module.exports = Util;//lrows