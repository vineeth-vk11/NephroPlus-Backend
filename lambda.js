const awsServerlessExpress = require("aws-serverless-express");
const mongoose = require("mongoose");

const app = require("./app");
const warmer = require("lambda-warmer");

const DB_URI = process.env.DATABASE_URI;

const server = awsServerlessExpress.createServer(app);
exports.handler = (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  warmer(event).then((isWarmer) => {
    if (isWarmer) {
      callback(null, "warmed");
    } else {
      mongoose.connect(DB_URI).then((con) => {
        console.log("DB connection successful");
        awsServerlessExpress.proxy(server, event, context);
      });
    }
  });
};
