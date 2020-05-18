const client = require('discord.js');
module.exports = {
	name: 'ban',
	description: 'Ban a player',
	execute(message, args) {
    let emojit = message.guild.emojis.find('name', "true");
    let emojif = message.guild.emojis.find('name', "false");
		const member = message.mentions.members.first() || message.guild.members.get(args[0]);

		if (!message.member.roles.find(r => r.id === '696189336793776248')) {
			return message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: 'Bu komutu kullanamazsın.'}}).then(m => {m.delete(20000) && message.react(emojif) && message.delete(20000)});
		}
    
		if (!member) {
			return message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: 'Yasaklayacağın kişiyi etiketlemelisin veya ID\'sini yazmalısın.'}}).then(m => {m.delete(20000) && message.react(emojif) && message.delete(20000)});
		}

    if (member === message.author) {
      return message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: 'Kendini yasaklayamazsın.'}}).then(m => {m.delete(20000) && message.react(emojif) && message.delete(20000)});
    }
    
    if (!member.bannable) {
      return message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: 'Bu kişiyi yasaklayamam.'}}).then(m => {m.delete(20000) && message.react(emojif) && message.delete(20000)});
    }
    
		return member
			.ban()
			.then(() => message.react(emojit) && message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: `**${member.user.tag}** adlı kişi yasaklandı.`}}) & console.log(`${member.user.tag} adlı kişi sunucudan yasaklandı!`))
			.catch(error => message.reply('> Üzgünüm, bir hata oluştu.'));
	},
};