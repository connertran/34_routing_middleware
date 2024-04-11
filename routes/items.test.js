process.env.NODE_ENV = "test";
// npm i --save-dev supertest
const request = require("supertest");
const items = require("../fakeDb");

const app = require("../app");

const testingData = { name: "test", price: 1.45 };

beforeEach(function () {
  items.length = 0;
  items.push(testingData);
});

afterEach(function () {
  // make sure this *mutates*, not redefines, `cats`
  items.length = 0;
});

// get method

describe("GET /items", function () {
  test("Gets a list of items", async function () {
    const resp = await request(app).get(`/items`);
    expect(resp.statusCode).toBe(200);

    expect(items).toHaveLength(1);
  });
});

describe("GET /items/:name", function () {
  test("Gets a single item", async function () {
    const response = await request(app).get(`/items/${testingData.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(testingData);
  });
});

// post method
describe("POST /items", function () {
  test("Creates a new item", async function () {
    const res = await request(app).post(`/items/`).send({
      name: "test2",
      price: 3.2,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.added.name).toEqual("test2");
    expect(res.body.added.price).toEqual(3.2);
  });
});

// path method
describe("PATCH /items/:name", function () {
  test("Updates a single item", async function () {
    const response = await request(app)
      .patch(`/items/${testingData.name}`)
      .send({
        name: "Onion",
        price: 2,
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.updated).toEqual({
      name: "Onion",
      price: 2,
    });
  });

  test("Responds with 404 if can't find item", async function () {
    const response = await request(app).patch(`/items/0`);
    expect(response.statusCode).toBe(404);
  });
});

// delete method
describe("DELETE /items/:name", function () {
  test("Deletes a single a item", async function () {
    const response = await request(app).delete(`/items/${testingData.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ messages: "Deleted" });
  });
});
