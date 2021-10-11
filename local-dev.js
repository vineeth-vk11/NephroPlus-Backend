const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./.env" });
const app = require("./app");
const http = require("http");

const DB_URI = process.env.DATABASE_URI;

mongoose.connect(DB_URI).then((con) => {
  console.log("DB connection successful");
});

//set port, listen for requests
const PORT = process.env.PORT || 8080;

http.createServer(app);
app.listen(8080, () => {
  console.log(`Local server running on port ${PORT}`);
});
