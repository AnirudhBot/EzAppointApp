const express = require("express");
const router = require("./routes");
require("./db"); // Connection with DB

const app = express();
const PORT = process.env.PORT || 3001;

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
  res.send("Welcome to EzAppoint");
});

// Listening to Server
app.listen(PORT, () => {
  console.log("server running");
});
