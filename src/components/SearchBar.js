import PropTypes from 'prop-types';
import { useState } from "react";
import { Form, Row, Col, Button, } from "react-bootstrap";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState({ query: "", type: "" });

  const onFormSubmit = (event) => {
    // trigger error message if empty search or type
    if (!searchQuery.query || !searchQuery.type) {
      console.log('no search or type')
      // updateSearchError(true);
    } else {
      onSearch(searchQuery);
    }
    event.preventDefault();
  }

  const handleInputChange = (event) => {
    const { target } = event;
    // remove error message if previously triggered on submit, lets use redux
    // if (searchError) {
    //   updateSearchError(false);
    // }
    // catches any input element without name attribute
    if (!target.name) {
      console.warn(`received unnamed element ${target.localName}`);
      return;
    }
    // console.log(target.value);
    setSearchQuery({ ...searchQuery, [target.name]: target.value });
  }

  return (
    <Form onSubmit={onFormSubmit}>
      <Row className="align-items-center">
        <Col md={6} className="my-1">
          <Form.Control
            name="query"
            placeholder="Search for a Movie or TV Series!"
            onChange={handleInputChange}   
            />
        </Col>
        <Col>
        <Form.Select
          className="me-sm-2"
          name="type"
          onChange={handleInputChange}
        >
          <option value="">Select Type</option>
          <option value="movie">Movie</option>
          <option value="tv">TV Show</option>
        </Form.Select>
        </Col>
        <Col md="auto" className="my-1">
          <Button type="submit">Search</Button>
        </Col>
      </Row>
    </Form>
  )
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
}


export default SearchBar;