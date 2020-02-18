const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String,
      minlength: 6
    },
    birthday: Date,
    document: String,
    genre: String,
    categories: [
      {
        type: Number,
        ref: "categorie"
      }
    ],
    playlists: [
      {
        type: String,
        ref: "playlist"
      }
    ]
  },
  { id: false, versionKey: false, toJSON: { virtuals: true } }
);

UserSchema.virtual("channels", {
  ref: "channel", // The model to use
  localField: "_id", // Find movie where `localField`
  foreignField: "user", // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: false,
  options: { sort: { title: +1 } } // Query options, see http://bit.ly/mongoose-query-options
});

module.exports = mongoose.model("user", UserSchema);
