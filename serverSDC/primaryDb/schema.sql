
DROP DATABASE IF exists postgres;
CREATE DATABASE postgres;

\c postgres;

DROP TABLE IF exists reviews;
DROP TABLE IF exists attractions;
DROP TABLE IF exists users;

CREATE TABLE attractions (
  attractionId INT NOT NULL PRIMARY KEY,
  attractionName VARCHAR(500),
  type VARCHAR(50)
);


CREATE TABLE users (
  userId INT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  userLocation VARCHAR(500),
  contributions INT,
  profilePhoto VARCHAR(500),
  type VARCHAR(50)
);


CREATE TABLE reviews (
  reviewId int PRIMARY KEY,
  userId int NOT NULL,
  attractionId int NOT NULL,
  helpful INT,
  title VARCHAR(800),
  reviewText text NOT NULL,
  travelerRating INT,
  travelerType VARCHAR(200),
  dateOfExperience DATE,
  dateOfReview DATE,
  reviewLanguage VARCHAR(200),
  photos VARCHAR(500),
  type VARCHAR(50),
  FOREIGN KEY (userId) REFERENCES users(userId),
  FOREIGN KEY (attractionId) REFERENCES attractions(attractionId)
);


