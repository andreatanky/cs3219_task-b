// Import Mongoose

const awsServerlessExpress = require("aws-serverless-express");
let mongoose = require('mongoose');

let connection = null;

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  mongoose.connect('mongodb+srv://Andrea:password<3@cluster0.k1rxn.mongodb.net/task_b1?retryWrites=true&w=majority', { 
    useNewUrlParser: true
  });
  connection = mongoose.connection;
  const app = require("./app");
  const server = awsServerlessExpress.createServer(app);
  return awsServerlessExpress.proxy(server, event, context, "PROMISE").promise;
};