import styled from 'styled-components';

import Card from 'react-bootstrap/Card';

export const StyledRBCard = styled(Card)`
  width: 14rem;
  
  h5 {
    font-family: Arial Black;
    letter-spacing: 0.1rem;
    margin-bottom: 1.0rem
  }
  .movie-type {
    background-color: rgb(255, 196, 189);
    color: red;
    margin: 0.2rem 0rem;
    padding: .375rem 1.0rem;
    border: 1px solid red;
    font-size: small;
  }
`

export const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .btn {
    margin: 0 0.1rem
  }
`
