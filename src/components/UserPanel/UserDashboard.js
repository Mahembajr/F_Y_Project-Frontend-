import React from 'react';
import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: 'bold' }}>
        User Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ padding: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Clubs</Typography>
            <Typography variant="body2" sx={{ marginTop: 1, mb: 2 }}>
              Explore the various clubs available and find the ones that match your interests. Join clubs to connect with like-minded people.
            </Typography>
            <Button 
              component={Link} 
              to="/user/clubs" 
              variant="contained" 
              color="primary" 
              sx={{ width: '100%' }}
            >
              View Clubs
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ padding: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Events</Typography>
            <Typography variant="body2" sx={{ marginTop: 1, mb: 2 }}>
              Stay updated with upcoming events and activities. RSVP to events that interest you and manage your schedule easily.
            </Typography>
            <Button 
              component={Link} 
              to="/user/events" 
              variant="contained" 
              color="primary" 
              sx={{ width: '100%' }}
            >
              View Events
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ padding: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Jobs</Typography>
            <Typography variant="body2" sx={{ marginTop: 1, mb: 2 }}>
              Browse job listings and find career opportunities that fit your skills and interests. Apply directly from this section.
            </Typography>
            <Button 
              component={Link} 
              to="/user/jobs" 
              variant="contained" 
              color="primary" 
              sx={{ width: '100%' }}
            >
              View Jobs
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ padding: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Assistance</Typography>
            <Typography variant="body2" sx={{ marginTop: 1, mb: 2 }}>
              Access various assistance options available to you. Get support and resources that can help you in different areas.
            </Typography>
            <Button 
              component={Link} 
              to="/user/assistance" 
              variant="contained" 
              color="primary" 
              sx={{ width: '100%' }}
            >
              View Assistance
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ padding: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Profile</Typography>
            <Typography variant="body2" sx={{ marginTop: 1, mb: 2 }}>
              View and update your personal profile. Manage your details, certifications, and upload your CV/resume here.
            </Typography>
            <Button 
              component={Link} 
              to="/user/profile" 
              variant="contained" 
              color="primary" 
              sx={{ width: '100%' }}
            >
              View Profile
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDashboard;
