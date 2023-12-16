const express = require('express');
const dotenv=require('dotenv').config();
const passport = require('passport');
const passportJWT = require('passport-jwt');
const db = require('./config/mongoose');
const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/', require('./routes'));

app.listen(port, function (err, user) {
    if (err) { console.log('error'); return }

    console.log(`Server running :: Port Number - ${port}`);
});

