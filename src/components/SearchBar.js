import PropTypes from 'prop-types';
import { useState } from "react";
import { Form, Row, Col, Button, } from "react-bootstrap";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState({ query: "", type: "movie" });

  const onFormSubmit = (event) => {
    // trigger error message if empty search or type
    if (!searchQuery.search || !searchQuery.type) {
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
          <option>Select Type</option>
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

/**
 * 
 * import { useState } from 'react';
import { PropTypes } from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

const SearchBar = ({ onSubmit }) => {
  const [query, updateQuery] = useState({ search: "", type: "movie", instigator: "search" });
  const [searchError, updateSearchError] = useState(false);

  const handleSubmit = (event) => {
    // trigger error message if empty search or type
    if (!query.search || !query.type) {
      updateSearchError(true);
    } else {
      onSubmit(query);
    }
    event.preventDefault();
  }

  const handleInputChange = (event) => {
    const { target } = event;
    // remove error message if previously triggered on submit
    if (searchError) {
      updateSearchError(false);
    }
    // catches any input element without name attribute
    if (!target.name) {
      console.warn(`received unnamed element ${target.localName}`);
      return;
    }
    // console.log(target.value);
    updateQuery({ ...query, [target.name]: target.value });
  }

  return (
    <form className="form-inline m-2" onSubmit={handleSubmit}>
      { searchError ? <div className="alert alert-danger" role="alert">Please enter a movie</div> : null }
      <input className="form-control rounded w-50 p-2 float-left" name="search" type="search" placeholder="Search" aria-label="Search" onChange={handleInputChange} />
      <select className="form-control w-25 p-2 float-right" name="type" onChange={handleInputChange}>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
        <option value="episode">Episode</option>
      </select>
      <button className="btn btn-outline-primary" type="submit">Search</button>
    </form>
  )
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
}

export default SearchBar;
 */