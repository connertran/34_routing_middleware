const items = require("./fakeDb");
const ExpressError = require("./myError");

function findItem(itemName) {
  for (let obj of items) {
    console.log(`inside functions: ${obj.name}`);
    if (obj.name === itemName) {
      return obj;
    }
  }
  throw new ExpressError("Bad Request", 404);
}

function deleteItemFromDb(itemObj) {
  let index;
  for (let obj of items) {
    if (obj === itemObj) {
      index = items.indexOf(obj);
      items.splice(index, 1);
    }
  }
}
module.exports = {
  findItem: findItem,
  deleteItemFromDb: deleteItemFromDb,
};
