import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, FormControl } from 'react-bootstrap';

class Search extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    let query = ReactDOM.findDOMNode(this.searchInput).value.toLowerCase();
    this.props.search(query);
  }

  render() {
    return (
      <form>
        <FormGroup bsSize="large">
          <FormControl
            type="text"
            placeholder="Search by title"
            ref={ component => this.searchInput = component }
            onChange={this.handleChange}
          />
        </FormGroup>
      </form>
    )
  }
}

export default Search;
