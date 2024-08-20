import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, TextField, Grid, Paper, Snackbar, Alert, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const BASE_URL = 'http://localhost:8000/api/api/profiles/';

const AlumniProfileAdmin = () => {
    const [profiles, setProfiles] = useState([]);
    const [newProfile, setNewProfile] = useState({
        first_name: '',
        last_name: '',
        email: '',
        professional_details: '',
        education_history: '',
        achievements: ''
    });
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        axios.get(BASE_URL)
            .then(response => setProfiles(response.data))
            .catch(error => {
                console.error("Error fetching profiles:", error);
                setError('Error fetching profiles.');
                setOpenSnackbar(true);
            });
    }, []);

    const handleChange = (e) => {
        setNewProfile({ ...newProfile, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedProfile) {
            axios.put(`${BASE_URL}${selectedProfile.id}/`, newProfile)
                .then(response => {
                    setProfiles(profiles.map(profile => profile.id === selectedProfile.id ? response.data : profile));
                    setNewProfile({
                        first_name: '',
                        last_name: '',
                        email: '',
                        professional_details: '',
                        education_history: '',
                        achievements: ''
                    });
                    setSelectedProfile(null);
                })
                .catch(error => {
                    console.error("Error updating profile:", error);
                    setError('Error updating profile.');
                    setOpenSnackbar(true);
                });
        } else {
            axios.post(BASE_URL, newProfile)
                .then(response => {
                    setProfiles([...profiles, response.data]);
                    setNewProfile({
                        first_name: '',
                        last_name: '',
                        email: '',
                        professional_details: '',
                        education_history: '',
                        achievements: ''
                    });
                })
                .catch(error => {
                    console.error("Error creating profile:", error);
                    setError('Error creating profile.');
                    setOpenSnackbar(true);
                });
        }
    };

    const handleEdit = (profile) => {
        setNewProfile(profile);
        setSelectedProfile(profile);
    };

    const handleDelete = (id) => {
        axios.delete(`${BASE_URL}${id}/`)
            .then(() => {
                setProfiles(profiles.filter(profile => profile.id !== id));
            })
            .catch(error => {
                console.error("Error deleting profile:", error);
                setError('Error deleting profile.');
                setOpenSnackbar(true);
            });
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Manage Alumni Profiles</Typography>
            <Paper style={{ padding: 16 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField label="First Name" name="first_name" value={newProfile.first_name} onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Last Name" name="last_name" value={newProfile.last_name} onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Email" name="email" value={newProfile.email} onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Professional Details" name="professional_details" value={newProfile.professional_details} onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Education History" name="education_history" value={newProfile.education_history} onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Achievements" name="achievements" value={newProfile.achievements} onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                {selectedProfile ? 'Update Profile' : 'Add Profile'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
            <Typography variant="h6" gutterBottom>Existing Profiles</Typography>
            <ul>
                {profiles.map(profile => (
                    <li key={profile.id}>
                        {profile.first_name} {profile.last_name} - {profile.professional_details}
                        <IconButton onClick={() => handleEdit(profile)} color="primary">
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(profile.id)} color="secondary">
                            <DeleteIcon />
                        </IconButton>
                    </li>
                ))}
            </ul>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default AlumniProfileAdmin;
