const express = require("express");
const PORT = 3000;
const { connect } = require("mongoose");
const url = "mongodb://localhost:27017/hospital";
const receptionRoute = require("./routes/receptionRoute");
const morgan = require("morgan");


const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/reception", receptionRoute);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    },
    () => {
      console.log("DB started");
    }
  );
});
