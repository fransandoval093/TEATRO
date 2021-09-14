const { model , Schema } = require('mongoose');

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    imgTitle: {
      type: String,
      required: true,
    },
    imgSmall: {
      type: String,
    },
    year: {
      type: String,
    },
    genre: {
      type: String,
    },
    limit: {
      type: Number,
    },
    isSeries: {
      type: Boolean,
      default: false  
    },
  },
  { timestamps: true }
);

const Movie = model("Movie", movieSchema);

module.exports = Movie;

