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
          parentName: "Jacqueline Li",
          parentEmail: "jacqueline@gmail.com",
          parentPassword: bcrypt.hashSync("93193229", 10),
          relationship: "mom",
        },
        {
          id: 2,
          parentName: "Erica Sosa",
          parentEmail: "erica@gmail.com",
          parentPassword: bcrypt.hashSync("sosa", 10),
          relationship: "grandma",
        },
      ]);
    });
};
