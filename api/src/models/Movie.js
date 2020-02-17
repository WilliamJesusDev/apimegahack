const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      primaryKey: true
    },
    videoId: String,
    publishedAt: Date,
    title: String,
    description: String,
    thumbnails: Object,
    playlist: {
      type: String,
      ref: "playlist"
    }
  },
  { id: false, _id: false, versionKey: false, toJSON: { virtuals: true } }
);

module.exports = mongoose.model("movie", MovieSchema);
