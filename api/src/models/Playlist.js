const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      primaryKey: true
    },
    publishedAt: Date,
    title: String,
    description: String,
    thumbnails: Object,
    categorie: {
      type: Number,
      ref: "categorie"
    }
  },
  { id: false, _id: false, versionKey: false, toJSON: { virtuals: true } }
);

PlaylistSchema.virtual("movies", {
  ref: "movie", // The model to use
  localField: "_id", // Find movie where `localField`
  foreignField: "playlist", // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: false,
  options: { sort: { publishedAt: +1 } } // Query options, see http://bit.ly/mongoose-query-options
});

module.exports = mongoose.model("playlist", PlaylistSchema);
