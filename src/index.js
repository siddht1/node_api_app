const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const v1Router = require("./v1/routes");

app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

// Endpoint for the GET request
app.get("/", (req, res) => {
  const data = {
    "GET": req.query
  };
  res.send(data);
});

// Endpoint for the POST request
app.post("/", (req, res) => {
  console.log("POST request received");
  const data = {
    "POST": req.body
  };
  res.send(data);
});

// app.use("/api/openai/v1/chat/completions", v1Router);
app.use("v1/chat/completions", v1Router);
// app.use("/api/v1/chat/completions", v1Router);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
