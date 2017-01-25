import React, { Component } from 'react';
import 'whatwg-fetch';
import moment from 'moment';
import { ButtonToolbar, Button } from 'react-bootstrap';
import EventItem from './EventItem';

class EventList extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      sortBy: null,
      filter: null
    }
  }

  componentDidMount() {
    fetch('https://api.eventable.com/v1/token-auth/', {
      method: 'POST',
      body: JSON.stringify({
        'username': 'candidate.5545@eventable.com',
        'password': 'R8VMaFVK'
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(res => {
      const token = res.token;
      return fetch('https://api.eventable.com/v1/events/?format=json', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        }
      })
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        events: res.results
      })
    });
  }

  sortEvents(events, sortBy) {
    if (sortBy === 'title') {
      return events.sort((event1, event2) => {
        const eventTitle1 = event1.title.toLowerCase();
        const eventTitle2 = event2.title.toLowerCase();
        if (eventTitle1 < eventTitle2) {
          return -1;
        }
        if (eventTitle1 > eventTitle2) {
          return 1;
        }
        return 0;
      });
    } else if (sortBy === 'startTime') {
      return events.sort((event1, event2) => {
        const eventTime1 = event1.start_time;
        const eventTime2 = event2.start_time;
        if (moment(eventTime1).isBefore(eventTime2)) {
          return -1;
        }
        if (moment(eventTime1).isAfter(eventTime2)) {
          return 1;
        }
        return 0;
      })
    }
  }

  render() {
    let events = this.state.events;
    if (this.state.sortBy) {
      events = this.sortEvents(events, this.state.sortBy)
    }
    return (
      <div>
        <ButtonToolbar>
          <Button bsStyle="primary" onClick={() => this.setState({sortBy: 'title'})}>Sort by Title</Button>
          <Button bsStyle="primary" onClick={() => this.setState({sortBy: 'startTime'})}>Sort by Start Time</Button>
        </ButtonToolbar>
        {
          events.map(event => <EventItem key={event.title} event={event} />)
        }
      </div>
    )
  }
}

export default EventList;