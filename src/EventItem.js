import React from 'react';
import { Panel } from 'react-bootstrap';
import moment from 'moment';

const EventItem = (props) => {
  const event = props.event;
  return (
    <div className="event-item">
      <Panel header={<h3>{event.title}</h3>}>
        <p><span className="field">Start Time:</span> {moment(event.start_time).format('MMMM Do YYYY, h:mm:ss a')}</p>
        <p><span className="field">End Time:</span> {moment(event.end_time).format('MMMM Do YYYY, h:mm:ss a')}</p>
        <p><span className="field">All day:</span> {event.all_day ? "Yes" : "No"}</p>
        <p>{event.description ? event.description : ''}</p>
        <p>{event.url ? <a href={event.url}><span className="field">More info</span></a> : ''}</p>
      </Panel>

    </div>
  )
}

export default EventItem;