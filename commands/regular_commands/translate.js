const Discord = require('discord.js');
const translate = require('@k3rn31p4nic/google-translate-api');

module.exports.run = async (bot, message, args) => {
    if(args[0] === "help") {
        message.channel.send("```Usage: !=translate <message>```");
        return;
    }
    let joinedArgs = args.join(' ');
    translate(joinedArgs, { to: 'en' }).then(res => {
        let langEmbed = new Discord.RichEmbed()
        .setDescription('Translation')
        .setColor('#FFFFFF')
        .addField('Translated to English:', res.text)
        .addField('Translated from:', res.from.language.iso);

        message.channel.send(langEmbed);
    }).catch(err => {
        console.error(err);
    });
}

module.exports.help = {
    name : 'translate'
}