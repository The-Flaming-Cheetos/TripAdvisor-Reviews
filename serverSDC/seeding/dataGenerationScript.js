const {name, date, random, address} = require("faker");
const fs = require('fs');

var maxUser = 100000;
var maxAttraction = 10;

//Create Users
var createUsers = (userId) => {
  var userRecord = `${userId},${name.firstName()} ${name.lastName()},${address.state()} ${address.country()},${random.number({min: 1, max: 100})},https://tripadvisor-sdc-bkt.s3-us-west-1.amazonaws.com/userprofile/${random.number({min: 0, max: 59})}.jpg`
  return userRecord;
}

//create attraction
var createAttractions = (attractionId) => {
  var attractionRecord = `${attractionId},${address.streetName()}`;
  return attractionRecord;
}

//Create Reviews
var createReviews =(reviewId, userId, AttractionId) => {
  var dateOfExperience = date.between('2020-11-17', '2016-12-31');
  var dateOfReview = date.between('2020-11-17', dateOfExperience);
  var travelerTypes = ["Families", "Couples", "Solo", "Business", "Friends"];
  var reviewLanguages = ["English", "Chinese (Trad.)", "Japanese", "French", "German", "Spanish", "Italian", "Danish", "Korean", "Hebrew"];
  var years = ["2012", "2014", "2015", "2017", "2018", "2019", "2020"];

  var review =
    reviewId + ',' +
    userId + ',' +
    AttractionId + ',' +
    0 +',' +
    '"' + random.words(8) + '"' + ',' +
    '"' + random.words(120) + '"'  + ',' +
    random.number({min: 1, max: random.number({min: 1, max: 5})}) + ',' +
    travelerTypes[random.number({min: 0, max: 4})] + ',' +
    dateOfExperience.getFullYear()+'-'+dateOfExperience.getMonth()+'-'+dateOfExperience.getDate() + ',' +
    dateOfReview.getFullYear()+'-'+dateOfReview.getMonth()+'-'+dateOfReview.getDate() + ',' +
    reviewLanguages[random.number({min: 0, max: 9})]+ ',' +'https://tripadvisor-sdc-bkt.s3-us-west-1.amazonaws.com/attractions/'+random.number({min: 0, max: 99})+'.jpg'+'\n';

    return review;
}

'reviewID,userID,attractionID,helpful,title,reviewText,travelerRating,travelerType,dateOfExperience,dateOfReview,reviewLanguage,photos'

//for every attraction you need to have randon(0 - 12) reviews
//iterate through attraction and create a random number for for loop of review
//increment for reviewID
//increment for attractionId
//reviewCntPerAttracntIteration and increment attractionID

var writeReviewsToCSV = (writer, maxAttraction) => {
  var attrCounter = 1;
  var reviewCounter = random.number({min: 0, max:12});
  var userId = random.number({min: 0, max:maxUser});
  var reviewID = 0;
  var writeOk = true;

  var write = () => {
    while(attrCounter < maxAttraction && writeOk) {

      //load header for the first line, hence load when reviewId = 0
      if(reviewID === 0) {
        data='reviewID,userID,attractionID,helpful,title,reviewText,travelerRating,travelerType,dateOfExperience,dateOfReview,reviewLanguage,photos';
      } else {
        data = createReviews(reviewID, userId, attrCounter);
      }

      // console.log('data',data);

      if (attrCounter === maxAttraction) {
        // Last time!
        writer.write(data);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        writeOk = writer.write(data);
      }

      if (reviewCounter === 0) {
        attrCounter = attrCounter + 1;
        reviewCounter = random.number({min: 0, max:12});
      }
      // console.log('reviewCounter',reviewCounter);
      reviewCounter--;
      reviewID++;
    }
  }
  write();
  if (attrCounter < maxAttraction) {
          // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
  }

}

// console.log('writeReviewsToCSV', writeReviewsToCSV());

//write data to CSV file mentioned in writer and specify i as the number of lines to write
function createCSV(writer, i, callback) {
  // let i = 1000000;

  write();
  function write() {
    let ok = true;
    do {
      i--;
      data=callback(i+1);
      if (i === 0) {
        // Last time!
        writer.write(data);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(data);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
}



//writeOneMillionTimes(writer);

//create CSV for Users
var usersWriteStream = fs.createWriteStream('./files/usersData.csv');
createCSV(usersWriteStream, maxUser, createUsers);
//create CSV for attraction
var attrWriteStream = fs.createWriteStream('./files/attractionData.csv');
createCSV(attrWriteStream, maxAttraction, createAttractions);
//create CSV for Reviews
var reviewWriteStream = fs.createWriteStream('./files/reviewsData.csv');
writeReviewsToCSV(reviewWriteStream, maxAttraction);



