/* eslint-disable func-style */
import prisma from 'utils/prisma';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { averageRating } from 'utils/rating';
import { handleAddToCart } from 'utils/cart';
import { useSessionId } from '/utils/session';
import ReviewForm from '../../components/ReviewForm';

import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useWishlist } from '../../utils/wishlistContext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Montserrat } from 'next/font/google';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';

import formatPrice from 'utils/formatPrice';

import Layout from '@/components/Layout';
import { showLoginToast } from '@/utils/loginToast';


// import { handleAddToWishlist, showLoginToast } from '@/utils/loginToast';
import { useWishlistFunctions } from '@/utils/wishlistFnWithContext';

//---------------WHY HERE??---------------//

const applyDiscountToProduct = async (productId, productPrice) => {
  try {
    const payload = {
      productId,
      productPrice,
    };

    // only full path works with port 3000, works on 127.0.0.1:80 by default
    const response = await axios.post('http://127.0.0.1:3000/api/applyDiscount', payload);

    if (response.status === 200) {
      const data = await response.data;
      return data.discountedPrice;
    }
  } catch (error) {
    console.error('Error applying discount:', error);
  }
};

const montserrat = Montserrat({
  weight: '600',
  subsets: ['latin']
});


const theme = createTheme({
  palette: {
    primary: {
      main: '#324E4B'  //green
    },
    secondary: {
      main: '#F5C9C6'
    },
    warning: {
      main: '#B3001B'
    },
    info: {
      main: '#fff'
    }
  },
});


