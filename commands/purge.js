module.exports = {
	name: 'purge',
	description: 'Delete bulk message',
	execute(message, args) {
    let emojit = message.guild.emojis.find('name', 'true');
    let emojif = message.guild.emojis.find('name', 'false');
		if (!message.member.hasPermission('ADMINISTRATOR')) {
			return message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: 'Bu komutu kullanamazsın.'}}).then(m => {m.delete(20000) && message.react(emojif) && message.delete(20000)});
		}
    
    if(args > 100) {
      message.channel.bulkDelete(100);
      return message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: `**100** mesaj silindi.` }}).then(m => m.delete(20000) && message.delete(20000));
    }
    
    if(!args[0]) {
      return message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: `Bir miktar girmelisin` }}).then(m => m.delete(20000) && message.react(emojif) && message.delete(20000));
    }
    
    message.channel.bulkDelete(args[0]);
    message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: `**${args[0]}** mesaj silindi.` }}).then(m => m.delete(20000) && message.delete(20000));
	},
};