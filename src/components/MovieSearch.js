import { useState } from 'react';
import { connect } from 'react-redux';

import { addMovieToList } from '../redux/actions/movieList.actions'

import TheMovieDbApiService from '../services/themoviedbApi.service';

import { Container, Row, Col } from 'react-bootstrap';
import MovieCard from './MovieCard';
import SearchBar from './SearchBar';
import MovieModal from './MovieModal';
import MovieDetails from './MovieDetails';

// const example = { "adult": false, "backdrop_path": "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg", "genre_ids": [12, 878, 28], "id": 299534, "original_language": "en", "original_title": "Avengers: Endgame", "overview": "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.", "popularity": 245.575, "poster_path": "/or06FN3Dka5tukK1e9sl16pB3iy.jpg", "release_date": "2019-04-24", "title": "Avengers: Endgame", "video": false, "vote_average": 8.3, "vote_count": 18720 }

/** Movie Search page route: / */
let MovieSearch = ({ addMovieToList }) => {
  const [searchResults, setSearchResults] = useState({ type: "", list: [] });
  const [showModal, setShowModal] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState('');

  /**
   * handler for onClick search button
   * @param {Object} { type: string, query: string }
   */ 
  const handleSearch = async ({ type, query }) => {
    const response = await TheMovieDbApiService.search(type, { query });
    setSearchResults({ type, list: response.results });
  }

  /**
   * handler for onClick add to user list button
   * @param {string|number} id 
   */
  const handleAddToUserList = async (id) => {
    const response = await TheMovieDbApiService.getDetails(searchResults.type, id);
    addMovieToList(response); // will need to expand this with type inside response, let redux handle it
  }

  /**
   * handler for onClick show details button
   * @param {string|number} id 
   */
  const handleOnShowDetails = (id) => {
    setSelectedMovieId("" + id);
    setShowModal(true);
  }

  /**
   * handler for onClose modal button
   */
  const handleModalClose = () => {
    setSelectedMovieId("");
    setShowModal(false);
  }

  return (
    <Container>
      <SearchBar onSearch={handleSearch} />
      <Row>
      {
        showModal && (
          <MovieModal
            show={showModal}
            onClose={handleModalClose}
          >
            <MovieDetails
              movieDbId={selectedMovieId}
              type={searchResults.type}
            />
          </MovieModal>
        )
      }
      {
        Array.isArray(searchResults?.list) && searchResults.list.map((movie) => (
          <Col xs={12} md={6} lg={3} key={movie.id}>
            <MovieCard 
              movie={{ ...movie, type: searchResults.type }}
              onShowDetails={handleOnShowDetails} // showModal
              onAddToMovieList={handleAddToUserList}
            />
          </Col>
        ))
      }
      </Row>
    </Container>
  )
}

const mapStateToProps = state => ({
  movieList: state.movieListReducer,
});

MovieSearch = connect(
  mapStateToProps,
  { addMovieToList },
)(MovieSearch)

// removeMovieFromList

export default MovieSearch;