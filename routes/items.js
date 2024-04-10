const express = require("express");
const router = express.Router();
const items = require("../fakeDb");
const { findItem, deleteItemFromDb } = require("../functions");
const ExpressError = require("../myError");

const data1 = { name: "popsicle", price: 1.45 };
const data2 = { name: "cheerios", price: 3.4 };

items.push(data1);
items.push(data2);

router.get("/", function (req, res) {
  return res.json(items);
});

router.post("/", function (req, res, next) {
  try {
    if (!req.body.name || !req.body.price) {
      throw new ExpressError("Info is missing", 400);
    }
    const newItem = {
      name: req.body.name,
      price: req.body.price,
    };
    items.push(newItem);
    return res.status(201).json({ added: newItem });
  } catch (e) {
    return next(e);
  }
});

router.get("/:name", function (req, res, next) {
  console.log(items);
  try {
    const itemObj = findItem(req.params.name);
    return res.json(itemObj);
  } catch (e) {
    return next(e);
  }
});

router.patch("/:name", function (req, res, next) {
  try {
    const itemObj = findItem(req.params.name);
    itemObj.name = req.body.name;
    itemObj.price = req.body.price;
    return res.json({ updated: itemObj });
  } catch (e) {
    return next(e);
  }
});

router.delete("/:name", function (req, res, next) {
  try {
    const itemObj = findItem(req.params.name);
    deleteItemFromDb(itemObj);
    return res.json({ messages: "Deleted" });
  } catch (e) {
    return next(e);
  }
});
module.exports = router;
