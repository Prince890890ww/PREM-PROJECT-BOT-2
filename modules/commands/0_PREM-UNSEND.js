module.exports.config = {
	name: "unsend",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "PREM BABU",
	description: "THIS BOT WAS MADE BY MR PREM BABU",
	commandCategory: "BOT MESSAGE DELET",
	usages: "PREFIX",
	cooldowns: 0
};

module.exports.languages = {
	"en": {
		"returnCant": "किसी और का मैसेज मैं कैसे डिलीट करूं 😐✌️",
		"missingReaction": "कृपया उस मैसेज पर सही इमोजी से रिएक्ट करें जिसे आप डिलीट करना चाहते हैं 😐✌️"
	}
}

module.exports.run = function({ api, event, getText }) {
	const targetReactions = ["❤️", "👍", "😆"]; // सेट किए गए इमोजी

	api.listen(() => {
		api.getThreadInfo(event.threadID, (err, info) => {
			const message = info.messages.find(msg => msg.messageID === event.messageReply.messageID);
			if (message && event.type === "message_reaction" && targetReactions.includes(event.reaction)) {
				api.unsendMessage(event.messageReply.messageID);
				api.sendMessage("मैसेज डिलीट कर दिया गया!", event.threadID, event.messageID);
			}
		});
	});

	if (event.messageReply.senderID != api.getCurrentUserID()) return api.sendMessage(getText("returnCant"), event.threadID, event.messageID);
	if (event.type !== "message_reply") return api.sendMessage(getText("missingReaction"), event.threadID, event.messageID);
};
