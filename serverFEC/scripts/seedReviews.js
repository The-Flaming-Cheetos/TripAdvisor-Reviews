const faker = require("faker");
const Seeder = require("mysql-db-seed").Seeder;
const mysql = require('mysql');
const {db} = require('../database/index.js')

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



let maxAttractionIdQuery = ()=> {
  db.query('SELECT attractionID FROM attractions ORDER BY attractionID DESC LIMIT 0, 1', (err, results) => {
    if(err) {
      console.log(err);
    } else {
      results[0]? maxAttractionID = results[0].attractionID : null;
      console.log('max attraction id------------', maxAttractionID);
      maxUserIDQuery();
    }
    });
}



let maxUserIDQuery = () => {
  db.query('SELECT userID FROM users ORDER BY userID DESC LIMIT 0, 1', (err, results) => {
    if(err) {
      console.log(err);
    } else {
      results[0]? maxUserID = results[0].userID : null;
      console.log('max user id------------', maxUserID);
      seedReviews();
    }
  });
}


let seedReviews = async () => {

  for(let i = 0; i < 2500; i++) {

  (async () => {
    var travelerTypes = ["Families", "Couples", "Solo", "Business", "Friends"];
    var reviewLanguages = ["English", "Chinese (Trad.)", "Japanese", "French", "German", "Spanish", "Italian", "Danish", "Korean", "Hebrew"];
    var years = ["2012", "2014", "2015", "2017", "2018", "2019", "2020"];
    var pics = ["https://tripreviews.s3-us-west-1.amazonaws.com/places/the-winchester-mystery.jpg", "https://tripreviews.s3-us-west-1.amazonaws.com/places/download-1.jpg","https://tripreviews.s3-us-west-1.amazonaws.com/places/download-2.jpg", "https://tripreviews.s3-us-west-1.amazonaws.com/places/download.jpg","https://tripreviews.s3-us-west-1.amazonaws.com/places/pexels-aadil-2884866.jpg", "https://tripreviews.s3-us-west-1.amazonaws.com/places/pexels-aadil-3742639.jpg", "https://tripreviews.s3-us-west-1.amazonaws.com/places/pexels-aadil-5236075.jpg", "https://tripreviews.s3-us-west-1.amazonaws.com/places/pexels-alex-azabache-3214975.jpg", "https://tripreviews.s3-us-west-1.amazonaws.com/places/pexels-clicker-finger-5788811.jpg", "https://tripreviews.s3-us-west-1.amazonaws.com/places/the-winchester-mystery.jpg","https://tripreviews.s3-us-west-1.amazonaws.com/places/download-1.jpg","https://tripreviews.s3-us-west-1.amazonaws.com/places/download-2.jpg", "https://tripreviews.s3-us-west-1.amazonaws.com/places/download.jpg","https://tripreviews.s3-us-west-1.amazonaws.com/places/pexels-aadil-2884866.jpg", "https://tripreviews.s3-us-west-1.amazonaws.com/places/pexels-aadil-3742639.jpg", "https://tripreviews.s3-us-west-1.amazonaws.com/places/pexels-aadil-5236075.jpg", "https://tripreviews.s3-us-west-1.amazonaws.com/places/pexels-alex-azabache-3214975.jpg", "https://tripreviews.s3-us-west-1.amazonaws.com/places/pexels-clicker-finger-5788811.jpg"];

    await seed.seed(
      1,
      "reviews",
      {
        attractionID: faker.random.number({min: 1, max: 2}),
        userID: faker.random.number({min: 1, max: maxUserID}),
        title: faker.random.words(8),
        reviewText: faker.random.words(120),
        dateOfExperience: faker.date.between('2020-11-17', '2016-12-31'),
        dateOfReview: faker.date.between('2020-11-17', '2016-12-31'),
        // dateOfExperience: faker.date.month() + ' ' + years[faker.random.number({min: 0, max: 6})],
        // dateOfReview: faker.date.month() + ' ' + years[faker.random.number({min: 0, max: 6})],
        travelerRating: faker.random.number({min: 1, max: faker.random.number({min: 1, max: 5})}),
        travelerType: travelerTypes[faker.random.number({min: 0, max: 4})],
        reviewLanguage: reviewLanguages[faker.random.number({min: 0, max: 9})],
        photos: pics[faker.random.number({min: 0, max: 16})]
      }
    )
    seed.exit();
    process.exit();
  })();
}
}


maxAttractionIdQuery();

