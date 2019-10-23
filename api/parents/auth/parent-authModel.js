const db = require("../../../data/dbConfig");

module.exports = { addParent, findParentBy };

function addParent(parent) {
  return db("parents")
    .insert(parent)
    .then(ids => ({ id: ids[0] }));
}

function findParentBy(filter) {
  return db("parents").where(filter);
}
