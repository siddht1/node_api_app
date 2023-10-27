const express = require("express");
const axios = require('axios');
const bodyParser = require("body-parser");
const router=express.Router();
router.all("/v1/chat/completions/*", async (req, res) => {
    // const openaiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';  
    // URI format
    const openaiUrl = process.env.OPENAI_URI;
    const openaiKey = process.env.OPENAI_KEY;
    // Extract the user message from the request body  
    const userMessage = req.body.userMessage;

    // Send the request to the OpenAI endpoint  
    try {
        const response = await axios.post(openaiUrl, {
            prompt: userMessage,
            max_tokens: 50
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiKey}`
            }
        });

        // Pass the OpenAI response directly to the client app  
        res.send(response.data);
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).send('Error calling OpenAI API');
    }
});


module.exports = router;