const express = require("express");
const Student = require("./models/student");
const router = require("./routers/student");
require("./db/connection");
const app = express();

app.use(express.json());
app.use(router);

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`connected on port ${port}`);
})