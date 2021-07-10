const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: Number,
});

const User = model("User", userSchema);

module.exports = User;
