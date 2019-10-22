exports.up = function(knex) {
  return knex.schema
    .createTable("teachers", function(teacher) {
      teacher.increments();
      teacher.string("prefix", 10).notNullable();
      teacher.string("teacherFirstName", 128).notNullable();
      teacher.string("teacherLastName", 128).notNullable();
      teacher
        .string("teacherEmail", 128)
        .notNullable()
        .unique();
      teacher.string("teacherPassword").notNullable();
      teacher.string("schoolName", 128).notNullable();
      teacher.string("schoolDistrict", 255);
      teacher.string("city", 128).notNullable();
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
    })
    .createTable("classes", function(classes) {
      classes.increments();
      classes.string("className", 128).notNullable();
      classes.string("subject", 128).notNullable();
      classes.string("gradeLevel", 128).notNullable();
      classes
        .string("classCode", 128)
        .notNullable()
        .unique();
      classes.string("classRigor", 128);
      classes
        .integer("teacherId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("teachers");
    })
    .createTable("students", function(student) {
      student.increments();
      student.string("lastName", 128).notNullable();
      student.string("firstName", 128).notNullable();
      student
        .integer("classId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("classes");
    })
    .createTable("questions", function(question) {
      question.increments();
      question.string("question", 255).notNullable();
      question.string("imageURL", 255);
      question.string("sampleAnswer");
      question.string("language", 128).notNullable();
      question.date("date").notNullable();
      question
        .integer("classId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("classes");
    })
    .createTable("studentsParent", function(stparent) {
      stparent.increments();
      stparent
        .integer("parentId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("parents");
      stparent
        .integer("studentId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("students");
    })
    .createTable("ratings", function(rating) {
      rating.increments();
      rating
        .integer("rating")
        .unsigned()
        .notNullable();
      rating.date("ratingDate").notNullable();
      rating
        .integer("questionId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("questions");
      rating
        .integer("studentsParentId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("studentsParent");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("ratings")
    .dropTableIfExists("studentsParent")
    .dropTableIfExists("questions")
    .dropTableIfExists("students")
    .dropTableIfExists("classes")
    .dropTableIfExists("parents")
    .dropTableIfExists("teachers");
};
