/* eslint-disable func-style */
import prisma from 'utils/prisma';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

const ProductDetailsPage = ({ product, reviews }) => {

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
                          {Array.from({ length: review.rating }).map((_, index) => (
                            <StarIcon key={index} color="primary" style={{ fontSize: '18px' }} />
                          ))}
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

export async function getServerSideProps(context) {

  const productId = context.params.productId;

  const product = await prisma.product.findUnique({
    where: { id: parseInt(productId) }
  });

  const serializedProduct = JSON.parse(JSON.stringify(product));

  const reviews = await prisma.feedback.findMany({
    where: { productId: parseInt(productId) },
    include: { customer: true }
  });

  console.log("Reviews:", reviews)

  const serializedReviews = JSON.parse(JSON.stringify(reviews));

  console.log("serializedReviews:", serializedReviews.rating)

  return { props: { product: serializedProduct, reviews: serializedReviews } };
}

export default ProductDetailsPage;
