import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, TextField, Card, CardContent } from '@mui/material';
import api from '../../services/api';

const ClubMembershipAdmin = () => {
    const [memberships, setMemberships] = useState([]);
    const [newMembership, setNewMembership] = useState({ user: '', club: '', is_verified: false });

    useEffect(() => {
        api.get('/club-memberships/').then(response => {
            setMemberships(response.data);
        });
    }, []);

    const handleInputChange = (e) => {
        setNewMembership({ ...newMembership, [e.target.name]: e.target.value });
    };

    const handleAddMembership = () => {
        api.post('/club-memberships/', newMembership).then(response => {
            setMemberships([...memberships, response.data]);
            setNewMembership({ user: '', club: '', is_verified: false });
        });
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6">Club Memberships</Typography>
                <Grid container spacing={2}>
                    {memberships.map(membership => (
                        <Grid item xs={12} key={membership.id}>
                            <Typography>{membership.user}</Typography>
                            <Typography>{membership.club}</Typography>
                            <Typography>{membership.is_verified ? 'Verified' : 'Not Verified'}</Typography>
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <TextField label="User ID" name="user" value={newMembership.user} onChange={handleInputChange} fullWidth />
                        <TextField label="Club ID" name="club" value={newMembership.club} onChange={handleInputChange} fullWidth />
                        <Button onClick={handleAddMembership} variant="contained" color="primary">Add Membership</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ClubMembershipAdmin;
