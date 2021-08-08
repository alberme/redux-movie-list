import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getMovieList, removeMovieFromList } from '../redux/actions/movieList.actions';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';
import MovieDetails from './MovieDetails';
import YouTubeEmbed from './YouTubeEmbed';

import { Container, Row, Col } from 'react-bootstrap';


/** User Movie List page route: /movie-list */
let UserMovieList = ({ movieList, getMovieList, removeMovieFromList }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(''); 
  /**
   * handler for show details button on a MovieCard
   * @param {string} id 
   */
  const handleOnShowDetails = (id) => {
    setSelectedMovieId(id);
    setShowModal(true);
  }

  /**
   * handler for close button on MovieModal
   */
  const handleModalClose = () => {
    setSelectedMovieId("");
    setShowModal(false);
  }
  
  useEffect(() => {
    getMovieList();
  }, [getMovieList])

  return (
    <Container>
      <h1>My Movie List</h1>
      <Row>
      {
        showModal && (
          <MovieModal
            show={showModal}
            onClose={handleModalClose}
          >
            <MovieDetails
              movieDbId={selectedMovieId}
              
            />
          </MovieModal>
        )
      }
      {
        movieList && movieList.list && movieList.list.map((movie) => (
          <Col xs={12} md={6} lg={3} key={movie.imdbID}>
            <MovieCard 
              movie={movie}
              onShowDetails={handleOnShowDetails}
              onRemoveFromMovieList={removeMovieFromList}
            />
            {/* <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={movie.Poster} alt={`${movie.Title} poster`} />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Button variant="primary" onClick={() => removeMovieFromList(movie)}>Remove From List</Button>
              </Card.Body>
            </Card> */}
          </Col>
        ))
      }
      </Row>
    </Container>
  );
}

const mapStateToProps = state => ({
  movieList: state.movieListReducer,
});

UserMovieList = connect(
  mapStateToProps,
  { getMovieList, removeMovieFromList }
)(UserMovieList)

export default UserMovieList;
