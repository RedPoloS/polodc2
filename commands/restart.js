module.exports = {
	name: 'restart',
	description: 'Restart the bot',
	execute(message, args) {
    let emojit = message.guild.emojis.find('name', 'true');
    let emojif = message.guild.emojis.find('name', 'false');
		if (!message.member.hasPermission('ADMINISTRATOR')) {
      message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, author: {name: message.member.user.tag, icon_url: message.member.user.avatarURL}, description: `Bu komutu kullanamazsın.`}}).then(message.react(emojif) && message.delete(20000));
      return;
		}

    var interval = setTimeout (function () {
      process.exit();
    }, 1 * 1000).then(message.delete())
	},
};