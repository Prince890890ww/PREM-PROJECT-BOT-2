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
      "https://i.imgur.com/funny1.jpeg",
      "https://i.imgur.com/funny2.jpeg",
      "https://i.imgur.com/funny3.jpeg",
      "https://i.imgur.com/funny4.jpeg",
      "https://i.imgur.com/funny5.jpeg",
      "https://i.imgur.com/funny6.jpeg",
      "https://i.imgur.com/funny7.jpeg",
      "https://i.imgur.com/funny8.jpeg",
      "https://i.imgur.com/funny9.jpeg",
      "https://i.imgur.com/funny10.jpeg"
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
