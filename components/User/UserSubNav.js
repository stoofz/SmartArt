import Link from 'next/link';
import { List, ListItem, ListItemText, Button, Typography } from '@mui/material';


const Subnav = () => {
  return (
    <nav style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      
      <List style={{ marginBottom: '1rem' }}>
        {/* My Info */}
        <ListItem style={{ cursor: 'pointer' }}>
          <Link href="/profile">
            <Button
              variant="contained"
              style={{
                backgroundColor: '#fae4e2', // Background color
                '&:hover': {
                  backgroundColor: '#32434e', // Background color on hover
                  color: 'white', // Text color on hover
                },
                width: '200px', // Set the width
                color: '#32434E', // Text color
              }}
            >
              My Info
            </Button>
          </Link>
        </ListItem>
        {/* My Orders */}
        <ListItem style={{ cursor: 'pointer' }}>
          <Link href="/orders">
            <Button
              variant="contained"
              style={{
                backgroundColor: '#fae4e2', // Background color
                '&:hover': {
                  backgroundColor: '#32434e', // Background color on hover
                  color: 'white', // Text color on hover
                },
                width: '200px', // Set the width
                color: '#32434E', // Text color
              }}
            >
              My Orders
            </Button>
          </Link>
        </ListItem>

        {/* My Wishlist */}
        <ListItem style={{ cursor: 'pointer' }}>
          <Link href="/wishlist">
            <Button
              variant="contained"
              style={{
                backgroundColor: '#fae4e2', // Background color
                '&:hover': {
                  backgroundColor: '#32434e', // Background color on hover
                  color: 'white', // Text color on hover
                },
                width: '200px', // Set the width
                color: '#32434E', // Text color
              }}
            >
              My Wishlist
            </Button>
          </Link>
        </ListItem>

        {/* My Cart */}
        <ListItem style={{ cursor: 'pointer' }}>
          <Link href="/cart">
            <Button
              variant="contained"
              style={{
                backgroundColor: '#fae4e2', // Background color
                '&:hover': {
                  backgroundColor: '#32434e', // Background color on hover
                  color: 'white', // Text color on hover
                },
                width: '200px', // Set the width
                color: '#32434E', // Text color
              }}
            >
              My Cart
            </Button>
          </Link>
        </ListItem>

        {/* My Reviews */}
        <ListItem style={{ cursor: 'pointer' }}>
          <Link href="/reviews">
            <Button
              variant="contained"
              style={{
                backgroundColor: '#fae4e2', // Background color
                '&:hover': {
                  backgroundColor: '#32434e', // Background color on hover
                  color: 'white', // Text color on hover
                },
                width: '200px', // Set the width
                color: '#32434E', // Text color
              }}
            >
              My Reviews
            </Button>
          </Link>
        </ListItem>

        <ListItem style={{ cursor: 'pointer' }}>
          <Link href={`/`}>
            <Button
              variant="contained"
              style={{
                backgroundColor: '#304659', // Background color
                color: '#F5C9C6', // Text color
                transition: 'background-color 0.3s',
                marginTop: '1rem',
                '&:hover': {
                  backgroundColor: '#32434e', // Hover background color
                  width: '200px',
                  color: 'white', // Hover text color
                },
              }}
            >
              Continue shopping
            </Button>
          </Link>
        </ListItem>

      </List>
   
    </nav>
  );
};

export default Subnav;