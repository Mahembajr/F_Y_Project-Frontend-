
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AdminHeader from './components/AdminPanel/AdminHeader';
import AdminSidebar from './components/AdminPanel/AdminSidebar';
import AdminDashboard from './components/AdminPanel/AdminDashboard';
import AlumniProfileAdmin from './components/AdminPanel/AlumniProfileAdmin';
import AssistanceOptionAdmin from './components/AdminPanel/AssistanceOptionAdmin';
import ClubAdmin from './components/AdminPanel/ClubAdmin';
import EventAdmin from './components/AdminPanel/EventAdmin';
import JobAdmin from './components/AdminPanel/JobAdmin';
import UserDashboard from './components/UserPanel/UserDashboard';
import Clubs from './components/UserPanel/Clubs';
import Events from './components/UserPanel/Events';
import Jobs from './components/UserPanel/Jobs';
import Assistance from './components/UserPanel/Assistance';
import Profile from './components/UserPanel/Profile';
import UserHeader from './components/UserPanel/UserHeader';
import UserSidebar from './components/UserPanel/UserSidebar';
import { Container, Grid } from '@mui/material';

const Layout = ({ children }) => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');
    const isUserRoute = location.pathname.startsWith('/user');

    return (
        <>
            {isAdminRoute && (
                <>
                    <AdminHeader />
                    <Grid container>
                        <Grid item xs={2}>
                            <AdminSidebar />
                        </Grid>
                        <Grid item xs={10}>
                            <Container>{children}</Container>
                        </Grid>
                    </Grid>
                </>
            )}
            {isUserRoute && (
                <>
                    <UserHeader />
                    <Grid container>
                        <Grid item xs={2}>
                            <UserSidebar />
                        </Grid>
                        <Grid item xs={10}>
                            <Container>{children}</Container>
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    );
};

const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    {/* Admin Routes */}
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/alumni-profiles" element={<AlumniProfileAdmin />} />
                    <Route path="/admin/clubs" element={<ClubAdmin />} />
                    <Route path="/admin/events" element={<EventAdmin />} />
                    <Route path="/admin/jobs" element={<JobAdmin />} />
                    <Route path="/admin/assistance" element={<AssistanceOptionAdmin />} />
                    <Route path="/" element={<AdminDashboard />} />
                    
                    {/* User Routes */}
                    <Route path="/user/dashboard" element={<UserDashboard />} />
                    <Route path="/user/clubs" element={<Clubs />} />
                    <Route path="/user/events" element={<Events />} />
                    <Route path="/user/jobs" element={<Jobs />} />
                    <Route path="/user/assistance" element={<Assistance />} />
                    <Route path="/user/profile" element={<Profile />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
