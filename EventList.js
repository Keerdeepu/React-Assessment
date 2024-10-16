import React, { useState, useEffect, useMemo } from "react";
import { events as mockEvents } from '../data/events';
import { Link } from "react-router-dom"; // Import Link for navigation
import { useAuth } from "../context/AuthContext";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 2;

  const { user, login, logout } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      setEvents(mockEvents);
      setLoading(false);
    }, 1000);
  }, []);

  const handleBookTicket = (id) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === id && event.seats > 0
        ? { ...event, seats: event.seats - 1 }
          : event
      )
    );
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * eventsPerPage;
    const endIndex = startIndex + eventsPerPage;
    return filteredEvents.slice(startIndex, endIndex);
  }, [currentPage, filteredEvents]);

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  if (loading) {
    return <p>Loading events...</p>;
  }

  return (
    <div>
      <h1>Event List</h1>
      <input
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul>
        {paginatedEvents.map(event => (
          <li key={event.id}>
            <h2>
              <Link to={`/event/${event.id}`}>{event.title}</Link> {/* Link to EventDetails */}
            </h2>
            <p>{event.description}</p>
            <p>Category: {event.category}</p>
            <p>Date: {event.date}</p>
            <p>Seats Available: {event.seats > 0 ? event.seats : "Fully Booked"}</p>
            <p>Price: ${event.price}</p>

            {event.seats > 0 && user ? (
              <button onClick={() => handleBookTicket(event.id)}>Book Ticket</button>
            ) : (
              <p>{event.seats === 0 ? "Event is fully booked!" : "Log in to book"}</p>
            )}
          </li>
        ))}
</ul>

<div>
  <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
    Previous
  </button>
  <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
    Next
  </button>
</div>

{!user ? (
  <button onClick={() => login("testUser")}>Log In</button>
) : (
  <button onClick={logout}>Log Out</button>
)}
</div>
);
};

export default EventList;