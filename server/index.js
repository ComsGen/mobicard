// helpers and config files
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
require('./config/db');

// packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

// variables
const PORT = process.env.PORT || 2021;

// init app
const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
require('./middlewares/passport')(passport);

// routes
app.get('/', (req, res) => {
    res.send(`Server listening to PORT ${PORT}`)
});

app.use('/api/users', require('./routes/users.routes'));

// listen to the server
app.listen(PORT, () => {
    console.log(`App listening to PORT ${PORT}`)
})