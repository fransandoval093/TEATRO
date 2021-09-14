const { Schema, model } = require('mongoose');
//This was originally the matchups file
const watchlistSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
    },
    genre: {
      type: String,
    },
    content: {
      type:Array
    },
  },
  { timestamps: true }
);

const Watchlist = model('Watchlist', watchlistSchema);

module.exports = Watchlist;
