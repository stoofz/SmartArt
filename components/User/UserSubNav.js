//NONACTIVE CODE

// import Link from 'next/link';
// import { List, ListItem, Button, Typography } from '@mui/material';
// import { useUser } from '@auth0/nextjs-auth0/client';

// const Subnav = () => {
//   const { user, error, isLoading } = useUser();
//   return (
//     <nav style={{ 
//       position: "sticky",
//       top: "7rem",
//       // zIndex: 2000,
     
//       padding: '20px', 
//       display: 'flex', 
//       flexDirection: 'column' 
//       }}>
    
//       <List style={{ marginBottom: '1rem' }}>
//         <Typography variant="h4" 
//         style={{ 
//           fontSize: '2rem', 
//           paddingLeft:'15px', 
//           fontWeight: 'bold', 
//           marginBottom: '1rem',
//           textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>
//           Hi, {user.given_name} {user.family_name}!
          
//           {/* Hello, Kate Spade! */}
//         </Typography>
//         {/* My Info */}
//         <ListItem style={{ cursor: 'pointer' }}>
//           <Link href="/profile">
//             <Button
//               variant="contained"
//               style={{
//                 backgroundColor: '#F5C9C6', // Background color
//                 '&:hover': {
//                   backgroundColor: '#32434e', // Background color on hover
//                   color: 'white', // Text color on hover
//                 },
//                 width: '200px', // Set the width
//                 color: '#32434E', // Text color
//               }}
//             >
//               My Info
//             </Button>
//           </Link>
//         </ListItem>
//         {/* My Orders */}
//         <ListItem style={{ cursor: 'pointer' }}>
//           <Link href="/orders">
//             <Button
//               variant="contained"
//               style={{
//                 backgroundColor: '#F5C9C6', // Background color
//                 '&:hover': {
//                   backgroundColor: '#32434e', // Background color on hover
//                   color: 'white', // Text color on hover
//                 },
//                 width: '200px', // Set the width
//                 color: '#32434E', // Text color
//               }}
//             >
//               My Orders
//             </Button>
//           </Link>
//         </ListItem>

//         {/* My Wishlist */}
//         <ListItem style={{ cursor: 'pointer' }}>
//           <Link href="/wishlist">
//             <Button
//               variant="contained"
//               style={{
//                 backgroundColor: '#F5C9C6', // Background color
//                 '&:hover': {
//                   backgroundColor: '#32434e', // Background color on hover
//                   color: 'white', // Text color on hover
//                 },
//                 width: '200px', // Set the width
//                 color: '#32434E', // Text color
//               }}
//             >
//               My Wishlist
//             </Button>
//           </Link>
//         </ListItem>

//         {/* My Cart */}
//         <ListItem style={{ cursor: 'pointer' }}>
//           <Link href="/cart">
//             <Button
//               variant="contained"
//               style={{
//                 backgroundColor: '#F5C9C6', // Background color
//                 '&:hover': {
//                   backgroundColor: '#32434e', // Background color on hover
//                   color: 'white', // Text color on hover
//                 },
//                 width: '200px', // Set the width
//                 color: '#32434E', // Text color
//               }}
//             >
//               My Cart
//             </Button>
//           </Link>
//         </ListItem>

//         {/* My Reviews */}
//         <ListItem style={{ cursor: 'pointer' }}>
//           <Link href="/reviews">
//             <Button
//               variant="contained"
//               style={{
//                 backgroundColor: '#F5C9C6', // Background color
//                 '&:hover': {
//                   backgroundColor: '#32434e', // Background color on hover
//                   color: 'white', // Text color on hover
//                 },
//                 width: '200px', // Set the width
//                 color: '#32434E', // Text color
//               }}
//             >
//               My Reviews
//             </Button>
//           </Link>
//         </ListItem>

//         <ListItem style={{ cursor: 'pointer' }}>
//           <Link href={`/`}>
//             <Button
//               variant="contained"
//               style={{
//                 backgroundColor: '#937876', // Background color
//                 color: 'white', // Text color
//                 transition: 'background-color 0.3s',
//                 marginTop: '1rem',
//                 '&:hover': {
//                   backgroundColor: '#32434e', // Hover background color
//                   width: '200px',
//                   color: 'white', // Hover text color
//                 },
//               }}
//             >
//               Continue shopping
//             </Button>
//           </Link>
//         </ListItem>

//       </List>
   
//     </nav>
//   );
// };

// export default Subnav;