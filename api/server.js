const express = require("express");
const server = express();

//global middleware
server.use(express.json());

server.get("/", (req, res) => {
  res.send("This is working");
});

module.exports = server;
