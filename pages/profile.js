import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { useSessionId } from '/utils/session';

// import { useSearchState } from 'utils/search';
import Container from '@mui/material/Container';
import { Typography, Card, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import Link from 'next/link';




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
  const handleEdit = () => {
    // Implement your logic for editing customer data here
  };
  
  return (
    <Layout>
      
      <Container maxWidth="sm" style={{ color: "#F5C9C6", minHeight: "700px", }}>
        <Card elevation={3} component={Paper} style={{ padding: '1rem' }}>
          <div style={{ textAlign: 'center' }}>
            {isLoading ? (
              <p>Loading...</p>
            ) : customer ? (
              <>
                <Typography variant="h4" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  Hello, {customer.firstName} {customer.lastName}
                </Typography>

                <div style={{ marginTop: '2rem', textAlign: 'left' }}>
                  <Typography variant="body1">Email: {customer.email}</Typography>
                  <Typography variant="body1">Phone: (123) 456-7890</Typography>
                  <Typography variant="body1">
                    Location: New York, NY, USA
                  </Typography>
                  <Typography variant="body1">Member Since: January 1, 2022</Typography>
                </div>

                
              </>
            ) : (
              <p>Please log in to view your profile.</p>
            )}

            {/* Hardcoded Address Card */}
            <Typography variant="h5" style={{ marginTop: '2rem' }}>
              Address
            </Typography>

            <div style={{ textAlign: 'left' }}>
              <Typography variant="body1">Street: 123 Main St</Typography>
              <Typography variant="body1">City: New York</Typography>
              <Typography variant="body1">Province: NY</Typography>
              <Typography variant="body1">Country: USA</Typography>
              <Typography variant="body1">Postal: 12345</Typography>
              <Typography variant="body1">Phone: (123) 456-7890</Typography>
            </div>

            <Button
              variant="contained"
              style={{
                backgroundColor: '#304659', // Background color
                color: '#F5C9C6', // Text color
                transition: 'background-color 0.3s',
                marginTop: '1rem',
              }}
              onClick={handleEdit}
            >
              Edit Profile
            </Button>
          </div>
        </Card>
      </Container>
    </Layout>
  );
};

export default userProfilePage;