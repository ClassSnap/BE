const bcrypt = require("bcryptjs");

exports.seed = function seed(knex) {
  // Deletes ALL existing entries
  return knex("teachers")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("teachers").insert([
        {
          id: 1,
          prefix: "Miss",
          teacherFirstName: "Karen",
          teacherLastName: "Li",
          teacherEmail: "karen@gmail.com",
          teacherPassword: bcrypt.hashSync("harakarin", 10),
          schoolName: "Briscoe ES",
          schoolDistrict: "SAISD",
          city: "San Antonio",
          state: "Texas",
          country: "USA",
        },
        {
          id: 2,
          prefix: "Mr",
          teacherFirstName: "Matt",
          teacherLastName: "Micik",
          teacherEmail: "matt@gmail.com",
          teacherPassword: bcrypt.hashSync("micik", 10),
          schoolName: "Briscoe ES",
          schoolDistrict: "SAISD",
          city: "San Antonio",
          state: "Texas",
          country: "USA",
        },
      ]);
    });
};
