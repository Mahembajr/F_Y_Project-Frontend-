
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, TextField, Grid, Paper, Card, CardContent, CardActions, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const AssistanceOptionAdmin = () => {
    const [assistanceOptions, setAssistanceOptions] = useState([]);
    const [newAssistanceOption, setNewAssistanceOption] = useState({
        name: '',
        description: '',
        contact_info: ''
    });
    const [editMode, setEditMode] = useState(false);
    const [editingOption, setEditingOption] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [optionToDelete, setOptionToDelete] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/api/assistance/')
            .then(response => setAssistanceOptions(response.data))
            .catch(error => console.error("Error fetching assistance options:", error));
    }, []);

    const handleChange = (e) => {
        setNewAssistanceOption({ ...newAssistanceOption, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode) {
            // Update existing assistance option
            axios.put(`http://localhost:8000/api/api/assistance/${editingOption.id}/`, newAssistanceOption)
                .then(response => {
                    setAssistanceOptions(assistanceOptions.map(option => option.id === editingOption.id ? response.data : option));
                    setEditMode(false);
                    setEditingOption(null);
                    setNewAssistanceOption({ name: '', description: '', contact_info: '' });
                })
                .catch(error => console.error("Error updating assistance option:", error));
        } else {
            // Create new assistance option
            axios.post('http://localhost:8000/api/api/assistance/', newAssistanceOption)
                .then(response => {
                    setAssistanceOptions([...assistanceOptions, response.data]);
                    setNewAssistanceOption({ name: '', description: '', contact_info: '' });
                })
                .catch(error => console.error("Error creating assistance option:", error));
        }
    };

    const handleEdit = (option) => {
        setEditMode(true);
        setEditingOption(option);
        setNewAssistanceOption({ name: option.name, description: option.description, contact_info: option.contact_info });
    };

    const handleDelete = (option) => {
        setOptionToDelete(option);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        axios.delete(`http://localhost:8000/api/api/assistance/${optionToDelete.id}/`)
            .then(() => {
                setAssistanceOptions(assistanceOptions.filter(option => option.id !== optionToDelete.id));
                setDeleteDialogOpen(false);
                setOptionToDelete(null);
            })
            .catch(error => console.error("Error deleting assistance option:", error));
    };

    const handleCloseDialog = () => {
        setDeleteDialogOpen(false);
        setOptionToDelete(null);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Manage Assistance Options</Typography>
            <Paper style={{ padding: 16, marginBottom: 24 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Name"
                                name="name"
                                value={newAssistanceOption.name}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Description"
                                name="description"
                                value={newAssistanceOption.description}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Contact Info"
                                name="contact_info"
                                value={newAssistanceOption.contact_info}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                {editMode ? 'Update Assistance Option' : 'Add Assistance Option'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
            <Typography variant="h6" gutterBottom>Existing Assistance Options</Typography>
            <Grid container spacing={3}>
                {assistanceOptions.map(option => (
                    <Grid item xs={12} sm={6} md={4} key={option.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{option.name}</Typography>
                                <Typography variant="body2">{option.description}</Typography>
                                <Typography variant="body2">Contact: {option.contact_info}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => handleEdit(option)}>Edit</Button>
                                <Button size="small" color="secondary" onClick={() => handleDelete(option)}>Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={deleteDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this assistance option?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button onClick={confirmDelete} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default AssistanceOptionAdmin;
