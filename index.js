const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDb = require("./config/db");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDb();

app.get("/", (req, res) => {
  res.send("Tf you doing here lol");
});

app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/auth", require("./routes/userRoutes"));

port = 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
