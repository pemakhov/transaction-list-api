const mongoose = require('mongoose');

const { MONGODB_URI } = require('./constants');

const connectOptions = {
  // flag to allow users to fall back to the old
  // parser if they find a bug in the new parse
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = mongoose.createConnection(MONGODB_URI, connectOptions);
