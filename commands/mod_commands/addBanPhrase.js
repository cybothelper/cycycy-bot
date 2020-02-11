const { Server } = require('../../settings/databaseImport');

module.exports.run = async (bot, message, args, NaM) => {
  if (args[0] === 'help') {
    message.channel.send('```Usage: $addbanphrase <word>```');
    return;
  }

  Server.findOne({ serverID: message.guild.id }).then((res) => {
    if (res) {
      const serverRole = message.guild.roles.get(res.modID);
      if (!serverRole) return message.channel.send(`You haven't set a mod in this server ${NaM}. To set a mod in this server do $setmod help.`);
      if ((serverRole && res.modID === serverRole.id && message.member.roles.has(serverRole.id)) || message.member.hasPermission('ADMINISTRATOR')) {
        const bp = args.join(' ');
        if (!bp) return message.reply(`Please add a word to be banned ${NaM}`);

        if (res.banPhrases.includes(bp.toLowerCase())) {
          return message.reply('Banphrase already exists');
        }
        return Server.updateOne(
          { serverID: message.guild.id },
          {
            $push:
            { banPhrases: bp.toLowerCase() },
          },
        )
          .then(() => {
            message.channel.send(`Banphrase has been added ${NaM}`);
          })
          .catch(console.log);
      }
      return message.reply(`You don't have permission for this command ${NaM}`);
    }
    return message.reply(`You haven't set a mod in this server ${NaM}. To set a mod in this server do $setmod help.`);
  }).catch(console.log);
};

module.exports.help = {
  name: 'addbanphrase',
};
