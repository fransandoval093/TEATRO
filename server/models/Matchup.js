const { Schema, model } = require('mongoose');

const matchupSchema = new Schema({
  tech1: {
    type: String,
    required: true,
  },
  tech2: {
    type: String,
    required: true,
  },
  tech1_votes: {
    type: Number,
    default: 0,
  },
  tech2_votes: {
    type: Number,
    default: 0,
  },
});

const Matchup = model('Matchup', matchupSchema);

module.exports = Matchup;

//To be used when ready.

// const watchlistSchema = new Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     type: {
//       type: String,
//     },
//     genre: {
//       type: String,
//     },
//     content: {
//       type:Array
//     },
//   },
//   { timestamps: true }
// );

// const Watchlist = model('Watchlist', watchlistSchema);

// module.exports = Watchlist;