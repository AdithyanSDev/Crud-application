const mongoose = require('mongoose');

// Define the schema
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    enum:['user','admin'],
    default:'user'
  },
  gender: String,
  status: String,
});

// Create the UserDB model using the schema
const UserDB = mongoose.model('User', schema);

// Export the UserDB model
module.exports = UserDB;
