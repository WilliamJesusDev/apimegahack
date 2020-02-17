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
    }
  },
  { id: false, versionKey: false, toJSON: { virtuals: true } }
);

module.exports = mongoose.model("user", UserSchema);
