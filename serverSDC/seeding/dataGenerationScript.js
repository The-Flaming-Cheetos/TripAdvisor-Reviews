const {name, date, random, address} = require("faker");
const fs = require('fs');

var maxUser = 100000;
var maxAttraction = 10000000;

//Create Users
var createUsers = (userId, maxUser) => {
  var userRecord = `${userId},${name.firstName()} ${name.lastName()},${address.state()} ${address.country()},${random.number({min: 1, max: 100})},https://tripadvisor-sdc-bkt.s3-us-west-1.amazonaws.com/userprofile/${random.number({min: 0, max: 59})}.jpg,userprofile\n`;
  if(userId === maxUser) {
    return 'userId,username,userLocation,contributions,profilePhoto,type\n';
  } else {
    return userRecord;
  }
}

//create attraction
var createAttractions = (attractionId, maxAttraction) => {
  var attractionRecord = `${attractionId},${address.streetName()},attraction\n`;
  if(attractionId === maxAttraction) {
    return 'attractionId,attractionName,type\n';
  } else {
    return attractionRecord;
  }
}

//Create Reviews
var createReviews =(reviewId, attractionId, reviewIdStart) => {
  var dateOfExperience = random.number({min: 1995, max: 2019})+'-'+random.number({min: 1, max: 12})+'-'+random.number({min: 1, max: 27});
  var dateOfReview = random.number({min: 1995, max: 2019})+'-'+random.number({min: 1, max: 12})+'-'+random.number({min: 1, max: 30});
  var travelerTypes = ["Families", "Couples", "Solo", "Business", "Friends"];
  var reviewLanguages = ["English", "Chinese (Trad.)", "Japanese", "French", "German", "Spanish", "Italian", "Danish", "Korean", "Hebrew"];
  var userId = random.number({min: 0, max:maxUser});

  var review =`${reviewId},${userId},${attractionId},0,"${random.words(5)}","${random.words(10)}",${random.number({min: 1, max:5})},${travelerTypes[random.number({min: 0, max: 4})]},${dateOfExperience},${dateOfReview},${reviewLanguages[random.number({min: 0, max: 9})]},https://tripadvisor-sdc-bkt.s3-us-west-1.amazonaws.com/attractions/${random.number({min: 0, max: 99})}.jpg,reviews\n`;

    //load header for the first line, hence load when reviewId = 0
    if (reviewId === reviewIdStart) {
      return 'reviewId,userId,attractionId,helpful,title,reviewText,travelerRating,travelerType,dateOfExperience,dateOfReview,reviewLanguage,photos,type\n';
    } else {
      return review;
    }
}

var createReviewsCustom =(reviewId, maxAttraction, {travelerTypes, reviewLanguages, reviewIdStart, dateOfExperience, dateOfReview}) => {
  // var dateOfExperience = random.number({min: 1995, max: 2019})+'-'+random.number({min: 1, max: 12})+'-'+random.number({min: 1, max: 27});
  // var dateOfReview = random.number({min: 1995, max: 2019})+'-'+random.number({min: 1, max: 12})+'-'+random.number({min: 1, max: 30});
  // var travelerTypes = ["Families", "Couples", "Solo", "Business", "Friends"];
  // var reviewLanguages = ["English", "Chinese (Trad.)", "Japanese", "French", "German", "Spanish", "Italian", "Danish", "Korean", "Hebrew"];
  var userId = random.number({min: 0, max:maxUser});
  attractionId = reviewId+1;

  var review =`${reviewIdStart + reviewId},${userId},${reviewId},0,"${random.words(5)}","${random.words(10)}",${random.number({min: 1, max:5})},${travelerTypes},${dateOfExperience},${dateOfReview},${reviewLanguages},https://tripadvisor-sdc-bkt.s3-us-west-1.amazonaws.com/attractions/${random.number({min: 0, max: 99})}.jpg,reviews\n`;

    //load header for the first line, hence load when reviewId = 0
    if (reviewId === maxAttraction) {
      return 'reviewId,userId,attractionId,helpful,title,reviewText,travelerRating,travelerType,dateOfExperience,dateOfReview,reviewLanguage,photos,type\n';
    } else {
      return review;
    }
}

//'reviewId,userId,attractionId,helpful,title,reviewText,travelerRating,travelerType,dateOfExperience,dateOfReview,reviewLanguage,photos'

//for every attraction you need to have randon(0 - 12) reviews
//iterate through attraction and create a random number for for loop of review
//increment for reviewID
//increment for attractionId
//reviewCntPerAttracntIteration and increment attractionID

