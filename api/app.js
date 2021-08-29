const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed');

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(express.json()); // application/json

app.use('/feed', feedRoutes);

app.use((error, req, res, next) => {
   console.log(error);
   const status = error.statusCode || 500;
   const message = error.message;
   res.status(status).json({message: "An error occured!"});
})

mongoose.connect('mongodb+srv://Andrea:password<3@cluster0.k1rxn.mongodb.net/task_b1?retryWrites=true&w=majority')
.then(result => {
    app.listen(8080);
}).catch(err => console.log(err));

module.exports = app;