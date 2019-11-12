exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("ratings")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("ratings").insert([
        {
          id: 1,
          rating: 5,
          questionId: 1,
          learnerParentId: 1,
          classId: 1,
          completed: true
        },
        {
          id: 2,
          rating: 3,
          questionId: 1,
          learnerParentId: 2,
          classId: 1,
          completed: true
        },
        {
          id: 3,
          rating: 2,
          questionId: 2,
          learnerParentId: 2,
          classId: 1,
          completed: true
        },
        {
          id: 4,
          rating: 1,
          questionId: 2,
          learnerParentId: 1,
          classId: 1,
          completed: true
        }
      ]);
    });
};
