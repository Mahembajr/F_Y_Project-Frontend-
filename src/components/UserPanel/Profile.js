import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';

const Profile = () => {
  const [profile, setProfile] = useState({
    bio: '',
    certifications: '',
    cv: null,
  });

  useEffect(() => {
    axios.get('/api/profile/')
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleFileChange = (event) => {
    setProfile({ ...profile, cv: event.target.files[0] });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('bio', profile.bio);
    formData.append('certifications', profile.certifications);
    if (profile.cv) {
      formData.append('cv', profile.cv);
    }

    axios.put('/api/profile/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        alert('Profile updated successfully');
      })
      .catch(error => {
        console.error('Error updating profile:', error);
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        User Profile
      </Typography>
      <TextField
        label="Bio"
        name="bio"
        value={profile.bio}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Certifications"
        name="certifications"
        value={profile.certifications}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        component="label"
        sx={{ mb: 2 }}
      >
        Upload CV
        <input
          type="file"
          hidden
          onChange={handleFileChange}
        />
      </Button>
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </Box>
  );
};

export default Profile;
