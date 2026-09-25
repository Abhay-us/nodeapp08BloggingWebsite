const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const morgan = require('morgan')
const cors = require('cors');

const app = express();

const url = "mongodb://127.0.0.1:27017/blogging-website";

app.use(cors({ origin: 'http://localhost:5173' }));

// Middleware
app.use(morgan('tiny'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// routes
const userroute = require('./routes/userroute')
app.use("/", userroute);


// database
mongoose.connect(url);
const con = mongoose.connection;
con.on('open', () => {
    console.log('Db Connection Successful');
})


app.use((req, res, next) => {
    res.status(404).send("Page Not Found");
});

app.listen(5454, (req, res) => {
    console.log("Server is Running .");
});

