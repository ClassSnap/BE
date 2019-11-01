const request = require("supertest");
const server = require("../../server");
const db = require("../../../data/dbConfig");

// beforeAll((done)=> {
//   request(server).
// })

module.exports = async function beforeAll() {
  const teacher = {
    prefix: "Miss",
    teacherFirstName: "Jessy",
    teacherLastName: "Smith",
    teacherEmail: "jessy@gmail.com",
    teacherPassword: "smith",
    schoolName: "Pershing ES",
    city: "San Antonio",
  };
  db("teachers").truncate();
  const res = await request(server)
    .post("/api/auth/teacher/register")
    .send(teacher);

  const login = await request(server)
    .post("/api/auth/teacher/login")
    .send({ teacherEmail: "jessy@gmail.com", teacherPassword: "smith" });
  return login.body.token;
};

// console.log(beforeAll());
// describe("Posting new student", () => {
//     it("should return 200 when add learner is successful", async () => {

//       await db("learners").truncate();
//       const learner = {
//         lastName: "Garcia",
//         firstName: "Ana",
//         gender: "Female",
//         learnerCode: "123456",
//       };
//       const post = await request(server)
//         .post("/api/student/add")
//         .send(learner)
//         .set("authorization", login.body.token);

//       expect(post.status).toBe(200);
//     });
//   });
