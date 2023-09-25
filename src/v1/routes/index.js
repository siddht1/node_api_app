const express = require("express");
const router = express.Router();
const cors = require('cors');

// Enable CORS for all routes
router.use(cors());

// Custom middleware function to check user's unique code
const checkUniqueCode = (req, res, next) => {
  const { code } = req.query;
  
  // Check if the code is valid (you will need to implement this according to your requirements)
  if (code === "myUniqueCode123") {
    return next(); // Code is valid, proceed to the OpenAI endpoint
  }
  
  // Code is invalid, return an error message
  return res.status(401).json({ error: "Unauthorized access" });
};

// Route for OpenAI endpoint with custom middleware
router.route("/openai").get(checkUniqueCode, (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  
  // Implement the logic to call the OpenAI endpoint here
  res.send({"status":"OK","API":"WORKING @ V1","API_V1":"/API/V1","url":fullUrl,"CORS":"allowed"});
});

module.exports = router;
