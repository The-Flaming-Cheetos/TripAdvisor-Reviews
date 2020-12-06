const faker = require("faker");
const Seeder = require("mysql-db-seed").Seeder;
const mysql = require('mysql');
const {db} = require('../database/index.js')
// const faker = require('faker/locale/ru');

db.connect();


var maxUserID = 1;
var maxAttractionID = 1;


const seed = new Seeder(
  1,
  "localhost",
  "root",
  "PassW0rd!",
  "tripAdvisor"
);

const photos = [
"https://tripreviews.s3-us-west-1.amazonaws.com/users/002m.jpg",
"https://tripreviews.s3-us-west-1.amazonaws.com/users/003m.jpg",
"https://tripreviews.s3-us-west-1.amazonaws.com/users/006f.jpg",
"https://tripreviews.s3-us-west-1.amazonaws.com/users/013f.jpg",
"https://tripreviews.s3-us-west-1.amazonaws.com/users/014f.jpg",
"https://tripreviews.s3-us-west-1.amazonaws.com/users/015m.jpg",
"https://tripreviews.s3-us-west-1.amazonaws.com/users/016f.jpg",
"https://tripreviews.s3-us-west-1.amazonaws.com/users/017f.jpg",
"https://tripreviews.s3-us-west-1.amazonaws.com/users/018f.jpg",
"https://tripreviews.s3-us-west-1.amazonaws.com/users/020m.jpg",
"https://tripreviews.s3-us-west-1.amazonaws.com/users/022m.jpg",
"https://tripreviews.s3-us-west-1.amazonaws.com/users/023m.jpg",
"https://tripreviews.s3-us-west-1.amazonaws.com/users/024m.jpg",
"https://tripreviews.s3-us-west-1.amazonaws.com/users/026m.jpg",
"https://tripreviews.s3-us-west-1.amazonaws.com/users/027m.jpg",
"https://tripreviews.s3-us-west-1.amazonaws.com/users/029m.jpg",
"https://tripreviews.s3-us-west-1.amazonaws.com/users/030m.jpg",
"https://tripreviews.s3-us-west-1.amazonaws.com/users/031m.jpg",
"https://tripreviews.s3-us-west-1.amazonaws.com/users/032m.jpg",
"https://tripreviews.s3-us-west-1.amazonaws.com/users/033m.jpg",
"https://tripreviews.s3-us-west-1.amazonaws.com/users/039f.jpg",
"https://tripreviews.s3-us-west-1.amazonaws.com/users/040m.jpg",
"https://tripreviews.s3-us-west-1.amazonaws.com/users/041m.jpg",
"https://tripreviews.s3-us-west-1.amazonaws.com/users/067f.jpg",
"https://tripreviews.s3-us-west-1.amazonaws.com/users/071f.jpg",
"https://tripreviews.s3-us-west-1.amazonaws.com/users/071m.jpg"
]


let seedAttractions = async () => {
  for (let i = 0; i <100; i++) {
    (async () => {
      await seed.seed(
        1,
        "attractions",
        {
          attractionName: faker.address.city
        },
      )
      seed.exit();
      process.exit();
    })();

      (async () => {
        await seed.seed(
          1,
          "users",
          {
            username: faker.internet.userName(),
            userLocation: faker.address.city() + ', ' + faker.address.state(),
            contributions: faker.random.number({min: 1, max: 100}),
            profilePhoto: photos[faker.random.number({min: 0, max: 25})]
          },
        )
        seed.exit();
        process.exit();
      })();

  }
}



seedAttractions();


