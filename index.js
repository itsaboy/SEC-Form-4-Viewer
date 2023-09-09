const express = require('express');
const path = require('path');
require('dotenv').config();

const port = process.env.PORT;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});