const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for specific origin
app.use(cors({
//   origin: "https://example.com"
}));

// Parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// GET route
app.get("/", (req, res) => {
  let data = {};
  data["GET"] = req.query;
  res.send(data);
});

// POST route
app.post("/", (req, res) => {
  console.log("POST request received");
  const { data } = req.body;
  res.send(`Hello ${data}! This is a POST request`);
});

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
