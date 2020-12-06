
DROP DATABASE IF exists tripAdvisor;
CREATE DATABASE tripAdvisor;

USE tripAdvisor;

CREATE TABLE attractions (
  attractionID int NOT NULL AUTO_INCREMENT,
  attractionName VARCHAR(250),

  PRIMARY KEY (attractionID)
);

CREATE TABLE users (
  userID int NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  userLocation VARCHAR(250),
  contributions INT,
  profilePhoto VARCHAR(250),
  PRIMARY KEY (userID)
);


CREATE TABLE reviews (
  reviewID int NOT NULL AUTO_INCREMENT,
  userID int NOT NULL,
  attractionID int NOT NULL,

  title  VARCHAR(200),
  reviewText text NOT NULL,
  travelerRating INT,
  travelerType VARCHAR(50),
  dateOfExperience DATE,
  dateOfReview DATE,
  reviewLanguage VARCHAR(200),
  photos VARCHAR(200),

  PRIMARY KEY (reviewID),
  FOREIGN KEY (userID) REFERENCES users(userID),
  FOREIGN KEY (attractionID) REFERENCES attractions(attractionID)
);


