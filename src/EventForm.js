import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import moment from 'moment';

class EventForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      titleBlur: false,
      endTimeBlur: false,
      formValid: false
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.getTitleValidationState = this.getTitleValidationState.bind(this);
    this.getEndTimeValidationState = this.getEndTimeValidationState.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createFullTimeStamp(date, time) {
    return moment(`${date} ${time}`, "YYYY-MM-DD HH:mm")
  }

  getTitleValidationState() {
    if (this.state.titleBlur) {
      return this.state.title.length === 0 ? 'error' : 'success';
    }
  }

  getEndTimeValidationState() {
    if (this.state.endTimeBlur) {
      let endDateAndTime = this.createFullTimeStamp(this.state.endDate, this.state.endTime);
      let startDateAndTime = this.createFullTimeStamp(this.state.startDate, this.state.startTime);
      return endDateAndTime.isBefore(startDateAndTime) ? 'error' : 'success';
    }
  }

  isFormValid() {
    let endDateAndTime = this.createFullTimeStamp(this.state.endDate, this.state.endTime);
    let startDateAndTime = this.createFullTimeStamp(this.state.startDate, this.state.startTime);
    if (this.state.title.length === 0 || !endDateAndTime.isValid() || !startDateAndTime.isValid() || endDateAndTime.isBefore(startDateAndTime)) {
      this.setState({formValid: false});
    } else {
      this.setState({formValid: true});
    }
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value});
    this.isFormValid()
  }

  handleStartDateChange(e) {
    this.setState({startDate: e.target.value});
    this.isFormValid()
  }

  handleStartTimeChange(e) {
    this.setState({startTime: e.target.value});
    this.isFormValid()
  }

  handleEndDateChange(e) {
    this.setState({endDate: e.target.value});
    this.isFormValid()
  }

  handleEndTimeChange(e) {
    this.setState({endTime: e.target.value});
    this.isFormValid()
  }

  handleSubmit(e) {
    e.preventDefault();
    let endDateAndTime = this.createFullTimeStamp(this.state.endDate, this.state.endTime);
    let startDateAndTime = this.createFullTimeStamp(this.state.startDate, this.state.startTime);
    const event = {
      title: this.state.title,
      start_time: startDateAndTime,
      end_time: endDateAndTime
    };
    this.setState({
      title: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      titleBlur: false,
      endTimeBlur: false,
      formValid: false
    });
    this.props.handleSubmit(event);
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup
          controlId="title"
          validationState={this.getTitleValidationState()}
        >
          <ControlLabel>Title</ControlLabel>
          <FormControl
            type="text"
            value={this.state.title}
            placeholder="Enter title"
            onChange={this.handleTitleChange}
            onBlur={() => this.setState({titleBlur: true})}
          />
          <FormControl.Feedback />
          <HelpBlock>Title is required.</HelpBlock>
        </FormGroup>
        <FormGroup
          controlId="startDate"
        >
          <ControlLabel>Start Date</ControlLabel>
          <FormControl
            type="date"
            value={this.state.startDate}
            onChange={this.handleStartDateChange}
          />

        </FormGroup>
        <FormGroup
          controlId="startTime"
        >
          <ControlLabel>Start Time</ControlLabel>
          <FormControl
            type="time"
            value={this.state.startTime}
            onChange={this.handleStartTimeChange}
          />

        </FormGroup>
        <FormGroup
          controlId="endDate"
        >
          <ControlLabel>End Date</ControlLabel>
          <FormControl
            type="date"
            value={this.state.endDate}
            onChange={this.handleEndDateChange}
          />

        </FormGroup>
        <FormGroup
          controlId="endTime"
          validationState={this.getEndTimeValidationState()}
        >
          <ControlLabel>End Time</ControlLabel>
          <FormControl
            type="time"
            value={this.state.endTime}
            onChange={this.handleEndTimeChange}
            onBlur={() => {
              this.setState({endTimeBlur: true});
              this.isFormValid();
            }}
          />
          <FormControl.Feedback />
          <HelpBlock>End time must be later than start time.</HelpBlock>

        </FormGroup>
        <Button type='submit' bsStyle='success' disabled={!this.state.formValid}>Submit</Button>
      </form>
    );
  }
}

export default EventForm;