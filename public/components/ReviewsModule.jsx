import React from 'react';
import styled from 'styled-components';
import AllForms from './AllForms.jsx';
import SearchBar from './SearchBar.jsx';
import ReviewsList from './ReviewsList.jsx';
import axios from 'axios';

const ReviewsModuleWrapper = styled.div`
  font-family: 'Poppins', sans-serif;
  display: flex;
  justify-content: center;
  width: 900px;
  padding-top: 12px;
  margin: 0 auto;
  margin-top: -10px;

  .mainFilters{
    background-color: white;
    margin-top: 0;
  }

  h1 {
  padding-top: 22px;
    margin-left: 22px;
  }
`;

class ReviewsModule extends React.Component {
  constructor(props) {
    super(props);




  // travelerRating: this.state.travelerRatingFilter,
  //       travelerType: this.state.travelerTypeFilter,
  //       timeOfYearFilter: this.state.timeOfYearFilter,
  //       reviewLanguage: this.state.languageFilter,
  //       reviewText: this.state.popularMentionsFilter,
  //       [key]: selected




    this.state = {
      attractionID: 1,
      travelerRating: [],
      travelerType: [],
      timeOfYearFilter: [],
      reviewLanguage: ["allLanguages"],
      reviewText: [],
      query: "",
      allFilters: {
      travelerRating: [],
      travelerType: [],
      timeOfYearFilter: [],
      reviewLanguage: [],
      reviewText: [],
      offset: 0
      },

      totalReviews: [],
      totalRatings: [],
      totalLanguages: [],
      reviewsList: [],
      popularMentions: [],
      offset: 0
    };

    this.getReviews = this.getReviews.bind(this);
    this.getMetrics = this.getMetrics.bind(this);
    this.getPopularMentions = this.getPopularMentions.bind(this);
    this.handleFilterClick = this.handleFilterClick.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.offsetAndSearch = this.offsetAndSearch.bind(this);
  }

  //when combining components, i will need to put the attractionID in state

  //if statement, if the filters object exists
  getReviews(attractionID, filters) {
    axios.get(`/api/attractions/${attractionID}/reviews`,
    {params: filters})
    .then((res) => {
      console.log(res.data);
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


  handleFilterClick (event, word) {
  // event.preventDefault();

  let key = event.target.className;
  let val = event.target.value;

  var selected = this.state[key];


  //language filter
  if(event.target.checked === true && key === "reviewLanguage") {
    selected[0] = val;
  };

  //console.log(key, val, selected);
  //if i check my target
  if (key === "reviewText" && val === "allReviews") {
    selected = [];
  } else if((event.target.checked === true && selected.includes(val) === false)
  || key === "reviewText" && !selected.includes(val)){
    selected.push(val);
  } else if (key === "reviewText" && selected.includes(val)) {
    selected = selected.filter(item => item !== val);
  }

   if(event.target.checked === false ) {
    selected = selected.filter(item => item !== val);
  }

  let all = this.state.allFilters;
  all[key] = selected;
  all.offset = 0;

  this.setState({
    [key]: selected,
    offset: 0,
    allFilters: all
  });

  this.getReviews(this.state.attractionID, this.state.allFilters);
  };



offsetAndSearch(e) {
  if(e.target.name === "previous" && this.state.offset !== 0) {
    let newOffset = this.state.offset - 5;

    let all = this.state.allFilters;
    all.offset = newOffset;
    this.setState({
      offset: newOffset,
      allFilters: all
    });
  }
    if (e.target.name === "next" && this.state.offset < this.state.totalReviews/5) {
    let newOffset = this.state.offset + 5;

    let all = this.state.allFilters;
    all.offset = newOffset;
    this.setState({
      offset: newOffset,
      allFilters: all
    });
  }

  this.getReviews(this.state.attractionID, this.state.allFilters);
//bug: doesnt work on next when there are no other keys within all filters,
//allFilter = {offset: 0}
//fix on serverside

}





  handleSearchChange (e) {
      this.setState({
        query: [e.target.value]
      });

  }

  handleSearchSubmit (event) {
    event.preventDefault()
    // if(event.key === "Enter"){
    //   this.setState({
    //     query: [e.target.value]
    //   });
    // }
    // on submit make a new state called full query?
  };



  componentDidMount() {
    this.getMetrics(this.state.attractionID);
    this.getReviews(this.state.attractionID);
    this.getPopularMentions(this.state.attractionID);
  }







  render() {

    return (
      <ReviewsModuleWrapper>
        <div className="filtersAndReviewsList">

          <div className="filterReviews">
            <div className ="mainFilters">
              <h1>Reviews</h1>
              <hr />
              <AllForms ratings={this.state.totalRatings} totalReviews={this.state.totalReviews} handleFilterClick={this.handleFilterClick} languages={this.state.totalLanguages} keywords={this.state.popularMentions}/>
            </div>
          </div>

          <div className="searchBar">
            <SearchBar handleSearchChange={this.handleSearchChange} selectedPopularMentions={this.state.reviewText} handleSearchSubmit={this.handleSearchSubmit} query={this.state.query}/>
          </div>

           <div className="reviewsList">
             <ReviewsList reviewsList={this.state.reviewsList} keywords={this.state.reviewText} offsetAndSearch={this.offsetAndSearch}/>
          </div>

        </div>

      </ReviewsModuleWrapper>
    )
  }


};


export default ReviewsModule;
