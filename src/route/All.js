const express = require("express");  
const { createClient } = require('@supabase/supabase-js');  
const { v4: uuidv4 } = require('uuid');  
const bodyParser = require("body-parser");  
const cors = require("cors");  

  
const supabaseUrl = process.env.SUPABASE_URL;  
const supabaseKey = process.env.SUPABASE_KEY;  
const supabase = createClient(supabaseUrl, supabaseKey);  
  
const router = express.Router();  
const apiKey = process.env.AZURE_KEY;


async function invokeOpenAIEndpoint(message) {
return message;
}


function isValidFormat(message) {  
    if (typeof message !== 'object') return false; // Check if message is an object first.  
    if (!message.role || !message.content) return false;  
  
    return true;  
}  



  
router.all("*", async (req, res) => {  
  try {  
    const datadb = {  
      status: "ok",  
      url: req.originalUrl,  
      ip_address: req.headers['x-forwarded-for'] || req.connection.remoteAddress,  
      request_body: req.body,  
      request_method: req.method,  
      lat: req.headers['x-vercel-ip-latitude'],  
      lon: req.headers['x-vercel-ip-longitude'],  
      city: req.headers['x-vercel-ip-city'],  
      region: req.headers['x-vercel-ip-country-region'],  
      country: req.headers['x-vercel-ip-country'],  
      UA: req.headers['user-agent'],  
      uuid: uuidv4(),  
      date_time: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })  
    };  
  
    const { data: log, error } = await supabase.from('chatapp').insert(datadb);  
  
    if (error) {  
      console.error('Error inserting log:', error);  
      return res.status(500).send('Out of Order. Contact Admin');  
    }  
  
    console.log('Log inserted successfully:', log);  
  


    const data = req.body;  

    if (!data.messages || !Array.isArray(data.messages)) {
        res.send('No messages found in request body');
        return;
    }

    const message = req.body.messages[0];

     if (isValidFormat(message)) {  
        const response = await invokeOpenAIEndpoint(message.content); // Pass message.content if OpenAI endpoint expects a string.  
        res.send(response);  
    } 
     else {  
        res.send('Invalid message format');  
    }  

    
  } catch (error) {  
    console.error('Error processing request:', error);  
    res.status(500).send('Internal Server Error');  
  }  
});  
  
module.exports = router;  
