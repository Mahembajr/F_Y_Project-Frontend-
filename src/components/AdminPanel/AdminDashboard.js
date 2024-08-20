
import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Divider, Paper, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  // State for dynamic stats
  const [stats, setStats] = useState({
    totalClubs: 0,
    upcomingEvents: 0,
    jobListings: 0,
  });

  useEffect(() => {
    // Fetch stats dynamically
    const fetchStats = async () => {
      try {
        const [clubsResponse, eventsResponse, jobsResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/api/clubs/'), // Replace with your API endpoint
          axios.get('http://localhost:8000/api/api/events/'), // Replace with your API endpoint
          axios.get('http://localhost:8000/api/api/jobs/'), // Replace with your API endpoint
        ]);

        setStats({
          totalClubs: clubsResponse.data.length,
          upcomingEvents: eventsResponse.data.length,
          jobListings: jobsResponse.data.length,
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Container sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 4 }} gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ marginBottom: 3, borderRadius: 1, boxShadow: 3 }}>
            <CardContent sx={{ padding: 2 }}>
              <Typography variant="h6">Club Management</Typography>
              <Typography variant="body2" color="text.secondary">
                View and manage clubs in your system. Add, update, or delete clubs as needed.
              </Typography>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button size="small" color="primary" component={Link} to="/admin/clubs">
                Manage Clubs
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ marginBottom: 3, borderRadius: 1, boxShadow: 3 }}>
            <CardContent sx={{ padding: 2 }}>
              <Typography variant="h6">Event Management</Typography>
              <Typography variant="body2" color="text.secondary">
                View and manage upcoming events. Create, edit, or delete events as needed.
              </Typography>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button size="small" color="primary" component={Link} to="/admin/events">
                Manage Events
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ marginBottom: 3, borderRadius: 1, boxShadow: 3 }}>
            <CardContent sx={{ padding: 2 }}>
              <Typography variant="h6">Job Listings</Typography>
              <Typography variant="body2" color="text.secondary">
                Manage job postings. Add new job listings or remove outdated ones.
              </Typography>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button size="small" color="primary" component={Link} to="/admin/jobs">
                Manage Jobs
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ marginBottom: 3, borderRadius: 1, boxShadow: 3 }}>
            <CardContent sx={{ padding: 2 }}>
              <Typography variant="h6">Assistance Options</Typography>
              <Typography variant="body2" color="text.secondary">
                Manage available assistance options. Add or remove options as needed.
              </Typography>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button size="small" color="primary" component={Link} to="/admin/assistance">
                Manage Assistance
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {/* Statistics Section */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Statistics
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ padding: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
              <Typography variant="h6">Total Clubs</Typography>
              <Typography variant="h4">{stats.totalClubs}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ padding: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
              <Typography variant="h6">Upcoming Events</Typography>
              <Typography variant="h4">{stats.upcomingEvents}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ padding: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
              <Typography variant="h6">Job Listings</Typography>
              <Typography variant="h4">{stats.jobListings}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
