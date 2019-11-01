const request = require("supertest");
const server = require("../../server");
const db = require("../../../data/dbConfig");
const beforeAll = require("./default");

// describe("add question", () => {
//   it("return 200 and message after adding question", async () => {
//     let token = await beforeAll();
//     const qa = { question: "Test question", date: "2017/06/28", classId: 1 };
//     const add = await request(server)
//       .post("/api/question/add")
//       .send(qa)
//       .set("authorization", token);
//     expect(add.status).toBe(200);
//   });
// });

describe("get question by class id", () => {
  it("return 200 with questions", async () => {
    let token = await beforeAll();

    const classId = 1;
    const question = await request(server)
      .get(`/api/question/class/${classId}`)
      .set("authorization", token);
    expect(question.status).toBe(200);
  });
});

// describe("get question by class id", () => {
//   it("return 404 error with wrong id", async () => {
//     let token = await beforeAll();
//     const classId = 190;
//     const error = await request(server)
//       .get(`/api/question/class/${classId}`)
//       .set("authorization", token);
//     expect(error.status).toBe(404);
//     expect(error.text).toContain("No questions with this id");
//   });
// });
