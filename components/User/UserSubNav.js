import Link from 'next/link';
import { List, ListItem, ListItemText, Button, Typography } from '@mui/material';

const Subnav = () => {
  return (
    <nav style={{ padding: '20px' }}>
      <Typography variant="h4" sx={{ textAlign: 'center' }}>Your profile</Typography>
      <List style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        {/* My Info */}
        <ListItem style={{ cursor: 'pointer' }}>
          <Link href="/profile">
            <ListItemText primary="My Info" />
          </Link>
        </ListItem>
        {/* My Orders */}
        <ListItem style={{ cursor: 'pointer' }}>
          <Link href="/orders">
            <ListItemText primary="My Orders" />
          </Link>
        </ListItem>

        {/* My Wishlist */}
        <ListItem style={{ cursor: 'pointer' }}>
          <Link href="/wishlist">
            <ListItemText primary="My Wishlist" />
          </Link>
        </ListItem>

        {/* My Reviews */}
        <ListItem style={{ cursor: 'pointer' }}>
          <Link href="/reviews">
            <ListItemText primary="My Reviews" />
          </Link>
        </ListItem>

        {/* My Cart */}
        <ListItem style={{ cursor: 'pointer' }}>
          <Link href="/cart">
            <ListItemText primary="My Cart" />
          </Link>
        </ListItem>
        <Link href={`/`}>
          <ListItem style={{ cursor: 'pointer' }}>
            <Button size="small"
              variant="contained"
              style={{
                backgroundColor: 'lightblue', color: 'white', width: "200px", transition: 'background-color 0.3s',
                '&:hover': {
                  backgroundColor: 'blue',
                },
              }}
            >
              Continue shopping
            </Button>
          </ListItem>
        </Link>
      </List>
    </nav>
  );
};

export default Subnav;