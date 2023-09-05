import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

{/* <div>
<h1>Orders</h1>
<ul>
  {orders.map((order) => (
    <li key={order.id}>
      {order.id} - {' '}
      <button onClick={() => handleOrderViewOpen(order)}>View</button>
    </li>
  ))}
</ul> */}
// const dayListItems = () => (props.days.map((day) => 
// <DayListItem
//   key={day.id}
//   name={day.name}
//   spots={day.spots} 
//   selected={props.value === day.name}
//   setDay={() => props.onChange(day.name)}
// />
// ))
// return (
//   <ul>{dayListItems()}</ul>
// );


const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectProduct, setSelectProduct] = useState(null);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch('/api/listProducts');
        if (response.ok) {
          setProducts(await response.json());
        }
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    getProducts();
  }, []);

  //fill in HeartIcon on click and add to/remove from Wishlist
  const addToWishlist = () => {
    if(!clicked) {
    setClicked(true);
    //logic to add to wishlist
    } else {
      setClicked(false);
      //logic to remove from wishlist
    }
  }

  const productList = () => (products.map((product) =>
    <Card
      key={product.id}
      sx={{ maxWidth: 345 }}
      variant='outlined'
    >
      <CardMedia
        sx={{ height: 140 }}
        image={product.image}
        title="image alt"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <NextLink
            href={{
              pathname: "/products/[productId]",
              query: { productId: product.id },
            }} passHref>
            <Link
              overlay
              underline="none"
              sx={{ color: 'text.tertiary' }}
            >
              {product.name}
            </Link>
          </NextLink>
        </Typography>
        <Typography variant="h6" color="text.secondary">
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => addToWishlist()}>
          {clicked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </Button>
        <Button size="small"><AddShoppingCartIcon/></Button>
      </CardActions>
    </Card>
  ))

  return (
    <Grid
    container 
    spacing={3}
    direction='column'
    justifyContent="center"
    alignItems="center"
    >
      <Grid item xs={3}>
        {productList()}
      </Grid>
    </Grid>
  );
}

export default Products;
