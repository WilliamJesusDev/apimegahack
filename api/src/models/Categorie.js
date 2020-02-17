const mongoose = require("mongoose");

const CategorieSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      primaryKey: true
    },
    title: String
  },
  { id: false, _id: false, versionKey: false, toJSON: { virtuals: true } }
);

CategorieSchema.virtual("playlists", {
  ref: "playlist", // The model to use
  localField: "_id", // Find playlist where `localField`
  foreignField: "categorie", // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: false,
  options: { sort: { publishedAt: -1 } } // Query options, see http://bit.ly/mongoose-query-options
});

module.exports = mongoose.model("categorie", CategorieSchema);
