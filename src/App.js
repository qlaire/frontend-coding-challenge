import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import './App.css';
import EventList from './EventList';

class App extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Row>
            <h1>My Events</h1>
          </Row>
          <Row>
            <EventList />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
