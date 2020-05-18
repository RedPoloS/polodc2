const fs = require('fs')
const Discord = require('discord.js');
const Client = require('./client/Client');
const express = require('express');
const http = require('http');
const {
	prefix,
	token,
} = require('./config.json');
const invites = {};
const wait = require('util').promisify(setTimeout);

const client = new Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

console.log(client.commands);

client.on('ready', () => {
	console.log(`The BOT is ready with ${client.guilds.size} server, ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} members!`);
  client.user.setActivity('Whiskeryi gözetliyor.', { type: 'WATCHING' });

  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on('guildMemberAdd', member => {
  member.addRole('696189339352170586');
  member.guild.fetchInvites().then(guildInvites => {
    const ei = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter = client.users.get(invite.inviter.id);
    const logChannel = member.guild.channels.find(channel => channel.id === "697492498104188929");
		logChannel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, author: {name: inviter.username, icon_url: inviter.avatarURL}, description: `**Katılan:** ${member.user}(${member.user.id}),\n**Davet eden:** ${inviter}(${inviter.id}).`, footer: {text: `Davet oluşturulduğundan beri ${invite.uses} kez kullanıldı.`}}});
  });
});

client.on('guildMemberUpdate', (oldr, newr) => {
  const channel = newr.guild.channels.get('696189350613876746');
  let membersWithRole = newr.guild.roles.get('696189338383417375').members;
  let membersWithRole2 = newr.guild.roles.get('696189339352170586').members;
  let membersWithRole3 = newr.guild.roles.get('482452528081141760').members;
  channel.setTopic(`<a:green_flame:696195394031452170> Sunucuda toplam **${membersWithRole.size}** kayıtlı üye, **${membersWithRole2.size}** kayıtsız üye, toplamda **${membersWithRole3.size}** kişi var.`);
});

client.on('message', async message => {
    if (message.channel.type == 'dm' && (message.author.id != client.user.id)) {
    message.channel.send('> Dostum ben bir botum, henüz sohbet etmeye programlanmadım.');
    return;
  }
  const arr = ['moongaming', 'sikimle', 's1k1s', "s1k1ş", "s1k3r", "sik3rl3r", "sik3r", "s1k3erl3r", "s1k3erler", "p1ç", "0rosbucocu", "orospucocu", "orospuçocu", "orospuçocuğu", "0rospuçocuğu", "y4rrağ1m", "y4rrağım", "y4rram", 'moongnaming', 'moon gaming', 'moon gnaming', 'moonn gaming', 'moonngaming', 'moongagming', 'narkozrp', 'narkoz roleplay', 'narkoz rp', 'n4rk0z rp', 'n4rk0z roleplay', 'nark0z roleplay', 'narkoz rol3play', 'moonrp', 'moon roleplay', 'moon rp', 'moongaaming', 'm00ngaming', 'm00ng4m1ng', 'm00ng4ming', 'mo0ngam1ng', 'mo0ngaming', 'mooongaming', 'mooon gaming', 'm000n gaming', 'm00n gaming', 'moo0n gaming', 'muungaming', 'muongaming', 'muon gaming', 'moongaming', 'siktik', 'sikik', 's1kt1m', 'sikt1m', 's1ktim', 's1kcem', 'sikc3m', 's1kik', 'yarrraklarım', 'yarraklar', 'yarraklarım', 'orospu çocuğu', 'çocuğunu sikieyim', 'sikieyim', 'sik3yim', 'sik3c3m', 'sikec3m', 'sikecem', 'siksem', 's1ksem', 'sikersem', 's1k1k', 's1ktin', '0r0spu', '0rospu', 'or0spu', 'orr0spu', 'orrospuu', '0rrospuuuu', 'orospunun', 'orospuya', 'orospucuk', 'sikişler', 'yarraklar', 'yarrak', 'amcık', 'amını', 'seni karım yapıcam', 'annenle ilişkiye giricem', 'piçin evladı', 'annen yanımda', 'anan yanımda', 'amına', 'sikerim', 'orospu', 'orrospu', 'amından', 'amcığından', 'orospunun', 'orrrospu', 'yarrağımı', 'yarrakımı', 'sikiş', 'sikişken', 'sikicem', 'sikerim', 'siktim', 'sikiyorum', 'sikişteyim', 'sikişcez', 'sikişçez', 'sikişicez', 'sikişiçez', 'sikmekteyim', '4mcık', '4mına', '4m1nızı', 'amındayım', 'yarrağını', 'yarrağına', 'yarrağın', 'yarrağım', 'yarram', 'piç', 'göt', 'götveren'];

  for (let i = 0; i < arr.length; i++) {
    const elem = arr[i];
    if (message.content.includes(elem)) {
      message.channel.send(`> **${message.member.user.tag}**, lütfen ağzımızı bozmayalım.`).then(msg => {msg.delete(5000) & message.delete()});
      return;
    }
  }
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName);
	if (message.author.bot) return;
  
  if (message.isMemberMentioned(client.user)) {
    let emojit = message.guild.emojis.find('name', 'true');
    let emojif = message.guild.emojis.find('name', 'false');
    if (message.channel.id == '697961988172546129') return;
    if (message.channel.id != '696189354309058602' && !message.member.roles.find(r => r.id === '696189337393692773')) { message.react(emojif); return; }
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

        message.channel.send(embed).then(message.react(emojit))
  }
  
	if (!message.content.startsWith(prefix)) return;
  
  /*if (message.content === '!ping') {
    let emojit = message.guild.emojis.find('name', "true");
    let emojif = message.guild.emojis.find('name', "false");
    if (message.channel.id != '696189354309058602' && !message.member.roles.find(r => r.id === '696189337393692773')) { message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: `Lütfen **#komut** kanalına yazınız.` }}).then( m => {m.delete(10000) && message.react(emojif) && message.delete(10000)}); return }
    let botMsg = await message.channel.send('🏓')
    message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, title: '🏓 Pong!', author: {name: message.member.user.tag, icon_url: message.member.user.avatarURL}, description: ['**API: **' + client.ping + 'ms', '**Sunucu: **' + (botMsg.createdAt - message.createdAt) + 'ms' ].join("\n") }}).then(message.react(emojit));
  }*/
  
	try {
		command.execute(message, args);
	} catch (error) {
    return;
	}
});
  