var writeReviewsToCSV = (writer, maxAttraction, increment, reviewIdStart) => {
  var attrCounter = 1;
  var reviewCounter = random.number({min: 0, max:12});
  var reviewId = reviewIdStart;
  var writeOk = true;

  var write = () => {
    // console.log('I am inside write');

    do {

      data = createReviews(reviewId, attrCounter, reviewIdStart);

      // console.log('data',data);

      if (attrCounter === maxAttraction) {
        // Last time!
        writer.write(data);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        writeOk = writer.write(data);
        //console.log('writeOk',writeOk);
      }

      if (reviewCounter <=0) {
        attrCounter = attrCounter + increment;
        reviewCounter = random.number({min: 0, max:12});
      }
      //  console.log('attrCounter---------'+attrCounter+'--------before reviewCounter-------------------:'+reviewCounter);
      reviewCounter = reviewCounter-1;
      //  console.log('attrCounter---------'+attrCounter+'--------after reviewCounter-------------------:'+reviewCounter);
      reviewId++;
    } while(attrCounter < maxAttraction && writeOk)

    if (attrCounter < maxAttraction) {
      // Had to stop early!
      // Write some more once it drains.
      // console.log('Inside Drain',writeOk);
      // console.log('attrCounter',attrCounter);
      writer.once('drain', write);

    }
  }

  write();
}

// console.log('writeReviewsToCSV', writeReviewsToCSV());

//write data to CSV file mentioned in writer and specify i as the number of lines to write
function createCSV(writer, maxLimit, callback, callbackArg, decrement) {
  // let i = 1000000;
  let i = maxLimit;

  write();
  function write() {
    let ok = true;
    do {
      data=callback(i, maxLimit, callbackArg);
      i=decrement>0?i-decrement:i-1;
      if (i <= 0) {
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
// var usersWriteStream = fs.createWriteStream('./files/usersData.csv');
// createCSV(usersWriteStream, maxUser, createUsers);
// //create CSV for attraction
// var attrWriteStream = fs.createWriteStream('./files/attractionData.csv');
// createCSV(attrWriteStream, maxAttraction, createAttractions);
//create CSV for Reviews
var reviewWriteStream = fs.createWriteStream('./files/reviewsData.csv');
writeReviewsToCSV(reviewWriteStream, maxAttraction, 36, 50000001);
// var reviewWriteStream1 = fs.createWriteStream('./files/reviewsData1.csv');
// createCSV(reviewWriteStream1, maxAttraction, createReviewsCustom, {travelerTypes: 'Families', reviewLanguages: 'English', reviewIdStart: 1, dateOfExperience:'2016-10-18', dateOfReview:'2016-11-03'});
// var reviewWriteStream2 = fs.createWriteStream('./files/reviewsData2.csv');
// createCSV(reviewWriteStream2, maxAttraction, createReviewsCustom, {travelerTypes: 'Couples', reviewLanguages: 'Chinese (Trad.)', reviewIdStart: 10000001, dateOfExperience:'2016-10-18', dateOfReview:'2016-11-03'});
// var reviewWriteStream3 = fs.createWriteStream('./files/reviewsData3.csv');
// createCSV(reviewWriteStream3, maxAttraction, createReviewsCustom, {travelerTypes: 'Solo', reviewLanguages: 'Japanese', reviewIdStart: 20000001, dateOfExperience:'2017-09-21', dateOfReview:'2017-10-21'}, 3);
// var reviewWriteStream4 = fs.createWriteStream('./files/reviewsData4.csv');
// createCSV(reviewWriteStream4, maxAttraction, createReviewsCustom, {travelerTypes: 'Business', reviewLanguages: 'French', reviewIdStart: 30000001, dateOfExperience:'2018-10-18', dateOfReview:'2018-11-03'},6);
// var reviewWriteStream5 = fs.createWriteStream('./files/reviewsData5.csv');
// createCSV(reviewWriteStream5, maxAttraction, createReviewsCustom, {travelerTypes: 'Friends', reviewLanguages: 'German', reviewIdStart: 40000001, dateOfExperience:'2016-10-18', dateOfReview:'2016-11-03'},9);




  // var travelerTypes = ["Families", "Couples", "Solo", "Business", "Friends"];
  // var reviewLanguages = ["English", "Chinese (Trad.)", "Japanese", "French", "German", "Spanish", "Italian", "Danish", "Korean", "Hebrew"];