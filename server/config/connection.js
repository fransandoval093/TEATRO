const mongoose = require('mongoose');

mongoose.connect(process.env.ORMONGO_RS_URL || 'mongodb://localhost/techmatchup', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
