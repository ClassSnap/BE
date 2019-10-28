const request = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");

describe("auth model", () => {
  it("should set testing environment", () => {
    expect(process.env.NODE_ENV).toBe("testing");
  });
});
