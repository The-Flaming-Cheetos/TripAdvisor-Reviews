ottoman.model('attractions', {
  attractionId: 'number',
  attractionName: 'string'
});


ottoman.model('users', {
  userId: 'number',
  username: 'string',
  userLocation: 'string',
  contributions: 'number',
  profilePhoto: 'string'
});


ottoman.model('reviews', {
  reviewId: 'number',
  userId: 'number',
  attractionId: 'number',
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