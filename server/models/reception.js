const { model, Schema } = require("mongoose");

const receptionSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  doctor_id: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
  },
  slot: String,
});

const Reception = model("Reception", receptionSchema);

module.exports = Reception;
