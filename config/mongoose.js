const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error Connecting to the Database"));

db.once('open', function () {
    console.log("Successfully Connected to the Databse");
});