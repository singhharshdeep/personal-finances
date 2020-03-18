const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const { connectDb } = require('./config/db');
const authRouter = require('./api/routes/auth');

const app = express();

/** Express Configuration */
app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require('./config/passport');

/** Routes */
app.use('/api/v1/', authRouter);

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