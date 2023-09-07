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
import { addToCartApi } from 'utils/db';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [value, setValue] = useState(2.5);
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const userId = useSessionId();
  const history = useHistory();

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

  //ratings
  const handleRatingStars = (productId) => {
    if (clicked === productId) {
      setClicked(false)
    } else {
      setClicked(productId)
    }
  };

  //add to cart
  const addToCart = (userId, productId, quantity) => {
    if (user) {
      addToCartApi(userId, productId, quantity)
    } else {
      history.push('/login');
    }
  }

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
    bottom: 20;
    width: fit-content;
    height: 40px;
    visibility: hidden;
    color: ${theme.palette.info.main}
  `;

  const HeartIconStyled = styled(Button)`
    position: absolute;
    left: 0;
    right: 1;
    top: 0;
    bottom: 20;
    width: fit-content;
    visibility: hidden;
    color: ${theme.palette.info.main}
    `;

  const CartIconStyled = styled(Button)`
    position: absolute;
    left: 0;
    right: 0;
    middle: 1;
    top: 0;
    bottom: 20;
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
              <div
                display='flex'
                justify-content='space-evenly'
              >
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
                      onClick={() => handleHeartClick(product.id)}
                    >
                      {clicked === product.id ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </Button>
                    <Button
                      sx={{ color: theme.palette.primary.main }}
                      variant="text"
                      className="icon-button"
                      onClick={() => addToCart(userId, product.id, 1)}
                    >
                      <AddShoppingCartIcon />
                    </Button>
                  </DialogActions>
                </Dialog>
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
                  onClick={() => addToCart(userId, product.id, 1)}
                >
                  <AddShoppingCartIcon />
                </CartIconStyled>
              </div>
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
                    name="simple-controlled"
                    precision={0.1}
                    value={value}
                    onClick={(newValue) => {
                      setValue(newValue);
                    }}
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

            {/* <Grid item>
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
            {/* <Dialog open={open}>
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
            </Grid> */}
          </CardContent>
        </Card >
      </ContainerStyled>
    </Grid >
  ))

  return (
    <Grid container
      align="center"
      justify-content="center"
      maxWidth="75%"
      paddingLeft="25%"
      spacing={8}
    >
      {productList()}
    </Grid>
  );
}

export default Products;
