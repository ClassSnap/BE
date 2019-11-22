const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("parents")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("parents").insert([
        {
          id: 1,
          parentName: "Sarah Garcia",
          parentEmail: "sarah@gmail.com",
          parentPassword: bcrypt.hashSync("garcia", 10),
          relationship: "mom",
          language: "English"
        },
        {
          id: 2,
          parentName: "Erica Sosa",
          parentEmail: "erica@gmail.com",
          parentPassword: bcrypt.hashSync("sosa", 10),
          relationship: "grandma",
          language: "Spanish"
        },
        {
          id: 3,
          parentName: "Lena Yao",
          parentEmail: "lena@gmail.com",
          parentPassword: bcrypt.hashSync("yao", 10),
          relationship: "mom",
          language: "English"
        }
      ]);
    });
};
