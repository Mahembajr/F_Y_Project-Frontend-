import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button } from '@mui/material';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/api/events/')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const handleRSVP = (eventId) => {
    // Implement RSVP functionality here
    console.log('RSVP for event:', eventId);
  };

  return (
    <div>
      {events.map(event => (
        <Card key={event.id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {event.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Location: {event.location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Start Time: {new Date(event.start_time).toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              End Time: {new Date(event.end_time).toLocaleString()}
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => handleRSVP(event.id)}
            >
              RSVP
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Events;