const ProductDetailsPage = ({ product, reviews: defaultReviews, user }) => {
  const [openForm, setOpenForm] = useState(false);
  const [reviews, setReviews] = useState(defaultReviews);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const { isInWishlist } = useWishlist();

  const userId = useSessionId();
  const { handleAddToWishlist } = useWishlistFunctions();
  //-------------------WISHLIST LOGIC --------------------
  const textToastFav = "Please log in to add items to your wishlist.";


  //---------------------CART LOGIC------------------------
  //additional fn to check if user is logged in before adding to cart
  const textToastCart = "Please log in to add items to your cart.";

  const handleAddToCartToast = (productId, userId, textToast) => {
    if (userId) {
      handleAddToCart(productId, userId);
    } else {
      // User is not logged in, show a toast notification
      showLoginToast(textToast);
    }
  };


  //----------------REVIEW LOGIC-----------------

  const handleFormOpen = () => {
    if (!user) {
      // User is not logged in, show an alert or perform any other action
      showLoginToast('Please log in to leave a review.');

    } else {
      setOpenForm(true);
    }
  };

  const handleFormClose = () => {
    setOpenForm(false);
    setComment();
    setRating(0);
  };

  //SAVE reviews to feedback table in db
  const saveReviewToDb = async (newReview) => {
    try {
      const response = await axios.post('/api/saveReview', newReview, {
        headers: {
          'Content-Type': 'application/json',
        },
      });


      if (response.status === 201) {

        // Review saved successfully, you can update the UI or take other actions.
        console.log('Review saved successfully');
        return response.data;
      } else {
        // Handle errors, show an error message to the user.
        console.error('Failed to save the review');
      }
    } catch (error) {
      console.error('An error occurred while saving the review:', error);
    }
  };

  // Handle the review submission,
  const handleReviewSubmit = async (rating, comment) => {

    // Check if rating is 0 or comment is empty
    if (!comment || comment.trim() === '') {
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
      customerId: user.id,
      productId: product.id,

    };

    //Update reviews object, add new review
    const returnedReveiew = await saveReviewToDb(newReview);
    setReviews([...reviews, returnedReveiew]);
    handleFormClose(); // Close the form after submission
    setComment();
    setRating(0);

  };

  // Function to handle review deletion from db and update UI
  const deleteReviewFromDb = async (id) => {
    try {
      // Show an alert to confirm before deleting
      const confirmDelete = window.confirm('Are you sure you want to delete this review?');

      if (confirmDelete) {
        // Send a DELETE request to the API route
        const response = await axios.delete('/api/deleteReview', { data: { id } });

        if (response.status === 200) {
          // Update the UI by removing the deleted review from the state
          setReviews(reviews.filter((review) => review.id !== id));
          console.log('Review deleted successfully');
        } else {
          // Handle error
          console.error('Failed to delete the review');
        }
      } else {
        console.log('Review deletion canceled');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }


  return (
    <ThemeProvider theme={theme}>
      <Layout >
        <main>
          <div className="flex flex-col md:flex-row items-center justify-evenly p-4 space-y-4 md:space-y-0">
            <CardMedia
              component="img"
              image={`../uploads/${product.image}`}
              className="block object-contain max-w-[600px]  max-h-[600px] p-8"
            />
            <Card elevation={4} sx={{ maxWidth: "md" }}>
              <Typography className="pt-4 pr-4 pl-4 text-primary-main text-lg md:text-xl lg:text-2xl" align="center" >
                {product.name}
              </Typography>
              <Typography variant="h6" align="center" sx={{ color: theme.palette.primary.dark, paddingTop: "1.5em" }}>
                {product.price !== product.originalPrice ? (
                  <span>
                    <span style={{ textDecoration: 'line-through', color: theme.palette.warning.dark }}> ${formatPrice(product.originalPrice)} </span> {' '} ${formatPrice(product.price)}
                  </span>) : (`$${formatPrice(product.price)}`
                )}
              </Typography>
              <Typography align="center" sx={{ paddingTop: "1.5em" }}>
                <Tooltip
                  title="Review Product"
                  placement="right"
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 600 }}
                  componentsProps={{
                    tooltip: {
                      sx: {
                        fontSize: "large",
                        marginRight: "1.75em"
                      },
                    },
                  }}
                  arrow
                >
                  <Rating
                    name="simple-controlled"
                    value={averageRating(reviews)}
                    precision={0.5}
                    onChange={handleFormOpen}
                  />
                </Tooltip>
              </Typography>

              <div className="flex justify-center md:px-4 pt-4">
                <Button
                  className=" text-lg md:text-xl lg:text-2xl px-4 py-2 md:px-10 md:py-4 md:mr-2 "
                  style={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.info.main,
                    textTransform: "none",
                    // paddingRight: "5em",
                    // paddingLeft: "5em",
                    marginRight: "2em",
                    ":hover": {
                      backgroundColor: theme.palette.secondary.main
                    }
                  }}
                  onClick={() => handleAddToCartToast(product.id, userId, textToastCart)}
                >
                  <Typography variant="h6">
                    Add To Cart
                  </Typography>
                </Button>
                {isInWishlist(product.id) ? (
                  <>
                    <Tooltip
                      title="Remove from Wishlist"
                      placement="right"
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 600 }}
                      componentsProps={{
                        tooltip: {
                          sx: {
                            fontSize: "large"
                          },
                        },
                      }}
                      arrow
                    >
                      <Button
                        type="button"
                        className="icon-button"
                        onClick={() => handleAddToWishlist(userId, product, textToastFav)}
                      >
                        <FavoriteIcon sx={{ fontSize: "2.5em" }} />
                      </Button>
                    </Tooltip>
                  </>
                ) : (
                  <>
                    <Tooltip
                      title="Add to Wishlist"
                      placement="right"
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 600 }}
                      componentsProps={{
                        tooltip: {
                          sx: {
                            fontSize: "large"
                          },
                        },
                      }}
                      arrow
                    >
                      <Button
                        type="button"
                        className="icon-button"
                        onClick={() => handleAddToWishlist(userId, product, textToastFav)}
                      >
                        <FavoriteBorderIcon sx={{ fontSize: "2.5em" }} />
                      </Button>
                    </Tooltip>
                  </>
                )}
              </div>

              <div style={{ color: theme.palette.primary.main, paddingTop: "6em" }}>
                <Accordion disableGutters={true} width="100%">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant="h6" sx={{ color: theme.palette.primary.dark }}>
                      Artist
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ backgroundColor: theme.palette.secondary.dark, color: theme.palette.info.main }} autoFocus={true}>
                    <Typography variant="h6">
                      {product.artist}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion disableGutters={true}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant="h6" sx={{ color: theme.palette.primary.dark }}>
                      Country
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ backgroundColor: theme.palette.secondary.dark, color: theme.palette.info.main }}>
                    <Typography variant="h6">
                      {product.country}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion disableGutters={true}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant="h6" sx={{ color: theme.palette.primary.dark }}>
                      Details</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ backgroundColor: theme.palette.secondary.dark, color: theme.palette.info.main }}>
                    <Typography variant="h6">
                      {product.description}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion disableGutters={true}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography variant="h6" sx={{ color: theme.palette.primary.dark }}>
                      Dimensions</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ backgroundColor: theme.palette.secondary.dark, color: theme.palette.info.main }}>
                    <Typography variant="h6">
                      {product.dimensions}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            </Card>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={handleFormOpen}
              startIcon={<AddIcon />}
              variant="outlined"
              style={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.info.main,
                borderColor: 'transparent',
                textTransform: "none",
                display: "flex",
                justifyContent: "center",
                margin: "2em",
                paddingRight: "2em",
                paddingLeft: "2em"
              }}

            >
              <Typography variant="h6">
                Leave Your Review!
              </Typography>
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
            <Typography variant="h5" gutterBottom align="center" sx={{ color: theme.palette.primary.main }}>
              Customer Reviews
            </Typography>

            <List>
              {reviews.length === 0 ? (
                <Typography variant="body1" align="center" sx={{ color: theme.palette.primary.main }}>
                  No reviews available
                </Typography>
              ) : (
                reviews
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((review, index) => (
                    // <div key={index} style={{ marginBottom: '10px' }}>
                    <Paper key={index} elevation={4} style={{
                      marginBottom: '10px', marginLeft: '20px',
                      marginRight: '20px',
                    }}>
                      <Card key={index} style={{ minHeight: '100px' }}>
                        <CardContent style={{ height: '150px', overflowY: 'auto', color: theme.palette.primary.main }} >
                          <ListItem alignItems="flex-start">
                            <Avatar style={{ marginRight: '8px', color: theme.palette.info.main, backgroundColor: theme.palette.primary.main }}>
                              {review.firstName}
                            </Avatar>
                            <ListItemText
                              primary={
                                <div>
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      marginBottom: '8px',
                                    }}
                                  >
                                    <Typography variant="body1" style={{ marginRight: '8px' }}>
                                      {review.firstName} {review.lastName}
                                    </Typography>
                                    <Rating name="read-only" readOnly value={review.rating} sx={{ display: 'flex', alignItems: 'center' }} />
                                  </div>
                                  <div style={{ fontSize: '14px', color: '#777' }}>
                                    {new Date(review.date).toLocaleDateString('en-CA')}
                                  </div>
                                  <div style={{ fontSize: '14px', color: '#777', marginTop: '8px' }}>
                                    {review.comment}
                                  </div>
                                </div>
                              }
                            />

                            {user && user.id === review.customerId && (
                              <Button
                                sx={{
                                  minWidth: 'unset', // Remove the minimum width
                                }}
                                onClick={() => {
                                  console.log("review.id", review.id);
                                  deleteReviewFromDb(review.id);
                                }
                                }
                                style={{ backgroundColor: 'lightpink', color: 'white', borderColor: 'transparent' }}
                              >
                                <DeleteIcon /> Delete
                              </Button>
                            )}
                          </ListItem>
                        </CardContent>
                      </Card>
                    </Paper>
                  ))
              )}
            </List>
          </section>
        </main>
      </Layout >
    </ThemeProvider >
  );
};

export async function getServerSideProps({ req, params }) {
  const productId = params.productId;
  const productItem = await prisma.product.findUnique({
    where: { id: parseInt(productId) }
  });

  let product = {};

  if (productItem) {
    const price = Number(await applyDiscountToProduct(productItem.id, productItem.price));
    const originalPrice = Number(productItem.price);

    product = {
      ...productItem,
      price,
      originalPrice
    };

  }

  const serializedProduct = JSON.parse(JSON.stringify(product));

  const reviews = await prisma.feedback.findMany({
    where: { productId: parseInt(productId) },
    include: { customer: true }
  });

  const extractedReviews = reviews.map((review) => {
    const { id, customerId, date, rating, comment } = review;
    const { firstName, lastName } = review.customer;

    return {
      id,
      customerId,
      date,
      rating,
      comment,
      firstName,
      lastName,
    };
  });

  const serializedReviews = JSON.parse(JSON.stringify(extractedReviews));

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

  return { props: { product: serializedProduct, reviews: serializedReviews, user: user || null } };
}

export default ProductDetailsPage;
