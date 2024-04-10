process.env.NODE_ENV = "test";
// npm i --save-dev supertest
const request = require("supertest");
const items = require("./fakeDb");

const app = require("./app");

const testingData = { name: "test", price: 1.45 };

beforeEach(function () {
  items.length = 0;
  items.push(testingData);
});

afterEach(function () {
  // make sure this *mutates*, not redefines, `cats`
  items.length = 0;
});

describe("GET /items", function () {
  test("Gets a list of items", async function () {
    const resp = await request(app).get(`/items`);
    expect(resp.statusCode).toBe(200);

    // expect(resp.body).toEqual(data);
  });
});
