const request = require("supertest");
const server = require("../../server");
const db = require("../../../data/dbConfig");

let token;

describe("Posting new student", () => {
  it("should return 200 when add learner is successful", async () => {
    const teacher = {
      prefix: "Miss",
      teacherFirstName: "Karin",
      teacherLastName: "Li",
      teacherEmail: "karin@gmail.com",
      teacherPassword: "harakarin",
      schoolName: "Briscoe ES",
      city: "San Antonio",
    };
    db("teachers").truncate();
    const res = await request(server)
      .post("/api/auth/teacher/register")
      .send(teacher);

    const login = await request(server)
      .post("/api/auth/teacher/login")
      .send({ teacherEmail: "karin@gmail.com", teacherPassword: "harakarin" });

    await db("learners").truncate();
    const learner = {
      lastName: "Garcia",
      firstName: "Ana",
      gender: "Female",
      learnerCode: "123456",
    };
    const post = await request(server)
      .post("/api/student/add")
      .send(learner)
      .set("authorization", login.body.token);

    expect(post.status).toBe(200);
  });
});
