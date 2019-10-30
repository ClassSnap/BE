exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("ratings")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("ratings").insert([
        {
          id: 1,
          questionId: 1,
          learnerParentId: 1,
          classId: 1,
          completed: false,
        },
        {
          id: 2,
          questionId: 1,
          learnerParentId: 2,
          classId: 1,
          completed: false,
        },
        {
          id: 3,
          questionId: 2,
          learnerParentId: 3,
          classId: 2,
          completed: false,
        },
      ]);
    });
};
