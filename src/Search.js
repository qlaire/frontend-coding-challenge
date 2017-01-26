import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

class Search extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const query = e.target.value;
    this.props.search(query);
  }

  render() {
    return (
      <form>
        <FormGroup bsSize="large">
          <FormControl
            type="text"
            placeholder="Search by title"
            onChange={this.handleChange}
          />
        </FormGroup>
      </form>
    )
  }
}

export default Search;
