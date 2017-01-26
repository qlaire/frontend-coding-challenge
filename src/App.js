import React, { Component } from 'react';
import { Grid, Row, Button, Glyphicon } from 'react-bootstrap';
import './App.css';
import SearchAndList from './SearchAndList';
import EventForm from './EventForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      showForm: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('myEvents')) {
      this.setState({
        events: JSON.parse(localStorage.getItem('myEvents'))
      })
    } else {
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
        localStorage.setItem('myEvents', JSON.stringify(res.results));
      });
    }
  }

  handleSubmit(newEvent) {
    this.setState({
      events: [...this.state.events, newEvent]
    }, () => {
      localStorage.setItem('myEvents', JSON.stringify(this.state.events));
    });
  }

  toggleForm() {
    this.setState({showForm: !this.state.showForm})
  }

  render() {
    return (
      <div className="my-events">
        <Grid>
          <Row>
            <h1>My Events</h1>
          </Row>
          <Row>
            <Button
              bsStyle="success"
              className="form-button"
              onClick={this.toggleForm}
            >
              {
                this.state.showForm
                  ? <span><Glyphicon glyph="minus" /> Close Form</span>
                  : <span><Glyphicon glyph="plus" /> Add Event</span>
              }
            </Button>
            {
              this.state.showForm
                ? <EventForm handleSubmit={this.handleSubmit}></EventForm>
                : null
            }
          </Row>
          <SearchAndList events={this.state.events} />
        </Grid>
      </div>
    );
  }
}

export default App;
