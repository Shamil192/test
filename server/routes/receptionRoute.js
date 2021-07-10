const router = require("express").Router();
const User = require("../models/users");
const Doctor = require("../models/doctors");
const Reception = require("../models/reception");

router.route("/create").post(async (req, res) => {
  try {
    const { userId, doctorId, slot } = req.body;
    const doctor = await Doctor.findById({ _id: doctorId });

    if (doctor.slots.includes(slot)) {
      const reception = await Reception.create({
        user_id: userId,
        doctor_id: doctorId,
        slot: slot,
      });
      const index = doctor.slots.indexOf(slot);
      doctor.slots.splice(index, 1);
      doctor.save();
      res.sendStatus(200);
    } else {
      alert("Извините, время занято или не существует");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
