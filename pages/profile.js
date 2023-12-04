import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { useSessionId } from '/utils/session';
import UserLayout from '@/components/User/UserLayout';
import DrawerAppBar from '@/components/User/DrawerAppBar';

import {
  Typography,
  Button,
  Paper,
  Grid,
  Box,
} from '@mui/material';

// const userProfilePage = () => {
//   return (
//     <DrawerAppBar>
//       {/* Your profile content goes here */}
//       <div>
//         <h1>User Profile</h1>
//         {/* Other profile-related content */}
//       </div>
//     </DrawerAppBar>
//   );
// };

const userProfilePage = () => {
  const userId = useSessionId()
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


 
  useEffect(() => {
   
    // Fetch customer data when the session is available or changes
    if (userId) {
      
      axios.get(`/api/profile?userId=${userId}`).then((response) => {
        console.log("responce.data", response.data)
        setCustomer(response.data);
        setIsLoading(false); // Set loading state to false when data is fetched
      }).catch((error) => {
        setIsLoading(false); // Set loading state to false in case of an error
        console.error('Error fetching customer data:', error);
      });
    } else {
      setIsLoading(false); // Set loading state to false if there's no session
    }
  }, [userId]);

  // Function to handle editing of customer data
  // const handleEdit = () => {
  //   // Implement your logic for editing customer data here
  // };
  
  return (
    // <Layout>
    // <DrawerAppBar>
      <Paper elevation={10} style={{
        padding: '1rem',
        borderRadius: '16px',
        height: '90%',
        backgroundColor: 'white',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <Box textAlign='center' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {isLoading ? (
            <p>Loading...</p>
          ) : customer ? (
            <>
                <Grid container spacing={2} style={{ width: '100%', justifyContent: 'space-between', paddingLeft: '40px' }}>
                <Grid item xs={12} sm={4} style={{ textAlign: 'left', padding: '32px' }}>
                  <Typography variant="h5" style={{ fontSize: '2rem', marginTop: '2rem', marginBottom: '2.5rem' }}>
                    General Info
                  </Typography>
                  <Typography variant="body1" style={{ fontSize: '1.2rem', textAlign: 'left' }}>Email: {customer.email}</Typography>
                  <Typography variant="body1" style={{ fontSize: '1.2rem', textAlign: 'left' }}>Phone: (123) 456-7890</Typography>
                  <Typography variant="body1" style={{ fontSize: '1.2rem', textAlign: 'left' }}>Location: New York, NY, USA</Typography>
                  <Typography variant="body1" style={{ fontSize: '1.2rem', textAlign: 'left' }}>Member Since: January 1, 2022</Typography>
                </Grid>
                <Grid item xs={12} sm={4} style={{ textAlign: 'left', padding: '32px' }}>
                  <Typography variant="h5" style={{ fontSize: '2rem', marginTop: '2rem', marginBottom: '2.5rem' }}>
                    Shipping Address
                  </Typography>
                  <Typography variant="body1" style={{ fontSize: '1.2rem', textAlign: 'left' }}>Street: 8714 Main St</Typography>
                  <Typography variant="body1" style={{ fontSize: '1.2rem', textAlign: 'left' }}>City: Vancouver</Typography>
                  <Typography variant="body1" style={{ fontSize: '1.2rem', textAlign: 'left' }}>Province: BC</Typography>
                  <Typography variant="body1" style={{ fontSize: '1.2rem', textAlign: 'left' }}>Country: Canada</Typography>
                  <Typography variant="body1" style={{ fontSize: '1.2rem', textAlign: 'left' }}>Postal: V8D 6K3</Typography>
                  <Typography variant="body1" style={{ fontSize: '1.2rem', textAlign: 'left' }}>Phone: (680) 666-7230</Typography>
                </Grid>
                <Grid item xs={12} sm={4} style={{ textAlign: 'left', padding: '32px' }}>
                  <Typography variant="h5" style={{ fontSize: '2rem', marginTop: '2rem', marginBottom: '2.5rem' }}>
                    Billing Address
                  </Typography>
                    <Typography variant="body1" style={{ fontSize: '1.2rem', textAlign: 'left' }}>Street: 839 Pender St</Typography>
                    <Typography variant="body1" style={{ fontSize: '1.2rem', textAlign: 'left' }}>City: Vancouver</Typography>
                    <Typography variant="body1" style={{ fontSize: '1.2rem', textAlign: 'left' }}>Province: BC</Typography>
                    <Typography variant="body1" style={{ fontSize: '1.2rem', textAlign: 'left' }}>Country: Canada</Typography>
                    <Typography variant="body1" style={{ fontSize: '1.2rem', textAlign: 'left' }}>Postal: V6D 3K6</Typography>
                    <Typography variant="body1" style={{ fontSize: '1.2rem', textAlign: 'left' }}>Phone: (680) 951-7490</Typography>
                </Grid>
              </Grid>
            </>
          ) : (
            <p>Please log in to view your profile.</p>
          )}
        </Box>

        <Button
          variant="contained"
          style={{
            backgroundColor: '#849493',
            color: 'white',
            fontSize: '1.2rem',
            marginTop: '1rem',
            alignSelf: 'center',
            width: '30%',
          }}
        >
          Edit Profile
        </Button>
      </Paper>
     
      // </DrawerAppBar>
    
  );
};

export default userProfilePage;