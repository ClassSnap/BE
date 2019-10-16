exports.up = function(knex) {
  return knex.schema
    .createTable("teachers", function(teacher) {
      teacher.increments();
      teacher.string("prefix", 10).notNullable();
      teacher.string("teacherFirstName", 128).notNullable();
      teacher.string("teacherLastName", 128).NotNullable();
      teacher
        .string("teacherEmail", 128)
        .notNullable()
        .unique();
      teacher.string("teacherPassword").notNullable();
      teacher.string("schoolName", 128);
      teacher.string("schoolDistrict", 255);
      teacher.string("city", 128);
      teacher.string("state", 128);
      teacher.string("country", 128);
    })
    .createTable("parents", function(parent) {
      parent.increments();
      parent.string("parentName", 128).notNullable();
      parent
        .string("parentEmail", 128)
        .notNullable()
        .unique();
      parent.string("parentPassword").notNullable();
      parent.string("relationship", 128);
    });
};

exports.down = function(knex) {};
