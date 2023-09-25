const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createClient } = require('@supabase/supabase-js');
const app = express();
const PORT = process.env.PORT || 3000;
const v1Router = require("./v1/routes");
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

// Endpoint for all requests
app.use("*", async (req, res) => {
  const data = {
    "status": "ok",
    "url": req.originalUrl,
    "ip_address": req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    "request_body": req.body,
    "request_method": req.method
  };
  
  const { data: log, error } = await supabase.from('db_test').insert(data); 

  if (error) {
    console.error('Error inserting log:', error);
    res.status(500).send('Error inserting log');
  } else {
    console.log('Log inserted successfully:', log);
    res.send(data);
  }
});

// Use v1Router for version 1 API requests
app.use("/v1", v1Router);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});

// Description:
// 1. Added request_method to data object to display the HTTP method used in the request.
// 2. Renamed post_get property to request_body property for better readability.
// 3. Added a comment in line 19 to indicate that v1Router is used for version 1 API requests.
// 4. Fixed issues with duplicate usage of variables and missing async function.
