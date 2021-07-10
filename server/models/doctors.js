const { model, Schema } = require("mongoose");

const doctorSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: Number,
  spec: String,
  slots: Array,
});

const Doctor = model("Doctor", doctorSchema);

module.exports = Doctor;
