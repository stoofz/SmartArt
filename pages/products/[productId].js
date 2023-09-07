/* eslint-disable func-style */
import prisma from 'utils/prisma';
import React, { useState } from 'react';
import { useSessionId } from '../../utils/session';

import ReviewForm from '../../components/ReviewForm';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const ProductDetailsPage = ({ product, reviews: defaultReviews }) => {
  const [openForm, setOpenForm] = useState(false);
  const [reviews, setReviews] = useState(defaultReviews);


  const userId = useSessionId();
  
  const handleFormOpen = () => {
    setOpenForm(true);
  };

  const handleFormClose = () => {
    setOpenForm(false);
  };

// Handle the review submission,
  const handleReviewSubmit = (rating, comment) => {
    
    const newReview = {
      rating,
      comment,
      customer: {
        firstName: customer.firstName,
        lastName: customer.lastName,
      },
      date: new Date(), 
    };

    setReviews([...reviews, newReview]);
    
    console.log('Review Text:', newReview);
    // You can also update the UI with the new review if needed
    handleFormClose(); // Close the form after submission
    // You can also update the UI with the new review if needed
  };

  
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <main>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>{product.price}</p>
      </main>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Button
          onClick={handleFormOpen}
          startIcon={<AddIcon />}
          variant="outlined"
          style={{ backgroundColor: 'lightblue', color: 'white', borderColor: 'transparent' }}
        
      >
        Please Rate and Review!
      </Button>
      </div>
      <ReviewForm
        open={openForm}
        onClose={handleFormClose}
        onSubmit={handleReviewSubmit}
      />

      <section style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Typography variant="h4" gutterBottom>
          Customer Reviews
        </Typography>
        <Paper elevation={6} >
          <List>
          
          {reviews.map((review) => (
            <div key={review.id}>

              <ListItem alignItems="flex-start">
                <Avatar style={{ marginRight: '8px' }}>{review.customer.firstName}</Avatar>
                <ListItemText 
                primary={
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <Typography variant="body1" style={{ marginRight: '8px' }}>
                          {review.customer.firstName} {review.customer.lastName}
                        </Typography>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Rating
                            name="read-only"
                            value={review.rating}
                            precision={0.5} // Adjust this based on your rating system
                            readOnly
                            sx={{ fontSize: '18px' }} // You can use sx to style the Rating component
                          />
                        </div>
                      </div>
                      <div style={{ fontSize: '14px', color: '#777' }}>{new Date(review.date).toLocaleDateString()}</div>
                      <div style={{ fontSize: '14px', color: '#777', marginTop: '8px' }}>{review.comment}</div>
                    </div>
               
              }
                  />
              
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>

          ))}
        
        </List>
        </Paper>
        
      </section>
    
    </div>
  );
};

export async function getServerSideProps({ req, params } ) {
  const productId = params.productId;
  const product = await prisma.product.findUnique({
    where: { id: parseInt(productId) }
  });
  const serializedProduct = JSON.parse(JSON.stringify(product));

  const reviews = await prisma.feedback.findMany({
    where: { productId: parseInt(productId) },
    include: { customer: true }
  });
  const serializedReviews = JSON.parse(JSON.stringify(reviews));


  const sessionId = req.cookies.sessionId || null;
  const userId = parseInt(sessionId);
  const user = await prisma.customer.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
    },
  });

  return { props: { product: serializedProduct, reviews: serializedReviews, user: user || null } };
}

export default ProductDetailsPage;
