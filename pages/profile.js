import React from 'react';
import Layout from '../components/Layout';
import { useSessionId } from '/utils/session';


import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from 'next/link';

import { ListItem, List, ListItemText }  from '@mui/material';




const UserProfile = () => {
  const userId = useSessionId()
 

  // Replace with actual user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatarUrl: '/path-to-avatar.jpg',
  };


  

  return (
    <Layout>
      <div>
        {/* <Typography variant="h2" sx={{ paddingLeft: '150px' }}>Your profile</Typography> */}
        {userId ? (
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
              {user.name}
            </Typography>
            <Typography
              variant="subtitle1"
              style={{
                color: 'rgba(0, 0, 0, 0.54)',
              }}
            >
              {user.email}
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
                '&:hover': {
                  backgroundColor: 'darkgray',
                },
              }}
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

export default UserProfile;