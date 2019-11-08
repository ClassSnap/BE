exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("learners")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("learners").insert([
        {
          id: 1,
          lastName: "Garcia",
          firstName: "Nicholas",
          gender: "male",
          birthdate: "2000/05/19",
          learnerCode: "gn1059",
        },
        {
          id: 2,
          lastName: "Yeung",
          firstName: "Kristy",
          gender: "female",
          birthdate: "1996/12/18",
          learnerCode: "yk2628",
        },
        {
          id: 3,
          lastName: "Chan",
          firstName: "Michelle",
          gender: "female",
          birthdate: "1994/01/25",
          learnerCode: "cm2415",
        },
      ]);
    });
};
