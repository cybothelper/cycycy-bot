const mongoose = require('mongoose');

const serverSchema = mongoose.Schema({
  serverID: String,
  serverName: String,
  modID: String,
  logger: {
    isLoggerEnabled: Boolean,
    loggerChannelID: String,
    leaveQueueLimit: Number,
  },
  isAntiWeebEnabled: Boolean,
  isWelcomeEnabled: Boolean,
  banPhrases: [String],
});


module.exports = mongoose.model('Server', serverSchema);
