module.exports = {
	name: 'write',
	description: 'Write anything with bot!',
	execute(message, args) {
    let emojit = message.guild.emojis.find('name', 'true');
    let emojif = message.guild.emojis.find('name', 'false');
    let arg = args.slice(0).join(' ');
		if (!message.member.hasPermission('ADMINISTRATOR')) {
      message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, author: {name: message.member.user.tag, icon_url: message.member.user.avatarURL}, description: `Bu komutu kullanamazsın.`}}).then(m => {m.delete(20000) && message.react(emojif) && message.delete()});
      return;
		}
    
    if (!arg) { message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, author: {name: message.member.user.tag, icon_url: message.member.user.avatarURL}, description: `Bir argüman girmelisin.`}}).then(m => {m.delete(20000) && message.delete()}); return; }
    
    message.channel.send(`> ${arg}`).then(message.delete());
  },
};