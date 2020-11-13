const mysql = require('mysql');


const dbConnection = mysql.createConnection({
  user: 'root',
  database: 'tripAdvisor',
  multipleStatements: true
});

dbConnection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + dbConnection.threadId);
});




module.exports = {
  // getPopularMentions: () => {
  //   const reviewTextQ =  `SELECT reviewText AS review FROM reviews WHERE attractionID=${attractionID}`
  // potentially use npm libary to find keywords from review text bodies
  // },

  getMetrics: (attractionID, callback) => {
    const metricQ = {
      totalReviews: `SELECT COUNT(*) AS totalReviews FROM reviews WHERE attractionID=${attractionID}`,
      travelerRatings: `SELECT travelerRating AS rating, COUNT(*) AS total FROM reviews WHERE attractionID=${attractionID} GROUP BY travelerRating`,
      languages: `SELECT reviewLanguage AS language, COUNT(*) AS total FROM reviews WHERE attractionID=${attractionID} GROUP BY reviewLanguage`
    }
    dbConnection.query(`${metricQ.totalReviews}; ${metricQ.travelerRatings}; ${metricQ.languages}`, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result)
      }
    });
  },

  getReviews: (attractionID, callback) => {
    const reviewQ = {
      all: `
      SELECT
        r.attractionID, u.username, u.userLocation, u.contributions, u.profilePhoto,
        r.title, r.dateOfReview, r.reviewText, r.reviewLanguage, r.travelerRating, r.dateOfExperience
      FROM reviews r
      INNER JOIN users u
      WHERE attractionID=${attractionID}
      ORDER BY dateOfReview DESC
      LIMIT 5`,
      users: `SELECT * FROM users u INNER JOIN reviews r WHERE r.attractionID=${attractionID} ORDER BY r.dateOfReview DESC LIMIT 5`
    }
    dbConnection.query(`${reviewQ.all}`,
    (err, results) => {
      if (err) {
        console.log('----went into getAllAttractionReviews ERROR statement')
        throw err;
      } else {
        console.log('----went into getAllAttractionReviews SUCCESS statement');
        // console.log('RESULTS from SQL', results);
        callback(results);
      }
    });
  }

}


// dateOfExperience AS DatePartString (month, '2017/08/25') AS
// SELECT DATENAME(month, '2017/08/25') AS DatePartString;
// SELECT DATENAME(yy, '2017/08/25') AS DatePartString;

