const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

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

// Endpoint for the openai chat completions
app.post("/api/openai/v1/chat/completions", (req, res) => {
  console.log("POST request for openai chat completions received");
  const users = [
    { id: 1, name: 'Test_2' },
    { id: 2, name: 'Test_2' }
  ];
  res.send(users);
});

app.post("/api/openai/v1/chat/completions", (req, res) => {
  console.log("POST request for openai chat completions received");
  // Do something to handle the openai chat completions request
    const users = [
    { id: 1, name: 'Test_2' },
    { id: 2, name: 'Test_2' }
  ];
  res.send(users);
});
app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
