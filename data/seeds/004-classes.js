exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("classes")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("classes").insert([
        {
          id: 1,
          name: "Miss Li Science Class Period 4",
          subject: "Science",
          gradeLevel: "5th",
          classCode: "123456",
          classRigor: "Regular",
          teacherId: 1,
        },
        {
          id: 2,
          name: "Mr Micik ELAR Class Period 1",
          subject: "ELAR",
          gradeLevel: "1st",
          classCode: "112233",
          classRigor: "Regular",
          teacherId: 2,
        },
      ]);
    });
};
