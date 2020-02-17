const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    thumbnails: Object,
    categories: [
      {
        type: Number,
        ref: "categorie"
      }
    ]
  },
  {
    id: false,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

module.exports = mongoose.model("channel", ChannelSchema);
