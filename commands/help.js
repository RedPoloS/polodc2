module.exports = {
	name: 'help',
	description: 'Get information about commands.',
	execute(message) {
    let emojit = message.guild.emojis.find('name', 'true');
    let emojif = message.guild.emojis.find('name', 'false');
    if (message.channel.id != '696189354309058602' && !message.member.roles.find(r => r.id === '696189337393692773')) { message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: `Lütfen **#komut** kanalına yazınız.` }}).then( m => {m.delete(20000) && message.react(emojif) && message.delete(20000)}); return }
    const discord = require('discord.js');
    const user = message.author;

    var embed = new discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .addField('!help', 'Mevcut olan tüm komutları gösterir.', true)
        .addField('!ban<etiket, id>', '[!] Belirtilen kişiyi yasaklar.', true)
        .addField('!jail<etiket, id>', '[!] Belirtilen kişiyi Discord\'da hapise atar.', true)
        .addField('!reg<etiket, id>', '[!] Belirtilen kişiyi kayıt eder.', true)
        .addField('!regsil<etiket, id>', '[!] Belirtilen kişinin kayıtını siler.', true)
        .addField('!restart', '[!] BOT\'u yeniden başlatır.', true)
        .addField('!say', 'Discord sunucusundaki kişi sayısını gösterir.', true)
        .addField('!staff', 'Yetkili sayısını gösterir.', true)
        .addField('!write<yazı>', '[!] BOT aracılığıyla yazı yazdırır.', true)
        .addField('!userinfo<etiket, id>', 'Belirtilen kişinin bilgilerini, belirtilmezse sizin bilgilerinizi gösterir.', true)
        .addField('!purge<miktar>', '[!] Belirtilen miktarda olacak şekilde son mesajları siler.', true)
        .addField('!private', 'Sesli kanaldayken yazıldığında size ait özel bir oda oluşturur.', true)
        .addField('!limit<sayı>', 'Bulunduğunuz özel kanalın limitini belirttiğiniz gibi yapar.', true)
        .setFooter('[!] işaretli olanlar özel komutlardır, herkes tarafından kullanılamaz.')
        .setColor('RANDOM')
        .setTitle('Komutlar')

        message.channel.send(embed);
	},
};