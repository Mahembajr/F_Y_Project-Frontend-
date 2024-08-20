
import React, { useEffect, useState } from 'react';
// export default ClubAdmin;
import axios from 'axios';
import { Container, Typography, Button, TextField, Grid, Paper, Snackbar, Alert, Card, CardContent, CardActions, Divider } from '@mui/material';

const BASE_URL = 'http://localhost:8000/api/api/clubs/';

const ClubAdmin = () => {
    const [clubs, setClubs] = useState([]);
    const [newClub, setNewClub] = useState({ name: '', description: '', location: '' });
    const [editClub, setEditClub] = useState(null); // Track club to edit
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        axios.get(BASE_URL)
            .then(response => setClubs(response.data))
            .catch(error => {
                console.error("Error fetching clubs:", error);
                setError('Error fetching clubs.');
                setOpenSnackbar(true);
            });
    }, []);

    const handleChange = (e) => {
        setNewClub({ ...newClub, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editClub) {
            axios.put(`${BASE_URL}${editClub.id}/`, newClub)
                .then(response => {
                    setClubs(clubs.map(club => club.id === response.data.id ? response.data : club));
                    setNewClub({ name: '', description: '', location: '' });
                    setEditClub(null); // Clear edit mode
                })
                .catch(error => {
                    console.error("Error updating club:", error);
                    setError('Error updating club.');
                    setOpenSnackbar(true);
                });
        } else {
            axios.post(BASE_URL, newClub)
                .then(response => {
                    setClubs([...clubs, response.data]);
                    setNewClub({ name: '', description: '', location: '' });
                })
                .catch(error => {
                    console.error("Error creating club:", error);
                    setError('Error creating club.');
                    setOpenSnackbar(true);
                });
        }
    };

    const handleDelete = (id) => {
        axios.delete(`${BASE_URL}${id}/`)
            .then(() => {
                setClubs(clubs.filter(club => club.id !== id));
            })
            .catch(error => {
                console.error("Error deleting club:", error);
                setError('Error deleting club.');
                setOpenSnackbar(true);
            });
    };

    const handleEdit = (club) => {
        setNewClub({ name: club.name, description: club.description, location: club.location });
        setEditClub(club); // Set club to edit
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Manage Clubs</Typography>
            <Paper style={{ padding: 16, marginBottom: 20 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField label="Name" name="name" value={newClub.name} onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField label="Description" name="description" value={newClub.description} onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField label="Location" name="location" value={newClub.location} onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                {editClub ? 'Update Club' : 'Add Club'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
            <Typography variant="h6" gutterBottom>Existing Clubs</Typography>
            <Grid container spacing={3}>
                {clubs.map(club => (
                    <Grid item xs={12} sm={6} md={4} key={club.id}>
                        <Card sx={{ marginBottom: 3, borderRadius: 1, boxShadow: 3 }}>
                            <CardContent sx={{ padding: 2 }}>
                                <Typography variant="h6">{club.name}</Typography>
                                <Typography variant="body2" color="text.secondary">{club.description}</Typography>
                                <Typography variant="body2" color="text.secondary">{club.location}</Typography>
                            </CardContent>
                            <Divider />
                            <CardActions sx={{ justifyContent: 'flex-end' }}>
                                <Button size="small" color="primary" onClick={() => handleEdit(club)}>Edit</Button>
                                <Button size="small" color="secondary" onClick={() => handleDelete(club.id)}>Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ClubAdmin;
