module.exports = {
	name: 'staff',
	description: 'Gives staff count',
	execute(message, args) {
    let emojit = message.guild.emojis.find('name', 'true');
    let emojif = message.guild.emojis.find('name', 'false');
    if (message.channel.id != '696189354309058602' && !message.member.roles.find(r => r.id === '696189337393692773') ) { message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: `Lütfen **#komut** kanalına yazınız.` }}).then( m => {m.delete(20000) && message.react(emojif) && message.delete(20000)}); } return
    let membersWithRole = message.guild.roles.get('696189337393692773').members;
    message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: `Sunucuda toplam **${membersWithRole.size}** yetkili var.` }}).then(m => m.delete(20000) && message.react(emojit) && message.delete(20000));
	},
};