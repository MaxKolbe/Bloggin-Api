//Require mongoose
const mongoose = require("mongoose")

//Defining a schema
const Schema = mongoose.Schema

//Defining a user schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: [true, 'Email must be unique']
  }, 
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Users', userSchema)