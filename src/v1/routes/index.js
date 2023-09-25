const express = require("express");
const router = express.Router();
const cors = require('cors');

// Enable CORS for all routes
router.use(cors());
app.get('/', async (req, res) => {
  console.log('Received chat completions request');
  const { prompt } = req.body;
  
  // Call OpenAI API to get completion
  const completion = await getChatCompletion(prompt);
  
  // Return completion as JSON response
  res.json({ completion });
});
app.post('/', async (req, res) => {
  console.log('Received chat completions request');
  const { prompt } = req.body;
  
  // Call OpenAI API to get completion
  const completion = await getChatCompletion(prompt);
  
  // Return completion as JSON response
  res.json({ completion });
});

module.exports = router;

