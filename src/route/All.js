const express = require("express");  
const { createClient } = require('@supabase/supabase-js');  
const { v4: uuidv4 } = require('uuid');  
const bodyParser = require("body-parser");  
const cors = require("cors");  
  
const supabaseUrl = process.env.SUPABASE_URL;  
const supabaseKey = process.env.SUPABASE_KEY;  
const supabase = createClient(supabaseUrl, supabaseKey);  
  
const router = express.Router();  
  
router.all("*", async (req, res) => {  
  try {  
    const data = {  
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
  
    const { data: log, error } = await supabase.from('db_test').insert(data);  
  
    if (error) {  
      console.error('Error inserting log:', error);  
      return res.status(500).send('Out of Order. Contact Admin');  
    }  
  
    console.log('Log inserted successfully:', log);  
  
    const messages = [  
      'Are you looking to enhance customer support, streamline operations, or boost engagement on your website? Look no further! Our chatbot is here to revolutionize the way you interact with your customers.',  
      'Powered by advanced artificial intelligence, our chatbot is designed to provide instant and accurate responses to customer queries, 24/7. Say goodbye to long wait times and hello to instant assistance!',  
      'With our chatbot, you can automate repetitive tasks, such as answering frequently asked questions, processing orders, and providing personalized recommendations. This not only saves time and resources but also ensures consistent and efficient customer service.',  
      'Moreover, our chatbot is highly customizable, allowing you to tailor its personality and responses to align with your brand voice and values. It seamlessly integrates with various platforms, including websites, messaging apps, and social media channels, providing a unified and convenient customer experience.',  
      'Stay ahead of the competition and deliver exceptional customer service with our cutting-edge chatbot product. Experience the power of AI-driven automation and witness increased customer satisfaction, improved efficiency, and accelerated business growth.',  
      'Ready to transform the way you engage with your customers? Try our chatbot today and unlock a world of possibilities!'  
    ];  
    const randomMessageIndex = Math.floor(Math.random() * messages.length);  
    const response = {  
      message: 'Subscribe to Our Chatbot to use it...',  
      message: messages[randomMessageIndex]  
    };  
  
    res.json(response);  
  } catch (error) {  
    console.error('Error processing request:', error);  
    res.status(500).send('Internal Server Error');  
  }  
});  
  
module.exports = router;  
