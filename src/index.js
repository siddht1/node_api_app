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
app.get('/api/openai/v1/chat/completions', async (req, res) => {
  console.log('Received chat completions request');
  const { prompt } = req.body;
  
  // Call OpenAI API to get completion
  const completion = await getChatCompletion(prompt);
  
  // Return completion as JSON response
  res.json({ completion });
});
app.post('/api/openai/v1/chat/completions', async (req, res) => {
  console.log('Received chat completions request');
  const { prompt } = req.body;
  
  // Call OpenAI API to get completion
  const completion = await getChatCompletion(prompt);
  
  // Return completion as JSON response
  res.json({ completion });
});
app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
