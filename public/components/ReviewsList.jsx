import React from 'react';
import UserHeader from './UserHeader.jsx';
import ReviewBody from './ReviewBody.jsx';
import styled from 'styled-components';

const ReviewEntry = styled.div`
margin-bottom: 12px;
background-color: white;
`;


const ReviewsList = ({reviewsList}) => {
  return (
    <div>
      <div>
        {reviewsList.map((review, i) => (
          <ReviewEntry key={i}>
            <UserHeader name={review.username} profilePhoto={review.profilePhoto} reviewDate={review.dateOfReview} location={review.userLocation} contributions={review.contributions}/>
            <ReviewBody rating={review.travelerRating} title={review.title} text={review.reviewText} experienceDate={review.dateOfExperience}/>
          </ReviewEntry>
        ))}
      </div>

    </div>
  )

}


export default ReviewsList;