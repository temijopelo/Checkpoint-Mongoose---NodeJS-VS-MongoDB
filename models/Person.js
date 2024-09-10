const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  email: { type: String, required: true },
  favoriteFruits: [String],
  isAfrican: Boolean,
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
