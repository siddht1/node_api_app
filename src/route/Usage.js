const express = require("express");
const router=express.Router();
router.all('"/api/dashboard/billing/usage/*"', async (req, res) => {
    const mockUsageData = {
        "start_date": "2023-10-01",
        "end_date": "2023-10-27",
        "usage": {
            "total_calls": 5000,
            "total_cost": 100.50,
            "details": [{
                    "date": "2023-10-01",
                    "calls": 200,
                    "cost": 4.00
                },
                {
                    "date": "2023-10-02",
                    "calls": 300,
                    "cost": 6.00
                },

                {
                    "date": "2023-10-27",
                    "calls": 150,
                    "cost": 3.00
                }
            ]
        }
    };


    res.send(mockUsageData);
});

module.exports = router;