require("dotenv").config();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Person = require("./models/Person");

// connect mongoose
const uri = process.env.MONGO_URI;
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err));

//   create new person
const person = new Person({
  name: "temijope",
  age: 25,
  email: "temijeje@gmail.com",
  favoriteFruits: ["coconut", "apples", "mango"],
  isAfrican: true,
});

// save person

person
  .save()
  .then((savedPerson) => console.log(savedPerson))
  .catch((res) => console.log(res));

//   find one person

Person.findOne({ favoriteFruits: "coconut" })
  .then((foundPerson) => console.log("Person found;", foundPerson))
  .catch((err) => console.log(err.message));

const newPerson = async () => {
  try {
    const newPerson = await Person.create({
      name: "jones",
      age: 22,
      email: "jones1234@yahoo.com",
      favoriteFruits: ["nuts", "guava"],
    });
    console.log(newPerson);
  } catch (err) {
    console.log(err);
  }
};

newPerson();

const arrayOfPeople = [
  {
    name: "Shrimp",
    age: 17,
    favoriteFruits: ["pineapple", "banana", "lemon"],
    email: "shrimpisasimp@gmail.com",
    isAfrican: true,
  },
  {
    name: "ngozi",
    age: 21,
    favoriteFruits: ["strawberry", "apple", "mango"],
    isAfrican: true,
    email: "ngozi@hotmail.com",
  },
  {
    name: "amy",
    age: 20,
    favoriteFruits: ["grape", "orange", "walnut"],
    email: "amymodella@gmail.com",
    isAfrican: false,
  },
];

Person.create(arrayOfPeople)
  .then((people) => console.log(people))
  .catch((err) => console.log(err));

Person.find({ name: "temi" })
  .then((foundPerson) => console.log(`found the data ${foundPerson}`))
  .catch((err) => console.log(err.message));

//   find by ID
Person.findById("66e0148970d84f3523687a7a")
  .then((updatePerson) => {
    if (updatePerson) {
      updatePerson.favoriteFruits.push("watermelon");
      return updatePerson.save();
    } else {
      console.log("user not found");
    }
  })
  .then((personUpdate) =>
    console.log("favourite fruit successfully updated: ", personUpdate)
  )
  .catch((err) => console.log(err.message));

//   using findOneAndUpdate
Person.findOneAndUpdate({ name: "amy" }, { age: 23 }, { new: true })
  .then((updated) => console.log(`updated: ${updated}`))
  .catch((err) => console.log(err.message));

//   using findByIdAndDelete
Person.findByIdAndDelete("66dffe36bf38f27ddfaf448f")
  .then((deletedPerson) => console.log("deleted successfully: ", deletedPerson))
  .catch((err) => console.log(err.message));

//   chain search query helpers

async function getPersons() {
  try {
    const persons = await Person.find({ age: { $gte: 17 } })
      .sort({ age: 1 })
      .limit(10);

    console.log("Persons include: ", persons);
  } catch (err) {
    console.log("Error: ", err.message);
  }
}

getPersons();
