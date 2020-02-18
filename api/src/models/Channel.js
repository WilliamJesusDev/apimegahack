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
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    }
  },
  {
    id: false,
    versionKey: false,
    toJSON: { virtuals: true }
  }
);

module.exports = mongoose.model("channel", ChannelSchema);
