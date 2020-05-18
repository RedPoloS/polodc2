module.exports = {
	name: 'avatar',
	description: 'Get targeted user\'s avatar or message author\'s.',
	execute(message, args) {
    let emojit = message.guild.emojis.find('name', 'true');
    let emojif = message.guild.emojis.find('name', 'false');
    if (message.channel.id != '696189354309058602' && !message.member.roles.find(r => r.id === '696189337393692773')) { message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: `Lütfen **#komut** kanalına yazınız.` }}).then( m => {m.delete(20000) && message.react(emojif) && message.delete(20000)}); return }
    const discord = require('discord.js');
    const usrxd = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;

    var embed = new discord.RichEmbed()
        .setAuthor(usrxd.user.username, usrxd.user.avatarURL)
        .setImage(usrxd.user.avatarURL)

        message.channel.send(embed).then(message.delete(10000) && message.react(emojit));
	},
};