ottoman.model('attractions', {
  attractionID: 'number',
  attractionName: 'string'
});


ottoman.model('users', {
  userID: 'number',
  username: 'string',
  userLocation: 'string',
  contributions: 'number',
  profilePhoto: 'string'
});


ottoman.model('reviews', {
  reviewID: 'number',
  userID: 'number',
  attractionID: 'number',
  helpful: 'number',
  title: 'string',
  reviewText: 'string',
  travelerRating: 'number',
  travelerType: 'string',
  dateOfExperience: 'Date',
  dateOfReview: 'Date',
  reviewLanguage: 'string',
  photos: 'string',
});