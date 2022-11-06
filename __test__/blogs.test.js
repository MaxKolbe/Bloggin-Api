const supertest = require("supertest")
const router = require("../Routes/blogs")
const {connectToMongoDB} = require("../db");



beforeAll(async () => {
  // Connect to a Mongo DB
  connectToMongoDB()
});

describe("Blog routes work", ()=>{
  it("Get /blogs work", async () => {
    const response = await supertest(router).get("/")
    expect(response.status).toBe(200)
  })
})