module.exports = {
	name: 'say',
	description: 'Gives member count',
	execute(message, args) {
    let emojit = message.guild.emojis.find('name', 'true');
    let emojif = message.guild.emojis.find('name', 'false');
    if (message.channel.id != '696189349649317968' && !message.member.roles.find(r => r.id === '696189337393692773')) { message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: `Lütfen **#komut** kanalına yazınız.` }}).then( m => {m.delete(20000) && message.react(emojif) && message.delete(20000)}); return }
    let membersWithRole = message.guild.roles.get('696189338383417375').members;
    let membersWithRole2 = message.guild.roles.get('696189339352170586').members;
    let membersWithRole3 = message.guild.roles.get('482452528081141760').members;
    message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: `Sunucuda toplam **${membersWithRole.size}** kayıtlı üye, **${membersWithRole2.size}** kayıtsız üye, toplamda **${membersWithRole3.size}** kişi var.` }}).then(message.react(emojit) && message.delete(20000));
	},
};