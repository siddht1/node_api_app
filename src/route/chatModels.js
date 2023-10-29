const express = require("express");
const router=express.Router();
const DB = require("model.json");


router.all("/v1/models/*", async (req, res) => {

    res.send(DB);
});

module.exports = router;
