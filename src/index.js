const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;


const axios = require('axios');

app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));
const company_name=' KNEOGINI IGMISARCH PRIVATE LIMITED';

const usageRouter = require("./route/Usage");
const billingRouter=require('./route/Billing');
const completionRouter=require('./route/chat');
const modelRouter=require('./route/chatModels');
const allRouter=require('./route/All')

const routers={
    usage:'/api/dashboard/billing/usage/*',
    billing:'/api/dashboard/billing/*',
    completions:'/v1/chat/completions/*',
    models:'/v1/models/*',
    all:'*'
};

app.use(routers.usage, usageRouter);
app.use(routers.billing, billingRouter);
app.use(routers.completions, completionRouter);
app.use(routers.models, modelRouter);
app.use(routers.all, allRouter);
try {
    app.listen(PORT, () => {
        console.log(`${company_name} is listening on port ${PORT}`);
    });
} catch (error) {
    console.error(error);
    process.exit(1);
}
