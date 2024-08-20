import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button } from '@mui/material';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/api/jobs/')
      .then(response => {
        setJobs(response.data);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
      });
  }, []);

  return (
    <div>
      {jobs.map(job => (
        <Card key={job.id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {job.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {job.company_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Location: {job.location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {job.description}
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              href={job.application_link} 
              target="_blank"
            >
              Apply
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Jobs;
