const request = require("supertest");
const app = require("../server");

describe("API Tests", () => {
  it("should return a list of all available pets", async () => {
    const response = await request(app).get("/pets/available");

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    console.log(response.body);
  });
});
