import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import YouTubeEmbed from './YouTubeEmbed';

import TheMovieDbApi from '../services/themoviedbApi.service';
import "../styles/MovieDetails.css";

const MovieDetails = ({ movieDbId, type }) => {
  const baseImgUrl = "https://image.tmdb.org/t/p/w300";
  const [details, setDetails] = useState({});

  const getMovie = async (id, type) => {
    const movieResponse = await TheMovieDbApi.getDetails(type, id);
    setDetails(movieResponse);
  }

  useEffect(() => {
    getMovie(movieDbId, type) // maybe type check this
  }, [movieDbId, type]);

  // empty object state means were still loading...
  if (Object.entries(details).length === 0) {
    return <h2>Loading...</h2>
  // api returns an error
  } else if (details.Error) {
    return (
    <div className="movie-list-error">
      <h2>{details.Error}</h2>
    </div>
    )
  }

  return (
  <Container>
    <Row>
      <Col>
        <Image
          src={details.poster_path !== null ? baseImgUrl + details.poster_path : `${process.env.PUBLIC_URL}/poster-placeholder.png`}
          alt={details.title}
          fluid
        />
      </Col>
      <Col>
        <Row lg={2}>
          <Col><h2>{details.title}</h2></Col>
          <Col md={{ span: 4, offset: 2 }} style={{ color: "rgb(113, 151, 255)", fontSize: "x-large", fontWeight: "bold" }}>{details.vote_average}</Col>
        </Row>
        <Row lg={3}>
          <Button variant="outline-secondary" size="sm" disabled>{details.status}</Button>{' '}
          <Button variant="outline-secondary" size="sm" disabled>{details.runtime}</Button>{' '}
          <Button variant="outline-secondary" size="sm" disabled>{details.genres[0].name}</Button>{' '}
        </Row>
        <Row lg={1}>
          <h3>Plot</h3>
          <p>{details.overview}</p>
        </Row>
        <Row lg={1}>
          <h3>Tagline</h3>
          <p>{details.tagline}</p>
        </Row>
      </Col>
    </Row>
    <Row> 
      <Col>
        <YouTubeEmbed
          movieDbId={movieDbId}
          type={type}
        />
      </Col>
    </Row>
  </Container>

  );
}

MovieDetails.propTypes = {
  movieDbId: PropTypes.string.isRequired,
};

export default MovieDetails;