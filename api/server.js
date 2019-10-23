const express = require("express");
const server = express();

//endpoints
const teacherAuthRouter = require("./teachers/auth/teacher-authRouter");
const parentAuthRouter = require("./parents/auth/parent-authRouter");

//global middleware
server.use(express.json());
server.use("/api/auth/teacher", teacherAuthRouter);
server.use("/api/auth/parent", parentAuthRouter);

server.get("/", (req, res) => {
  res.send("This is working");
});

module.exports = server;
