const { Server } = require('../settings/databaseImport');

module.exports = (bot, guild) => {
  Server.findOneAndUpdate(
    { serverID: guild.id },
    {
      serverID: guild.id,
      serverName: guild.name,
      modID: null,
      logger: {
        isLoggerEnabled: false,
        loggerChannelID: null,
        leaveQueueLimit: 0,
      },
      isAntiWeebEnabled: false,
      isWelcomeEnabled: false,
      banPhrases: [],
    },
    {
      upsert: true,
      new: true,
      useFindAndModify: false,
      setDefaultsOnInsert: true,
    },
    (err, result) => {
      if (err) return console.log(`Something went wrong: ${err}`);
      if (result) {
        return console.log(`Bot joined on server ${guild.name}! ID: ${guild.id}`);
      }
    },
  );
};
