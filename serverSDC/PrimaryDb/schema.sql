
DROP DATABASE IF exists tripAdvisor;
CREATE DATABASE tripAdvisor;

USE tripAdvisor;

CREATE TABLE attractions (
  attractionId INT NOT NULL PRIMARY KEY,
  attractionName VARCHAR(250)
);

CREATE TABLE users (
  userId INT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  userLocation VARCHAR(250),
  contributions INT,
  profilePhoto VARCHAR(250)
);


CREATE TABLE reviews (
  reviewId int PRIMARY KEY,
  userId int NOT NULL,
  attractionId int NOT NULL,
  helpful INT,
  title  VARCHAR(200),
  reviewText text NOT NULL,
  travelerRating INT,
  travelerType VARCHAR(50),
  dateOfExperience DATE,
  dateOfReview DATE,
  reviewLanguage VARCHAR(200),
  photos VARCHAR(200),
  FOREIGN KEY (userId) REFERENCES users(userId),
  FOREIGN KEY (attractionId) REFERENCES attractions(attractionId)
);


