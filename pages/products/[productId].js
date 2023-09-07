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

const ProductDetailsPage = ({ product, reviews: defaultReviews, user }) => {
  const [openForm, setOpenForm] = useState(false);
  const [reviews, setReviews] = useState(defaultReviews);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  
  const handleFormOpen = () => {
    if (!user) {
      // User is not logged in, show an alert or perform any other action
      alert('Please log in to leave a review.');
    } else {
    setOpenForm(true);
    }
  };

  const handleFormClose = () => {
    setOpenForm(false);
  };

// Handle the review submission,
  const handleReviewSubmit = (rating, comment) => {
    
    // Check if rating is 0 or comment is empty
    if ( !comment || comment.trim() === '') {
      // Show an error message to the user or handle the validation error
      alert('Please provide a rating and comment before submitting.');
      return; // Prevent further execution of the function
    }

    const newReview = {
      date: new Date(),
      rating: rating,
      comment: comment,
      firstName: user.firstName,
      lastName: user.lastName,
      //   customerId: user.id,
      //   productId: product.id,
      //   rating: rating,
      //   comment: comment,
      //   date: new Date(),
      //     customer: {
      //       id: user.id,
      //       firstName: user.firstName,
      //       lastName: user.lastName,
      //       email: user.email,
      //       subId: user.subId,
      //       stripeId: user.stripeId
      // }

    };

    //Update reviews object, add new review
    setReviews([...reviews, newReview]);
    handleFormClose(); // Close the form after submission
    setComment()
    setRating()
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
        comment={comment}
        setComment={setComment}
        rating={rating}
        setRating={setRating}
      />

      <section style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Typography variant="h4" gutterBottom>
          Customer Reviews
        </Typography>
        <Paper elevation={6} >
          <List>
          
          {reviews
          .sort((a, b) => b.date - a.date) // Sort reviews by date in descending order
          .map((review, index) => (
            <div key={index}>

              <ListItem alignItems="flex-start">
                <Avatar style={{ marginRight: '8px' }}>{review.firstName}</Avatar>
                <ListItemText 
                primary={
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <Typography variant="body1" style={{ marginRight: '8px' }}>
                          {review.firstName} {review.lastName}
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

  const extractedReviews = reviews.map((review) => {
    const { date, rating, comment } = review;
    const { firstName, lastName } = review.customer;

    return {
      date,
      rating,
      comment,
      firstName,
      lastName,
    };
  });
  
  const serializedReviews = JSON.parse(JSON.stringify(extractedReviews));
console.log("reviews", reviews)

  const sessionId = req.cookies.sessionId || null;
  const userId = parseInt(sessionId);
  let user = null;

  // Check if userId is a valid number before fetching the user
  if (!isNaN(userId)) {
    user = await prisma.customer.findUnique({
      where: {
        id: userId,
      },
    });
  }
console.log("user", user)
  return { props: { product: serializedProduct, reviews: serializedReviews, user: user || null } };
}

export default ProductDetailsPage;
