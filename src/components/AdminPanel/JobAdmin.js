import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, TextField, Grid, Paper, Card, CardContent, CardActions } from '@mui/material';

const JobAdmin = () => {
    const [jobs, setJobs] = useState([]);
    const [newJob, setNewJob] = useState({
        title: '',
        description: '',
        company: '',
        application_link: '',
        posted_date: ''
    });
    const [editingJob, setEditingJob] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/api/jobs/')
            .then(response => setJobs(response.data))
            .catch(error => console.error("Error fetching jobs:", error));
    }, []);

    const handleChange = (e) => {
        setNewJob({ ...newJob, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingJob) {
            // Update existing job
            axios.put(`http://localhost:8000/api/api/jobs/${editingJob.id}/`, newJob)
                .then(response => {
                    setJobs(jobs.map(job => job.id === editingJob.id ? response.data : job));
                    resetForm();
                })
                .catch(error => console.error("Error updating job:", error));
        } else {
            // Create new job
            axios.post('http://localhost:8000/api/api/jobs/', newJob)
                .then(response => {
                    setJobs([...jobs, response.data]);
                    resetForm();
                })
                .catch(error => console.error("Error creating job:", error));
        }
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/api/jobs/${id}/`)
            .then(() => {
                setJobs(jobs.filter(job => job.id !== id));
            })
            .catch(error => console.error("Error deleting job:", error));
    };

    const handleEdit = (job) => {
        setNewJob({
            title: job.title,
            description: job.description,
            company: job.company,
            application_link: job.application_link,
            posted_date: job.posted_date
        });
        setEditingJob(job);
    };

    const resetForm = () => {
        setNewJob({
            title: '',
            description: '',
            company: '',
            application_link: '',
            posted_date: ''
        });
        setEditingJob(null);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Manage Jobs</Typography>
            <Paper style={{ padding: 16 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField label="Title" name="title" value={newJob.title} onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Description" name="description" value={newJob.description} onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Company" name="company" value={newJob.company} onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Application Link" name="application_link" value={newJob.application_link} onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Posted Date" name="posted_date" type="datetime-local" value={newJob.posted_date} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                {editingJob ? 'Update Job' : 'Add Job'}
                            </Button>
                            {editingJob && (
                                <Button onClick={resetForm} variant="outlined" color="secondary" style={{ marginLeft: 16 }}>
                                    Cancel
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </form>
            </Paper>

            <Typography variant="h6" gutterBottom style={{ marginTop: 24 }}>Existing Jobs</Typography>
            <Grid container spacing={3}>
                {jobs.map(job => (
                    <Grid item xs={12} sm={6} md={4} key={job.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>{job.title}</Typography>
                                <Typography variant="body1">{job.description}</Typography>
                                <Typography variant="body2" color="textSecondary">{job.company}</Typography>
                                <Typography variant="body2" color="textSecondary">{new Date(job.posted_date).toLocaleString()}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => handleEdit(job)} color="primary">
                                    Edit
                                </Button>
                                <Button onClick={() => handleDelete(job.id)} color="secondary">
                                    Delete
                                </Button>
                                <Button href={job.application_link} target="_blank" rel="noopener noreferrer" color="primary">
                                    Apply
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default JobAdmin;
