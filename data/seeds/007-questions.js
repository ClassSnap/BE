exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("questions")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("questions").insert([
        {
          id: 1,
          question: "Why do rocks sink and sponges float?",
          questionType: "Science",
          date: "2018/08/23",
          classId: 1,
        },
        {
          id: 2,
          question:
            "Show an example of light energy, sound energy, mechanical energy and electrical energy",
          questionType: "Science",
          date: "2018/10/05",
          classId: 1,
        },
        {
          id: 3,
          question: "Pronounce the 5 vowel sounds",
          questionType: "ELAR",
          date: "2018/09/10",
          classId: 2,
        },
      ]);
    });
};
