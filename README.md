# Questions and Answers API Endpoints
* [Create Reviews] (#CREATE)
* [Read Reviews] (#READ)
* [Update helpful flag] (#UPDATE)
* [Delete Review] (#DELETE)

## CREATE
    Users are allowed to create Reviews
### End Points:
    POST /api/attractions/:attractionid
### Path Parameters 
    attractionid - integer; 
### Default Response: 
    200 CREATED
`[
 {
    "attractionID": 1,
    "reviewId": 1,
    "username": "Delbert29",
    "userLocation": "Sethhaven, Maryland",
    "contributions": 1,
    "profilePhoto": "http://placeimg.com/640/480/people",
    "title": "Guinea Ridge Reverse-engineered 24/7 Gorgeous index Account De-engineered Health index SQL Liaison",
    "dateOfReview": "2020-11-13T08:00:00.000Z",
    "reviewText": "Gorgeous Tanzania Caribbean 5th engineer Triple-buffered Account methodologies innovate Car tertiary Account Integrated Awesome invoice plum Factors exploit hierarchy Unbranded quantify HDD service-desk mission-critical Gloves Books payment Cambridgeshire Legacy Keyboard PCI Producer Licensed users payment Money Tasty Multi-tiered Crest Handmade Shoes cyan Global database circuit Paradigm Grocery Louisiana tangible Unbranded",
    "reviewLanguage": "Spanish",
    "travelerRating": 3,
    "dateOfExperience": "2020-11-12T08:00:00.000Z"
  }
]`
### Fail Response
    Unable to post review: 400 BAD REQUEST
