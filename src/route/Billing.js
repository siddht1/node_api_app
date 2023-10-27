const express = require("express");
const router=express.Router();



router.all("/api/dashboard/billing/*", async (req, res) => {
    const mockBillingData = {
        total_tokens_used: 10000,
        endpoint_usage: {
            generate: 5000,
            translate: 2500,
            write: 2500
        },
        cost: 0.20,
        remaining_tokens: 100000
    };

    res.send(mockBillingData);
});

module.exports = router;