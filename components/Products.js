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
import { styled } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { setSession, useSessionId } from 'utils/session';
import { useUser } from '@auth0/nextjs-auth0/client';
// import { addToCartApi } from 'utils/db';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const userId = useSessionId();

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

  //add to cart
  const handleAddToCart = async (productId) => {
    const quantity = 1;

    try {
      const response = await axios.post('/api/cart', {
        userId,
        productId,
        quantity,
      });
      // Show a success message ????.
      console.log('Item added to cart:', response.data);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      //  Show an error message to the user????

    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#495E48'
        // light: will be calculated from palette.primary.main,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: '#DDB8A6'
      },
      warning: {
        main: '#893F04'
      },
      info: {
        main: '#fff'
      }
    },
  });

  const ExpandIconStyled = styled(Button)`
    position: absolute;
    left: 1;
    right: 0;
    top: 0;
    bottom: 1;
    width: fit-content;
    height: 40px;
    visibility: hidden;
    color: ${theme.palette.info.main}
  `;

  const HeartIconStyled = styled(Button)`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 1;
    width: fit-content;
    visibility: hidden;
    color: ${theme.palette.info.main}
    `;

  const CartIconStyled = styled(Button)`
    position: absolute;
    left: 1;
    right: 1;
    top: 0;
    bottom: 1;
    width: fit-content;
    height: 40px;
    visibility: hidden;
    color: ${theme.palette.info.main}
    `;

  const ContainerStyled = styled("div")`
    position: relative;
    &:hover {
      .icon-button {
        visibility: visible;
      }
    }  
   }
   `;

  const DivStyled = styled("div")`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  `;


  const productList = () => (products.map((product) =>
    <Grid item xs={12} sm={6} md={4}>
      <ContainerStyled>
        <Card sx={{ minWidth: 200, boxShadow: 1 }}
          key={product.id}
          variant='outlined'
        >
          <CardMedia
            component="img"
            image="../uploads/woman.jpg"
            alt="work portfolio"
            sx={{ display: 'block' }}
          />
          <CardContent>
            <CardActions>
              <DivStyled>
                <ExpandIconStyled
                  variant="text"
                  className="icon-button"
                  onClick={() => setOpen(!open)}
                >
                  <OpenInFullIcon />
                </ExpandIconStyled>
                <Dialog open={open}>
                  <Button
                    variant="text"
                    onClick={() => setOpen(!open)}
                  >
                    <CloseIcon />
                  </Button>
                  <DialogTitle>
                    <NextLink
                      sx={{ color: theme.palette.primary.main }}
                      href={{
                        pathname: "/products/[productId]",
                        query: { productId: product.id },
                      }}
                      passHref
                    >
                      <Link
                        overlay
                        underline="none"
                        sx={{ color: theme.palette.primary.main }}
                      >
                        {product.name}
                      </Link>
                    </NextLink>
                  </DialogTitle>
                  {product.description}
                  ${(product.price / 100).toFixed(2)}
                  <DialogActions>
                    <Button
                      variant="text"
                      className="icon-button"
                      sx={{ color: theme.palette.primary.main }}
                      // works fine in Dialog
                      onClick={() => handleHeartClick(product.id)}
                    >
                      {clicked === product.id ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </Button>
                    <Button
                      sx={{ color: theme.palette.primary.main }}
                      variant="text"
                      className="icon-button"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      <AddShoppingCartIcon />
                    </Button>
                  </DialogActions>
                </Dialog>
                {/* funny behaviour, can't unclick, and then can't click anything on page */}
                <HeartIconStyled
                  variant="text"
                  className="icon-button"
                  onClick={() => handleHeartClick(product.id)}
                >
                  {clicked === product.id ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </HeartIconStyled>
                <CartIconStyled
                  variant="text"
                  className="icon-button"
                  onClick={() => handleAddToCart(product.idd)}
                >
                  <AddShoppingCartIcon />
                </CartIconStyled>
              </DivStyled>
              {/* // adjust backdrop to be transparent */}
            </CardActions>

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
              <NextLink
                href={{
                  pathname: "/products/[productId]",
                  query: { productId: product.id },
                }}
                passHref
              >
                <Link
                  overlay
                  underline="none"
                >
                  <Rating
                    id={product.id}
                    name="read-only"
                    readOnly
                    precision={0.1}
                    value={2.5}
                  >
                  </Rating>
                </Link>
              </NextLink>
            </Grid>

            <Grid item>
              <Grid container style={{ height: '100%' }} justifyContent="center">
                <Typography variant="h8" text-align="center">
                  ${(product.price / 100).toFixed(2)}
                </Typography>
              </Grid>
            </Grid>

          </CardContent>
        </Card >
      </ContainerStyled>
    </Grid >
  ))

  return (
    <ThemeProvider theme={theme}>
      <Grid container
        align="center"
        justify-content="center"
        maxWidth="75%"
        paddingLeft="25%"
        spacing={5}
      >
        {productList()}
      </Grid>
    </ThemeProvider>
  );
}

export default Products;
