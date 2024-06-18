import React, { useEffect, useState } from 'react';
import { 
    Container, 
    Typography, 
    Tabs, 
    Tab, 
    Box, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper 
} from '@mui/material';
import EventCalls from '../api/EventCalls';
import BookingCalls from '../api/BookingCalls';
import SidebarComponent from './SideBarComponent';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const OrganizerDashboard = () => {
    const [value, setValue] = useState(0);
    const [eventsByOrganizer, setEventsByOrganizer] = useState([]);
    const [bookingsByCustomer, setBookingsByCustomer] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            const decodedToken = jwtDecode(storedToken);
            if (!decodedToken.roles.includes("EVENT_ORGANIZER")) {
                navigate("/unauthorized");
            }
        }

        const fetchEventsByOrganizer = async () => {
            try {
                const data = await EventCalls.countEventsByOrganizer();
                setEventsByOrganizer(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching events by organizer:", error);
                setEventsByOrganizer([]);
            }
        };

        const fetchBookingsByCustomer = async () => {
            try {
                const data = await BookingCalls.countBookingsByCustomer();
                setBookingsByCustomer(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching bookings by customer:", error);
                setBookingsByCustomer([]);
            }
        };

        fetchEventsByOrganizer();
        fetchBookingsByCustomer();
    }, [navigate]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Organizer Dashboard
            </Typography>
            <Tabs value={value} onChange={handleChange} aria-label="organizer dashboard tabs">
                <Tab label="Events by Organizer" />
                <Tab label="Bookings by Customer" />
            </Tabs>

            <TabPanel value={value} index={0}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Organizer</TableCell>
                                <TableCell>Event Count</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {eventsByOrganizer.map((row) => (
                                <TableRow key={row.organizer.id}>
                                    <TableCell>{row.organizer.username}</TableCell>
                                    <TableCell>{row.eventCount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>

            <TabPanel value={value} index={1}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Customer</TableCell>
                                <TableCell>Booking Count</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookingsByCustomer.map((row) => (
                                <TableRow key={row.customer.id}>
                                    <TableCell>{row.customer.username}</TableCell>
                                    <TableCell>{row.bookingCount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>

            <SidebarComponent />
        </Container>
    );
};

export default OrganizerDashboard;
