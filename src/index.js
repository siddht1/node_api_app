const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all origins

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

app.get("/", (req, res) => {
  const data = {
    "GET": req.query
  };
  res.send(data);
});

app.post("/", (req, res) => {
  console.log("POST request received");
  const data = {
    "POST": req.body
  };
  res.send(data);
});

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
