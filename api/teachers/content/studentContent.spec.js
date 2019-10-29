const request = require("supertest");
const server = require("../../server");
const db = require("../../../data/dbConfig");
const beforeAll = require("./default");

// describe("Posting new student", () => {
//   it("should return 200 when add learner is successful", async () => {
//     const teacher = {
//       prefix: "Miss",
//       teacherFirstName: "Karin",
//       teacherLastName: "Li",
//       teacherEmail: "karin@gmail.com",
//       teacherPassword: "harakarin",
//       schoolName: "Briscoe ES",
//       city: "San Antonio",
//     };
//     db("teachers").truncate();
//     const res = await request(server)
//       .post("/api/auth/teacher/register")
//       .send(teacher);

//     const login = await request(server)
//       .post("/api/auth/teacher/login")
//       .send({ teacherEmail: "karin@gmail.com", teacherPassword: "harakarin" });

//     await db("learners").truncate();
//     const learner = {
//       lastName: "Garcia",
//       firstName: "Ana",
//       gender: "Female",
//       learnerCode: "123456",
//     };
//     const post = await request(server)
//       .post("/api/student/add")
//       .send(learner)
//       .set("authorization", login.body.token);

//     expect(post.status).toBe(200);
//   });
// });

describe("add student to learner list", () => {
  it("Can add students and return a 201", async () => {
    let token = await beforeAll();
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
      .set("authorization", token);

    expect(post.status).toBe(200);
  });
});

describe("get all students", () => {
  it("Can get all students with token", async () => {
    let token = await beforeAll();

    const students = await request(server)
      .get("/api/student/")
      .set("authorization", token);

    expect(students.status).toBe(200);
  });
});

// // connect issue with this test
// describe("get all students by teachers", () => {
//   it("Return 200 and lastName when requested", async () => {
//     let token = await beforeAll();
//     const kidId = 1;
//     const kids = await request(server)
//       .get(`api/student/1`)
//       .set("authorization", token);
//     expect(kids.status).toBe(200);
//   });
// });
