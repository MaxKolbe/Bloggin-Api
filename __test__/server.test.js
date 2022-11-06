const supertest = require("supertest")
const app = require("../server")
const userModel = require("../Models/userModel")
const {connectToMongoDB} = require("../db");


beforeAll(async () => {
  // Connect to a Mongo DB
  connectToMongoDB()
});

describe("Login and Register routes", ()=>{
  it("GET / works", async () =>{
    const response = await supertest(app).get("/")
    expect(response.status).toBe(200)
  })

  it('POST /login works', async () => {
    const testUser = {
        email: 'test@email.com',
        password: '12345'
    };
    const response = await supertest(app).post('/login').send(testUser);
    expect(response.status).toBe(302)
})

  it("POST /register works", async () =>{
    const testUser = {
      email: 'maximilianogbuabor@gmail.com',
      first_name: "Maxmillian",
      last_name: "Ogbuabor",
      password: '123'
    }
    const response = await supertest(app).post('/login').send(testUser)
    expect(response.status).toBe(302)
  })

  it("GET /login works", async () =>{
    const response = await supertest(app).get("/login")
    expect(response.status).toBe(200)
  })

  it("GET /register works", async () =>{
    const response = await supertest(app).get("/register")
    expect(response.status).toBe(200)
  })
})