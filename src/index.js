// In src/index.js
const express = require("express");


const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

// Enable CORS for all routes
app.use(cors());
// *** REMOVE ***
app.get("/", (req, res) => {
  res.send({"message":" It's Working! "});
});


app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
