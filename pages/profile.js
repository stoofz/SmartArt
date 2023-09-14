import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { useSessionId } from '/utils/session';

// import { useSearchState } from 'utils/search';


import Link from 'next/link';
import {
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Box,
} from '@mui/material';



const userProfilePage = () => {
  const userId = useSessionId()
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const { searchResults } = useSearchState();
// console.log("customer", customer)

 
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
    <Layout>
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
        <Box textAlign='center'>
          {isLoading ? (
            <p>Loading...</p>
          ) : customer ? (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h5" style={{ fontSize: '1.5rem', marginTop: '2rem', textAlign: 'left' }}>
                    General Info
                  </Typography>
                  <Typography variant="body1" style={{ fontSize: '1.2rem', textAlign: 'left' }}>Email: {customer.email}</Typography>
                  <Typography variant="body1" style={{ fontSize: '1.2rem', textAlign: 'left' }}>Phone: (123) 456-7890</Typography>
                  <Typography variant="body1" style={{ fontSize: '1.2rem', textAlign: 'left' }}>Location: New York, NY, USA</Typography>
                  <Typography variant="body1" style={{ fontSize: '1.2rem', textAlign: 'left' }}>Member Since: January 1, 2022</Typography>
                </Grid>
                <Grid item xs={12} sm={4} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="h5" style={{ fontSize: '1.5rem', marginTop: '2rem' }}>
                    Shipping Address
                  </Typography>
                  <Typography variant="body1" style={{ fontSize: '1.2rem' }}>Street: 534 Main St</Typography>
                  <Typography variant="body1" style={{ fontSize: '1.2rem' }}>City: Vancouver</Typography>
                  <Typography variant="body1" style={{ fontSize: '1.2rem' }}>Province: BC</Typography>
                  <Typography variant="body1" style={{ fontSize: '1.2rem' }}>Country: Canada</Typography>
                  <Typography variant="body1" style={{ fontSize: '1.2rem' }}>Postal: V8D 6K3</Typography>
                  <Typography variant="body1" style={{ fontSize: '1.2rem' }}>Phone: (680) 456-7890</Typography>
                </Grid>
                <Grid item xs={12} sm={4} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="h5" style={{ fontSize: '1.5rem', marginTop: '2rem' }}>
                    Billing Address
                  </Typography>
                  <Typography variant="body1" style={{ fontSize: '1.2rem' }}>Street: 123 Billing St</Typography>
                  <Typography variant="body1" style={{ fontSize: '1.2rem' }}>City: Billing City</Typography>
                  <Typography variant="body1" style={{ fontSize: '1.2rem' }}>Province: Billing Province</Typography>
                  <Typography variant="body1" style={{ fontSize: '1.2rem' }}>Country: Billing Country</Typography>
                  <Typography variant="body1" style={{ fontSize: '1.2rem' }}>Postal: 12345</Typography>
                  <Typography variant="body1" style={{ fontSize: '1.2rem' }}>Phone: (123) 456-7890</Typography>
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
            backgroundColor: '#c1c9c9',
            color: 'black',
            fontSize: '1.2rem',
            marginTop: '1rem',
            alignSelf: 'center',
            width: '30%',
          }}
        >
          Edit Profile
        </Button>
      </Paper>
    </Layout>
  );
};

export default userProfilePage;