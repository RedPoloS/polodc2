module.exports = {
	name: 'regsil',
	description: 'Takes someone\'s member role',
	execute(message, args) {
    let emojit = message.guild.emojis.find('name', 'true');
    let emojif = message.guild.emojis.find('name', 'false');
    const member = message.mentions.members.first() || message.guild.members.get(args[0]);

		if (!message.member.roles.find(r => r.id === '696189337393692773')) {
			return message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: 'Bu komutu kullanamazsın.', author: {name: message.member.user.tag, icon_url: message.member.user.avatarURL}}}).then(m => {m.delete(20000) && message.react(emojif) && message.delete(20000)});
		}

		if (!member) {
			return message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: 'Kayıtı silinecek kişiyi etiketlemelisin veya ID\'sini yazmalısın.', author: {name: message.member.user.tag, icon_url: message.member.user.avatarURL}}}).then(m => {m.delete(20000) && message.react(emojif) && message.delete(20000)});
		}
    
    if (!member.roles.find(r => r.id === '696189338383417375')) {
			return message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: 'Bu kişi kayıtlı değil.', author: {name: message.member.user.tag, icon_url: message.member.user.avatarURL}}}).then(m => {m.delete(20000) && message.react(emojif) && message.delete(20000)});
    }

    member.removeRole('696189338383417375').then(message.react(emojit) && message.delete(20000) && message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: `${member} adlı kişinin kayıtı silindi.`, author: {name: message.member.user.tag, icon_url: message.member.user.avatarURL}}}) & console.log(`${member} adlı kişinin kayıtı silindi.`));
	  member.addRole('696189339352170586');
  },
};