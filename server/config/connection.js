const mongoose = require('mongoose');

// mongoose.connect( "mongodb+srv://teatroDBuser:easyDBpassword@cluster0.1t258.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" || process.env.MONGODB_URI || 'mongodb://localhost/teatro', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// });

mongoose.connect( "mongodb+srv://teatroDBuser:easyDBpassword@cluster0.1t258.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" || process.env.MONGODB_URI , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
