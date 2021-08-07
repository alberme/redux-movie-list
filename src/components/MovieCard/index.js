import { PropTypes } from 'prop-types';
import { StyledButtonContainer, StyledRBCard } from './styled';
import { Row, Col, Button } from 'react-bootstrap';

// Poster can be N/A
const MovieCard = ({ movie, onShowDetails, onAddToMovieList, onRemoveFromMovieList }) => {
  const baseImgUrl = "https://image.tmdb.org/t/p/w300";
  const { type, title, poster_path, id } = movie;
  
  const handleError = (e) => {
    console.log(`"${e.target.alt}" poster could not be loaded!`);
  }

  return (
    <StyledRBCard>
      <StyledRBCard.Img
        variant="top"
        src={poster_path !== null ? baseImgUrl + poster_path : `${process.env.PUBLIC_URL}/poster-placeholder.png`}
        alt={title}
        onError={handleError}
      />
      <StyledRBCard.Body>
        <StyledRBCard.Title>{title}</StyledRBCard.Title>
        <Button style={{ borderRadius: "1rem", padding: ".15rem .75rem" }} variant="outline-info" size="xs" disabled>{type}</Button>
      </StyledRBCard.Body>
        <StyledButtonContainer>
          <Button variant="outline-primary" size="sm" onClick={() => onShowDetails(id)}>Show Details</Button>
        {
          onAddToMovieList && (
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => onAddToMovieList(id)}
            >
            Add Movie
            </Button>
          )
        }
        {
          onRemoveFromMovieList && (
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => onRemoveFromMovieList(id)}
            >
            Remove Movie
            </Button>
          )
        }
        </StyledButtonContainer>    
    </StyledRBCard>
    );
  }

MovieCard.propTypes = {
  movie: PropTypes.object,
  onShowDetails: PropTypes.func,
  onAddToMovieList: PropTypes.func,
  onRemoveFromMovieList: PropTypes.func,
};

export default MovieCard;