import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import EventList from './EventList';
import Search from './Search';

class SearchAndList extends Component {
  constructor() {
    super();
    this.state = {
      filteredEvents: []
    }
    this.search = this.search.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.events !== nextProps.events) {
      this.setState({filteredEvents: nextProps.events})
    }
  }

  search(query) {
    const result = this.props.events.filter(event => {
      return event.title.toLowerCase().includes(query);
    });
    this.setState({
      filteredEvents: result
    });

  }

  render() {
    return (
      <div>
        <Row>
          <Search search={this.search} ></Search>
        </Row>
        <Row>
          <EventList events={this.state.filteredEvents} />
        </Row>
      </div>
    )
  }
}

export default SearchAndList;