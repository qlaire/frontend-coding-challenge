import React from 'react';
import { Panel } from 'react-bootstrap';
import moment from 'moment';

const EventItem = (props) => {
  const event = props.event;
  return (
    <div>
      <Panel header={<h3>{event.title}</h3>}>
        <p><span className="time">Start Time:</span> {moment(event.start_time).format('MMMM Do YYYY, h:mm:ss a')}</p>
        <p><span className="time">End Time:</span> {moment(event.end_time).format('MMMM Do YYYY, h:mm:ss a')}</p>
        <p>All day: {event.all_day ? "Yes" : "No"}</p>
        <p>{event.description ? event.description : ''}</p>
        <p>{event.url ? <a href={event.url}>More info</a> : ''}</p>
      </Panel>

    </div>
  )
}

export default EventItem;