module.exports = {
	name: 'jail',
	description: 'Puts someone in to a jail room',
	execute(message, args) {
    let emojit = message.guild.emojis.find('name', "true");
    let emojif = message.guild.emojis.find('name', "false");
		const member = message.mentions.members.first() || message.guild.members.get(args[0]);
    const time = args[1] || 60

		if (!message.member.roles.find(r => r.id === '696189337393692773')) {
			return message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: 'Bu komutu kullanamazsın.', author: {name: message.member.user.tag, icon_url: message.member.user.avatarURL}}}).then( m => {m.delete(20000) && message.react(emojif) && message.delete(20000)});
		}

		if (!member) {
			return message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: 'Hapise atacağın kişiyi etiketlemelisin veya ID\'sini yazmalısın.', author: {name: message.member.user.tag, icon_url: message.member.user.avatarURL}}}).then( m => {m.delete(20000) && message.react(emojif) && message.delete(20000)});
		}

    if (member.hasPermission('ADMINISTRATOR') || member.roles.find(r => r.id === '696189337393692773')) {
      return message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: 'Bu kişiyi hapise atamam.', author: {name: message.member.user.tag, icon_url: message.member.user.avatarURL}}}).then( m => {m.delete(20000) && message.react(emojif) && message.delete(20000)});
    }
    
    var interval = setTimeout (function () {
      message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: `${member} adlı kişi hapisten çıktı.`, author: {name: message.member.user.tag, icon_url: message.member.user.avatarURL}}});
      member.removeRole('696189338073038858');
      console.log(`${member} adlı kişi hapisten çıkarıldı.`);
    }, time * 1000)
    
    return member.addRole('696189338073038858').then(message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: `${member} adlı kişi **${time}** saniye hapise atıldı.`, author: {name: message.member.user.tag, icon_url: message.member.user.avatarURL}}}) && console.log(`${member} adlı kişi ${time} saniye hapise atıldı.`) && message.react(emojit));
	},
};