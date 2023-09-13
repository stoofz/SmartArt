import Link from 'next/link';
import { List, ListItem, ListItemText, Button, Typography } from '@mui/material';

export default function Sidebar() {
    return (
      <nav style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
        
        <List style={{ marginBottom: '1rem' }}>

          
        <ListItem style={{ cursor: 'pointer' }}>
            <Link href="/admin">
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
                Dashboard
              </Button>
            </Link>
          </ListItem>


          <ListItem style={{ cursor: 'pointer' }}>
            <Link href="/admin/products">
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
                Products
              </Button>
            </Link>
          </ListItem>

   
          <ListItem style={{ cursor: 'pointer' }}>
            <Link href="/admin/orders">
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
                Orders
              </Button>
            </Link>
          </ListItem>
        </List>
    
      </nav>
    );
  };
  