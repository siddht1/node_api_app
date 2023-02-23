// In src/index.js
const express = require("express");


const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

// Enable CORS for all routes
app.use(cors());
// *** REMOVE ***
app.get("/", (req, res) => {
  let data={};
   data['GET']=req.query;
  res.send(data);
});


app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
