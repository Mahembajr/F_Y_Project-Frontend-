import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, TextField, Grid, Paper, Card, CardContent, CardActions } from '@mui/material';

const EventAdmin = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        name: '',
        description: '',
        date: '',
        location: '',
        organizer: ''
    });
    const [editingEvent, setEditingEvent] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/api/events/')
            .then(response => setEvents(response.data))
            .catch(error => console.error("Error fetching events:", error));
    }, []);

    const handleChange = (e) => {
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingEvent) {
            // Update existing event
            axios.put(`http://localhost:8000/api/api/events/${editingEvent.id}/`, newEvent)
                .then(response => {
                    setEvents(events.map(event => event.id === editingEvent.id ? response.data : event));
                    resetForm();
                })
                .catch(error => console.error("Error updating event:", error));
        } else {
            // Create new event
            axios.post('http://localhost:8000/api/api/events/', newEvent)
                .then(response => {
                    setEvents([...events, response.data]);
                    resetForm();
                })
                .catch(error => console.error("Error creating event:", error));
        }
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/api/events/${id}/`)
            .then(() => {
                setEvents(events.filter(event => event.id !== id));
            })
            .catch(error => console.error("Error deleting event:", error));
    };

    const handleEdit = (event) => {
        setNewEvent({
            name: event.name,
            description: event.description,
            date: event.date,
            location: event.location,
            organizer: event.organizer
        });
        setEditingEvent(event);
    };

    const resetForm = () => {
        setNewEvent({
            name: '',
            description: '',
            date: '',
            location: '',
            organizer: ''
        });
        setEditingEvent(null);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Manage Events</Typography>
            <Paper style={{ padding: 16, marginBottom: 16 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField label="Event Name" name="name" value={newEvent.name} onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Description" name="description" value={newEvent.description} onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Date" name="date" type="date" value={newEvent.date} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Location" name="location" value={newEvent.location} onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Organizer" name="organizer" value={newEvent.organizer} onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                {editingEvent ? 'Update Event' : 'Add Event'}
                            </Button>
                            {editingEvent && (
                                <Button onClick={resetForm} variant="outlined" color="secondary" style={{ marginLeft: 16 }}>
                                    Cancel
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </form>
            </Paper>
            <Typography variant="h6" gutterBottom>Existing Events</Typography>
            <Grid container spacing={3}>
                {events.map(event => (
                    <Grid item xs={12} sm={6} md={4} key={event.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{event.name}</Typography>
                                <Typography variant="body2" color="textSecondary">{event.description}</Typography>
                                <Typography variant="body2" color="textSecondary">{event.date}</Typography>
                                <Typography variant="body2" color="textSecondary">{event.location}</Typography>
                                <Typography variant="body2" color="textSecondary">{event.organizer}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => handleEdit(event)} color="primary">
                                    Edit
                                </Button>
                                <Button onClick={() => handleDelete(event.id)} color="secondary">
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default EventAdmin;
