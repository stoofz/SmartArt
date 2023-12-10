import { useRouter } from 'next/router';
import Link from 'next/link';

import Layout from '../Layout';
import { Button, Typography, Container, Paper } from '@mui/material';

const DeniedAccess = () => {
  const router = useRouter();

  const handleReturnHome = () => {
    router.push('/');
  };

  return (
    // <Layout>
      <Container maxWidth="md" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }} >
        <Paper elevation={6} style={{ padding: '16px' }}>
          <div className="container mx-auto mt-10 text-center">
            <Typography variant="h4" gutterBottom className="font-bold mb-4">
              Access Denied
            </Typography>
            <Typography variant="body1" className="font-bold pb-[30px]">
              Sorry, you do not have access to this page.
            </Typography>
            <Button
              size="small"
              variant="contained"
              style={{
                backgroundColor: '#141f1e',
                color: 'white',
                transition: 'background-color 0.3s',
                '&:hover': {
                  backgroundColor: 'blue',
                },
               
                
              }}
              onClick={handleReturnHome}
            >
              Return to Main Page
            </Button>
          </div>
        </Paper>
      </Container>

    // </Layout>
  );
};

export default DeniedAccess;