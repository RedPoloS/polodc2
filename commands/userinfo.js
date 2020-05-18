module.exports = {
	name: 'userinfo',
	description: 'Get information about a user.',
	execute(message, args) {
    let emojit = message.guild.emojis.find('name', 'true');
    let emojif = message.guild.emojis.find('name', 'false');
    if (message.channel.id != '696189354309058602' && !message.member.roles.find(r => r.id === '696189337393692773')) { message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: `Lütfen **#komut** kanalına yazınız.` }}).then( m => {m.delete(20000) && message.react(emojif) && message.delete(20000)}); return }
    const discord = require('discord.js');
    const userMention = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;

    let userinfo = {};
    userinfo.createdat = userMention.user.createdAt;
    userinfo.discrim = userMention.user.discriminator;
    userinfo.id = userMention.user.id;
    userinfo.tag = userMention.user.tag;
    userinfo.uname = userMention.user.username;
    userinfo.avatar = userMention.user.avatarURL;

    var embed = new discord.RichEmbed()
        .setAuthor(userinfo.uname, userinfo.avatar)
        .addField('Açılış Zamanı', userinfo.createdat, true)
        .addField('Diskriminatör', userinfo.discrim, true)
        .addField('ID', userinfo.id, true)
        .addField('İsim#Tag', userinfo.tag, true)
        .setColor('RANDOM')
        .setTitle('Bu hesabın bilgileri')
        .setThumbnail(userinfo.avatar)


        message.channel.send(embed).then(message.delete(20000) && message.react(emojit));
	},
};