const { connect, connection } = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const User = require("./models/users");
const Doctor = require("./models/doctors");

async function seed() {
  await connect("mongodb://localhost:27017/hospital", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  const users = [
    {
      id: uuidv4(),
      phone: 79879879898,
      name: "Василий",
      age: 29,
    },
    {
      id: uuidv4(),
      phone: 79998884455,
      name: "Петр",
      age: 41,
    },
    {
      id: uuidv4(),
      phone: 79600005544,
      name: "Иван",
      age: 21,
    },
    {
      id: uuidv4(),
      phone: 79179179197,
      name: "Андрей",
      age: 32,
    },
  ];

  const doctors = [
    {
      id: uuidv4(),
      name: "Светлана",
      age: 33,
      spec: "Терапевт",
      slots: ["data_time1", "data_time2", "data_time3"],
    },
    {
      id: uuidv4(),
      name: "Виктор",
      age: 39,
      spec: "Невролог",
      slots: ["data_time1", "data_time2", "data_time3"],
    },
    {
      id: uuidv4(),
      name: "Регина",
      age: 43,
      spec: "Травматолог",
      slots: ["data_time1", "data_time2", "data_time3"],
    },
  ];

  await User.insertMany(users);
  await Doctor.insertMany(doctors);

  await connection.close();
}

seed();