client.on('message', (message) => {
  let emojit = message.guild.emojis.find('name', 'true');
  let emojif = message.guild.emojis.find('name', 'false');
  let channelmember = message.member;
  let role2 = message.guild.roles.get('696189339352170586');
	if(message.content.startsWith('!private')) {
		if (message.member.voiceChannel) {
			if(!message.member) return;
      if (message.channel.id != '696189354309058602' && !message.member.roles.find(r => r.id === '696189337393692773') ) {
        message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: `Lütfen **#komut** kanalına yazınız.` }}).then( m => {m.delete(5000) && message.react(emojif) && message.delete(5000)});
        return;
      }
			if(message.member.voiceChannel.parentID === '696189346054668320') {
        message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, author: {name: message.member.user.username, icon_url: message.member.user.avatarURL}, description: 'Zaten bir özel kanaldasın.'}}).then(message.react(emojif));
        return;
      };
			message.guild.createChannel(
				`Özel Oda (${message.member.displayName})`,
				'voice'
			)
				.catch(error => console.log(error))
				.then(channel=>{
					message.member.setVoiceChannel(channel.id)
					channel.setParent('696189346054668320')
					channel.edit({ userLimit: 3 })
          channel.overwritePermissions(role2, {
                'VIEW_CHANNEL':false,
          })
          channel.overwritePermissions(channelmember, {
                'VIEW_CHANNEL':true,'CONNECT':true,
          })
						.catch(error => console.log(error))
						.finally(function() {
							channel.setPosition(message.guild.channels.get('696189346054668320').children.size)
								.catch(error => console.log(error))
								.finally(function(){
									message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, author: {name: message.member.user.username, icon_url: message.member.user.avatarURL}, description: 'Geçici özel odanız oluşturuldu.', footer: {text: '!limit<sayı> ile odanın limitini değiştirebilirsiniz.'}}});
							    message.react(emojit);
              });
						});
				});
		} else {
			message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, author: {name: message.member.user.username, icon_url: message.member.user.avatarURL}, description: 'Herhangi bir sesli kanalda bulunmalısınız.'}});
		  message.react(emojif);
    }
	}

	if(message.content.startsWith('!limit')) {
		if(!message.member.voiceChannel) return;
		if (message.member.voiceChannel.parentID != '696189346054668320') {
      message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: `Bir özel kanalda olmalısın.` }}).then( m => {m.delete(20000) && message.react(emojif) && message.delete(20000)});
      return;
    }
    if (message.channel.id != '696189354309058602' && !message.member.roles.find(r => r.id === '696189337393692773') ) {
      message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, description: `Lütfen **#komut** kanalına yazınız.` }}).then( m => {m.delete(20000) && message.react(emojif) && message.delete(20000)});
      return;
    }
    const argumentsl = message.content.slice(7).split(/ +/);
		const channel = message.member.voiceChannel;
    console.log(channel.permissionsFor(message.member));
    if (channel.permissionsFor(message.member) != ('133692993' || '2146959359')) {
      message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, author: {name: message.member.user.username, icon_url: message.member.user.avatarURL}, description: 'Odanın sahibi değilsiniz.'}}).then(message.react(emojif)); return;
    }
		if (!argumentsl[0] || (typeof parseFloat(argumentsl[0]) != 'number')) {message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, author: {name: message.member.user.username, icon_url: message.member.user.avatarURL}, description: 'Bir miktar belirtmeniz gerekiyor.'}}).then(message.react(emojif)); return; };
		if (message.member.voiceChannel && (message.member.voiceChannel.parentID === '696189346054668320')) {
			channel.edit({ userLimit: argumentsl[0] });
			message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, author: {name: message.member.user.username, icon_url: message.member.user.avatarURL}, description: 'Başarıyla odanın limiti **' + argumentsl[0] + '** yapıldı.'}});
		  message.react(emojit)
    } else {
			message.channel.send({embed: {color: Math.floor(Math.random() * 16777214) + 1, author: {name: message.member.user.username, icon_url: message.member.user.avatarURL}, description: 'Bir özel kanalda bulunmanız gerekiyor.'}});
      message.react(emojif);
		}
	};
});

client.on('voiceStateUpdate', (oldState, newState) => {
	if(!oldState.voiceChannel) return;
	if (oldState.voiceChannel.parentID != '696189346054668320') return;
	deleteEmptyChannelAfterDelay(oldState.voiceChannel);
});

function deleteEmptyChannelAfterDelay(voiceChannel, delayMS = 1000){
	if(!voiceChannel) return;
	if(voiceChannel.members.first()) return;
	setTimeout(function(){
		if(!voiceChannel) return;
		if(voiceChannel.members.first()) return;
		voiceChannel.delete()
			.catch(error => console.log(error));
	}, delayMS);
}

client.login(token);