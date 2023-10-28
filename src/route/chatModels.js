const express = require("express");
const router=express.Router();
// read from model.json


router.all("/v1/models/*", async (req, res) => {
    const Models = {
        "models": [{
                "id": "gpt-3.5-turbo",
                "name": "GPT-3.5 Turbo",
                "description": "The turbocharged version of GPT-3 with advanced capabilities.",
                "version": "1.0.0",
                "author": "OpenAI",
                "created_at": "2023-01-01",
                "usage": {
                    "requests": 1000000,
                    "tokens": 1000000
                }
            },
            {
                "id": "text-davinci-003",
                "name": "Davinci-003",
                "description": "The Davinci model version 003, specialized for text generation.",
                "version": "3.0.0",
                "author": "OpenAI",
                "created_at": "2022-05-01",
                "usage": {
                    "requests": 500000,
                    "tokens": 500000
                }
            }
        ]
    };
    res.send(Models);
});

module.exports = router;
