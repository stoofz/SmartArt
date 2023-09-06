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
import CloseIcon from '@mui/icons-material/Close';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [value, setValue] = useState(2.5);

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

  //add logic to add to wishlist
  const handleHeartClick = (productId) => {
    if (clicked === productId) {
      setClicked(false)
    } else {
      setClicked(productId)
    }
  };

  // const handleDialogOpen = (product) => {
  //   setSelectProduct(product);
  //   setDialogOpen((prev) => !prev);
  // };

  // const handleDialogClose = () => {
  //   setSelectProduct(null);
  //   setDialogOpen(false);
  // };

  //fill in HeartIcon on click and add to/remove from Wishlist
  // const addToWishlist = (id) => {
  //   if (!clicked) {
  //     setClicked(true);
  //     //logic to add to wishlist
  //   } else {
  //     setClicked(false);
  //     //logic to remove from wishlist
  //   }
  // }

  const productList = () => (products.map((product) =>
    <Card
      className={"MuiElevatedCard--01"}
      key={product.id}
      variant='outlined'
      sx={{ boxShadow: 2 }}
      p={4}
      m={8}
    >
      <CardContent className={"MuiCardContent-root"}>
        <Grid item p={1} m={2}>
          <Grid container style={{ height: '100%' }}>
            <Grid container justifyContent="center">
              <CardMedia
                className={"MuiCardMedia-root"}
                sx={{ height: 140 }}
                image={product.image}
                title="image alt"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item p={1} m={0}>
          <Grid container style={{ height: '100%' }} justifyContent="center">
            <Typography gutterBottom variant="h7" text-align="center">
              <NextLink
                href={{
                  pathname: "/products/[productId]",
                  query: { productId: product.id },
                }}
                passHref
              >
                <Link
                  classname={"MuiCardContent-link"}
                  overlay
                  underline="none"
                >
                  {product.name}
                </Link>
              </NextLink>
            </Typography>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container style={{ height: '100%' }} justifyContent="center">
            <Typography variant="h8" text-align="center">
              ${(product.price / 100).toFixed(2)}
            </Typography>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container style={{ height: '100%' }} justifyContent="center">
            <NextLink
              href={{
                pathname: "/products/[productId]",
                query: { productId: product.id },
              }}
              passHref
            >
              <Link
                classname={"MuiCardContent-link"}
                overlay
                underline="none"
              >
                <Rating
                  id={product.id}
                  name="simple-controlled"
                  precision={0.1}
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                >
                </Rating>
              </Link>
            </NextLink>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container justifyContent="center">
            <CardActions>
              <Button size="small" onClick={() => handleHeartClick(product.id)}>
                {clicked === product.id ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </Button>
              <Button size="small"><AddShoppingCartIcon /></Button>
              <Button onClick={() => setOpen(!open)}>
                <OpenInFullIcon />
              </Button>
              {/* // adjust backdrop to be transparent */}
              <Dialog open={open}>
                <Button onClick={() => setOpen(!open)}>
                  <CloseIcon />
                </Button>
                <DialogTitle>
                  <NextLink
                    href={{
                      pathname: "/products/[productId]",
                      query: { productId: product.id },
                    }}
                    passHref
                  >
                    <Link
                      classname={"MuiCardContent-link"}
                      overlay
                      underline="none"
                    >
                      {product.name}
                    </Link>
                  </NextLink>
                </DialogTitle>
                {product.description}
                ${(product.price / 100).toFixed(2)}
                <DialogActions>
                  <Button size="small" onClick={() => handleHeartClick(product.id)}>
                    {clicked === product.id ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </Button>
                  <Button size="small"><AddShoppingCartIcon /></Button>
                </DialogActions>
              </Dialog>
            </CardActions>
          </Grid>
        </Grid>
      </CardContent>
    </Card >
  ))

  return (
    <Grid container
      align="center"
      justifyContent="space-evenly"
      rowSpacing={1}
      columnSpacing={1}
      maxWidth={3 / 4}
      paddingLeft={50}
      paddingTop={10}
    >
      {productList()}
    </Grid>
  );
}

export default Products;
