const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const v1Router = require("./v1/routes");

app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

// Endpoint for all requests
app.use("*", (req, res) => {
  const data = {
    "status": "ok",
    "url": req.originalUrl,
    IP: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    post_get=req.body
    
  };
  res.send(data);
});


app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
