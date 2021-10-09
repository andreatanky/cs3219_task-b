const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require("cors");

const feedRoutes = require('./routes/feed');

const app = express();
app.use(cors());
const pw = process.env.MONGODB_PASSWORD;

mongoose.connect('mongodb+srv://Andrea:password<3@cluster0.k1rxn.mongodb.net/task_b1?retryWrites=true&w=majority', { 
    useNewUrlParser: true
});

var db = mongoose.connection;

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(express.json()); // application/json

app.use('/feed', feedRoutes);

app.use('/', (req, res, next) => {
    try {
        throw new Error("Invalid page!")
    }
    catch (error) {
        next(error)
    }
})

app.use((error, req, res, next) => {
   console.log(error);
   const status = error.statusCode || 500;
   const message = error.message;
   res.status(status).json({message: "An error occured!"});
})


app.listen(8080);

module.exports = app;