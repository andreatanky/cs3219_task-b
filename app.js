const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require("cors");

const feedRoutes = require('./routes/feed');

const app = express();
app.use(cors());

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

mongoose.connect('mongodb+srv://Andrea:password<3@cluster0.k1rxn.mongodb.net/task_b1?retryWrites=true&w=majority')
.then(result => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
}).catch(err => console.log(err));

module.exports = app;