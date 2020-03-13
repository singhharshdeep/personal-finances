const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const { connectDb } = require('./config/db');

const app = express();

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3000;

async function startServer() {
    await connectDb();
    app.listen(PORT, err => {
        if (err) {
            console.error('There was a problem starting the server. Check the logs below.', err);
        } else {
            console.log(`Server is running on port ${PORT}`);
        }
    });
}

startServer();