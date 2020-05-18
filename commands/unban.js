module.exports = {
	name: 'unban',
	description: 'Unban a player',
	execute(message, args) {
    let emojit = message.guild.emojis.find('name', 'true');
    let emojif = message.guild.emojis.find('name', 'false');
		const member = args[0];
    
		if (!message.member.roles.find(r => r.id === '696189336793776248')) {
			return message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: 'Bu komutu kullanamazsın.'}}).then(m => {m.delete(20000) & message.react(emojif)});
		}
    
		if (!member) {
			return message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: 'Yasağı kalkacak kişinin ID\'sini yazmalısın.'}}).then(m => {m.delete(20000) & message.react(emojif)});
		}
    
		return message.guild
			.unban(member)
			.then(m => message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: `**${member}**  ID\'li kişinin yasağı kalktı.`}}) & console.log(`${member.user.tag} adlı kişi sunucudan yasaklandı!`) && m.delete(20000) && message.react(emojif))
			.catch();
	},
};