// src/components/UserPanel/Clubs.js

import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';
import axios from 'axios';

const Clubs = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/api/clubs/')
      .then(response => {
        setClubs(response.data);
      })
      .catch(error => {
        console.error('Error fetching clubs:', error);
      });
  }, []);

  const handleJoinClub = (clubId) => {
    // Implement the logic to join a club
    console.log(`Joining club with ID: ${clubId}`);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Clubs
      </Typography>
      <Grid container spacing={3}>
        {clubs.map(club => (
          <Grid item xs={12} sm={6} md={4} key={club.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={club.image || '/default-club-image.jpg'}
                alt={club.name}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {club.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {club.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2 }}
                  onClick={() => handleJoinClub(club.id)}
                >
                  Join Club
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Clubs;
