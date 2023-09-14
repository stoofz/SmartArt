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
              <Typography variant="h4" style={{ fontSize: '2rem',paddingBottom:'50px', fontWeight: 'bold', marginBottom: '1rem', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>
                Hello, {customer.firstName} {customer.lastName}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body1" style={{ fontSize: '1.2rem', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}>Email: {customer.email}</Typography>
                  <Typography variant="body1" style={{ fontSize: '1.2rem', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}>Phone: (123) 456-7890</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" style={{ fontSize: '1.2rem', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}>Location: New York, NY, USA</Typography>
                  <Typography variant="body1" style={{ fontSize: '1.2rem', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}>Member Since: January 1, 2022</Typography>
                </Grid>
              </Grid>
            </>
          ) : (
            <p>Please log in to view your profile.</p>
          )}

          <Typography variant="h5" style={{ fontSize: '1.5rem', marginTop: '2rem' }}>
            Address
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1" style={{ fontSize: '1.2rem', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}>Street: 534 Main St</Typography>
              <Typography variant="body1" style={{ fontSize: '1.2rem', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}>City: Vancouver</Typography>
              <Typography variant="body1" style={{ fontSize: '1.2rem', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}>Province: BC</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" style={{ fontSize: '1.2rem', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}>Country: Canada</Typography>
              <Typography variant="body1" style={{ fontSize: '1.2rem', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}>Postal: V8D 6K3</Typography>
              <Typography variant="body1" style={{ fontSize: '1.2rem', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}>Phone: (680) 456-7890</Typography>
            </Grid>
          </Grid>
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