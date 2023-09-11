import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { useSessionId } from '/utils/session';


import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';

import { ListItem, List, ListItemText }  from '@mui/material';




const userProfilePage = () => {
  const userId = useSessionId()
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
console.log("customer", customer)

 
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
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : customer ? (
          <Container
            maxWidth="sm"
            style={{
              paddingTop: '1.5rem',
              paddingBottom: '1.5rem',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h4"
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
              }}
            >
              {customer.firstName} {customer.lastName}
            </Typography>
            <Typography
              variant="subtitle1"
              style={{
                color: 'rgba(0, 0, 0, 0.54)',
              }}
            >
              {customer.email}
            </Typography>

            <div
              style={{
                marginTop: '2rem',
                textAlign: 'left',
              }}
            >
              {/* Add more user details here */}
              <Typography variant="body1">Phone: (123) 456-7890</Typography>
              <Typography variant="body1">Location: New York, USA</Typography>
              <Typography variant="body1">Member Since: January 1, 2022</Typography>
            </div>

            <Button
              variant="contained"
              style={{
                backgroundColor: 'lightpink',
                color: 'white',
                transition: 'background-color 0.3s',
              }}
              sx={{
                '&:hover': {
                  backgroundColor: 'darkgray',
                },
              }}
              onClick={handleEdit}
            >
              Edit Profile
            </Button>
          </Container>
        ) : (
          <p>Please log in to view your profile.</p>
        )}
      </div>
    </Layout>
  );
};

export default userProfilePage;