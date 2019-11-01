const express = require("express");
const server = express();

//endpoints
const teacherAuthRouter = require("./teachers/auth/teacher-authRouter");
const parentAuthRouter = require("./parents/auth/parent-authRouter");
const teacherContentRouter = require("./teachers/content/teacherContentRouter");
const classContentRouter = require("./teachers/content/classContentRouter");
const questionContentRouter = require("./teachers/content/questionContentRouter");
const ratingContentRouter = require("./teachers/content/ratingContentRouter");
const studentContentRouter = require("./teachers/content/studentContentRouter");

//parent endpoints
const studentinfoRouter = require("./parents/content/childinfoRouter");
const studentclassRouter = require("./parents/content/childclassRouter");
const studentratingRouter = require("./parents/content/childratingRouter");

//global middleware
server.use(express.json());
server.use("/api/auth/teacher", teacherAuthRouter);
server.use("/api/auth/parent", parentAuthRouter);
server.use("/api/teacher", teacherContentRouter);
server.use("/api/class", classContentRouter);
server.use("/api/question", questionContentRouter);
server.use("/api/rating", ratingContentRouter);
server.use("/api/student", studentContentRouter);
server.use("/api/parent", studentinfoRouter);
server.use("/api/ssclass", studentclassRouter);
server.use("/api/ssrating", studentratingRouter);

server.get("/", (req, res) => {
  res.send("This is working");
});

module.exports = server;
