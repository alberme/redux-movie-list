import styled from 'styled-components';
import { Container, Button } from 'react-bootstrap';
 
export const StyledDetailsContainer = styled(Container)`
  background-image: url(${props => props.backgroundImage});
  height: 100vh;
`

// const ReversedButton = props => <Button {...props} children={props.children.split('').reverse()} />
