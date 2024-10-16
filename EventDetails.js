// src/components/EventDetails.js

import React from "react";
import { useParams } from "react-router-dom";
import { events as mockEvents } from "../data/events"; // Importing mock events

const EventDetails = () => {
  const { id } = useParams();
  const event = mockEvents.find((event) => event.id === parseInt(id));

  if (!event) {
    return <div>Event not found!</div>;
  }

  return (
    <div>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <button onClick={() => alert("Booking Tickets...")}>
        Book Tickets
      </button>
    </div>
  );
};

export default EventDetails;