import React from 'react';
import styled from 'styled-components';
import TravelerRatingForm from './TravelerRatingForm.jsx';
import TravelerTypeForm from './TravelerTypeForm.jsx';
import TimeOfYearForm from './TimeOfYearForm.jsx';
import LanguageForm from './LanguageForm.jsx';
import PopularMentionsForm from './PopularMentionsForm.jsx';
import SearchBar from './SearchBar.jsx';
import ReviewsList from './ReviewsList.jsx';
import axios from 'axios';

const ReviewsModuleWrapper = styled.div`
  font-family: 'Poppins', sans-serif;
  display: flex;
  justify-content: center;
  width: 600px;
  margin: 0 auto;
  margin-top: -10px;

  .mainFilters{
    background-color: white;
    margin-top: 0;
    padding-top: 12px;
  }

  h1 {
    margin-left: 22px;
  }
`
const FormWrapper = styled.div`
  background-color: white;

  input {
    padding: 12px 0 0 0;
    transition: background-color 0.5s ease-out;
  }

  .filterForm {
    display: flex;
    justify-content: space-between
    width: 100%;
  }
  `
const Filter = styled.div`
  font-size: 12px;
  font-family: arial;
  padding: 8px 8px;

  h2 {
    font-size: 12px;
  }
`;
class ReviewsModule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      attractionID: 1,
      travelerRatingFilter: [],
      travelerTypeFilter: [],
      timeOfYearFilter: [],
      languageFilter: [],
      popularMentionsFilter: [],
      allFilters: {},

      totalReviews: [],
      totalRatings: [],
      totalLanguages: [],
      reviewsList: [],
      popularMentions: []
    };

    this.getReviews = this.getReviews.bind(this);
    this.getMetrics = this.getMetrics.bind(this);
    this.getPopularMentions = this.getPopularMentions.bind(this);
    this.handleFilterClick = this.handleFilterClick.bind(this);
  }

  //when combining components, i will need to put the attractionID in state

  getReviews(attractionID, filters) {
    axios.get(`/api/attractions/${attractionID}/reviews`,
    {params: filters})
    .then((res) => {
      this.setState({
        reviewsList: res.data
      });
    })
    .catch((err) => {
      throw err;
      console.log('unsuccessful get reviews')
    })
  }


  getMetrics(attractionID) {
    axios.get(`/api/attractions/${attractionID}/reviews/metrics`)
    .then((res) => {
      this.setState({
        totalReviews: res.data[0][0].totalReviews,
        totalRatings: res.data[1],
        totalLanguages: res.data[2]
      });
    })
    .catch((err) => {
      throw err;
      console.log('unsuccessful get metrics')
    })
  }

  getPopularMentions(attractionID)
  {
    axios.get(`/api/attractions/${attractionID}/reviews/keywords`)
    .then((res) => {
      this.setState({
        popularMentions: res.data.keywords
      });
    })
    .catch((err) => {
      throw err;
      console.log('unsuccessful get popularmentions')
    })
  }


  handleFilterClick (event) {
  event.preventDefault();
  let key = event.target.className;
  let val = event.target.value;

  let filter = this.state[key];
  key === "languageFilter" ? filter = val : filter.push(val);

  let allFilters =  {
    travelerRating: this.state.travelerRatingFilter,
    travelerType: this.state.travelerTypeFilter,
    timeOfYearFilter: this.state.timeOfYearFilter,
    reviewLanguage: this.state.languageFilter,
    reviewText: this.state.popularMentionsFilter};

   this.setState({
    [key]: filter,
    allFilters: allFilters
    });

  };


  componentDidMount() {
    this.setState ({
      allFilters: {}
    });

    this.getMetrics(this.state.attractionID);
    this.getReviews(this.state.attractionID);
    this.getPopularMentions(this.state.attractionID);
  }


  componentDidUpdate(prevProps, prevState) {
    if(prevState.allFilters !== this.state.allFilters) {
      this.getReviews(this.state.attractionID, this.state.allFilters);
      console.log('component did update');
    }
  }




  render() {

    return (
      <ReviewsModuleWrapper>
        <div className="filtersAndReviewsList">

          <div className="filterReviews">
            <div className ="mainFilters">
            <h1>Reviews</h1>
            <hr />

              <FormWrapper>
                <form className="filterForm">
                  <Filter><TravelerRatingForm ratings={this.state.totalRatings} totalReviews={this.state.totalReviews} handleFilterClick={this.handleFilterClick}/></Filter>
                  <Filter><TravelerTypeForm handleFilterClick={this.handleFilterClick}/></Filter>
                  <Filter><TimeOfYearForm handleFilterClick={this.handleFilterClick}/></Filter>
                  <Filter><LanguageForm languages={this.state.totalLanguages} totalReviews={this.state.totalReviews} handleFilterClick={this.handleFilterClick}/></Filter>
                </form>
              </FormWrapper>

            </div>
            <PopularMentionsForm keywords={this.state.popularMentions} handleFilterClick={this.handleFilterClick}/>

          </div>



          <div className="searchBar">
            <SearchBar handleFilterClick={this.handleFilterClick}/>
          </div>

           <div className="reviewsList">
             <ReviewsList reviewsList={this.state.reviewsList}/>
          </div>

        </div>

      </ReviewsModuleWrapper>
    )
  }


};


export default ReviewsModule;