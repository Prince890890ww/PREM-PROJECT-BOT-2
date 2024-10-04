module.exports.config = {
	name: "PREM-RANKUP-2",
	version: "3.3.1",
	hasPermssion: 1,
	credits: "PREM BABU",
	description: "THIS BOT IS MADE BY PREM BABU",
	commandCategory: "LEVAL UP",
	dependencies: {
		"fs-extra": ""
	},
	cooldowns: 2,
};

module.exports.handleEvent = async function({ api, event, Currencies, Users, getText }) {
	var {threadID, senderID } = event;
	const { createReadStream } = global.nodemodule["fs-extra"];
  const axios = global.nodemodule["axios"];
  const fs = global.nodemodule["fs-extra"];
  let pathImg = __dirname + "/PREM-BABU/RANKUP/rankup.png";
  
	threadID = String(threadID);
	senderID = String(senderID);

	const thread = global.data.threadData.get(threadID) || {};

	let exp = (await Currencies.getData(senderID)).exp;
	exp = exp += 1;

	if (isNaN(exp)) return;

	if (typeof thread["rankup"] != "undefined" && thread["rankup"] == false) {
		await Currencies.setData(senderID, { exp });
		return;
	};

	const curLevel = Math.floor((Math.sqrt(1 + (4 * exp / 3) + 1) / 2));
	const level = Math.floor((Math.sqrt(1 + (4 * (exp + 1) / 3) + 1) / 2));

	if (level > curLevel && level != 1) {
		var memes = [
"https://i.imgur.com/zoQxUwC.jpg" ,
"https://i.imgur.com/bXVBasN.jpg" ,
"https://i.imgur.com/E3bMZMM.jpg" ,
"https://i.imgur.com/pkchwDe.jpg" ,
"https://i.imgur.com/PFV6etU.jpg" ,
"https://i.imgur.com/DLElS0y.jpg" ,
"https://i.imgur.com/6hufzML.jpg" ,
"https://i.imgur.com/ikevA6M.jpg" ,
"https://i.imgur.com/aGuU2tB.jpg" ,
"https://i.imgur.com/tsUsL6B.jpg" ,
"https://i.imgur.com/sAUL2X0.jpg" ,
"https://i.imgur.com/fGSX9z3.jpg" ,
"https://i.imgur.com/TeT8dXA.jpg" ,
"https://i.imgur.com/kCnHvly.jpg" ,
"https://i.imgur.com/DLElS0y.jpg" ,
"https://i.imgur.com/wfB1cU7.jpg" ,
"https://i.imgur.com/dmUAjtN.jpg" ,
"https://i.imgur.com/RqaTxa4.jpg" ,
"https://i.imgur.com/gXFNJGi.jpg" ,
"https://i.imgur.com/DwDTSsS.jpg" ,
"https://i.imgur.com/BSreuve.jpg"
    ];
    var randomMeme = memes[Math.floor(Math.random() * memes.length)];

    // Download the meme image
    let getMemeImage = (
      await axios.get(`${randomMeme}`, {
        responseType: "arraybuffer",
      })
    ).data;
    fs.writeFileSync(pathImg, Buffer.from(getMemeImage, "utf-8"));

    // Send the meme image
		api.sendMessage({attachment: fs.createReadStream(pathImg)}, event.threadID, () => fs.unlinkSync(pathImg));
	}

	await Currencies.setData(senderID, { exp });
	return;
}

module.exports.languages = {
	"en": {
		"on": "on",
		"off": "off",
		"successText": "success notification rankup!"
	}
}

module.exports.run = async function({ api, event, Threads, getText }) {
	const { threadID, messageID } = event;
	let data = (await Threads.getData(threadID)).data;
  
	if (typeof data["rankup"] == "undefined" || data["rankup"] == false) data["rankup"] = true;
	else data["rankup"] = false;
	
	await Threads.setData(threadID, { data });
	global.data.threadData.set(threadID, data);
	return api.sendMessage(`${(data["rankup"] == true) ? getText("on") : getText("off")} ${getText("successText")}`, threadID, messageID);
}
