import { useState, useEffect } from 'react';
import { useSessionId } from '../utils/session';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import NextLink from 'next/link';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import Paginate from './Pagination';
import { averageRating } from 'utils/rating';
import { useSearchState } from 'utils/search';


const WatercolorPaintings = () => {
  const [watercolorPs, setWatercolorPs] = useState([]);
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(21);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const { searchResults, setSearchResults } = useSearchState();

  //handles scrolling to top when changing pages
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  const userId = useSessionId();

  useEffect(() => {
    const getwatercolorPs = async () => {
      try {
        const response = await fetch('/api/listWatercolorPaintings');
        if (response.ok) {
          const watercolors = await response.json();
          const watercolorData = () => watercolors.map((watercolor) => {
            setWatercolorPs(watercolor.products);
            // Find total amount of products
            setTotalProducts(watercolor.products.length);
          })
          watercolorData();
        }
      } catch (error) {
        console.error('Error fetching products', error);
      }
      finally
      {
        setLoading(false);
      }
    };
    getwatercolorPs();
  }, [currentPage]);


  useEffect(() => {
    if (searchResults !== null && searchResults.length > 0) {
      setWatercolorPs(searchResults);
      setTotalProducts(searchResults.length);
    }
    else {
      // Set products to empty array if no search results
      setWatercolorPs([]);
      setTotalProducts(0);
    }
  }, [searchResults]);


  // Find Products to display per page
  const lastProductOfPage = currentPage * productsPerPage;
  const firstProductOfPage = lastProductOfPage - productsPerPage;
  const pageWatercolorPs = watercolorPs.slice(firstProductOfPage, lastProductOfPage);


  //add logic to add to wishlist
  const handleHeartClick = (productId) => {
    if (clicked === productId) {
      setClicked(false)
    } else {
      setClicked(productId)
    }
  };



  const theme = createTheme({
    palette: {
      primary: {
        main: '#324E4B'
        // light: will be calculated from palette.primary.main,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: '#F5C9C6'
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
    right: 1;
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



  const watercolorList = () => (pageWatercolorPs.map((product) =>


    <Grid item="true" xs={12} sm={6} md={4}
      sx={{ maxWidth: '100%' }}
      key={product.id}
    >
      <ContainerStyled>
        <Card sx={{ minWidth: 200, boxShadow: 1 }}
          key={product.id}
          variant='outlined'
        >
          <CardMedia
            component="img"
            image={`./uploads/${product.image}`}
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
                    id={product.id}
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
                      overlay="true"
                      underline="none"
                    >
                      {product.name}
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
                  onClick={() => handleAddToCart(product.id)}
                >
                  <AddShoppingCartIcon />
                </CartIconStyled>
              </DivStyled>
              {/* // adjust backdrop to be transparent */}
            </CardActions>

            <Grid item="true" p={1} m={0}>
              <Grid container style={{ height: '100%' }} justifyContent="center">
                <Typography gutterBottom variant="h7" text-align="center">
                  <NextLink
                    href={{
                      pathname: "/products/[productId]",
                      query: { productId: product.id },
                    }}
                    passHref
                    overlay="true"
                    underline="none"
                  >
                    {product.name}
                  </NextLink>
                </Typography>
              </Grid>
            </Grid>

            <Grid item="true">
              <NextLink
                href={{
                  pathname: "/products/[productId]",
                  query: { productId: product.id },
                }}
                passHref
                overlay="true"
                underline="none"
              >
                <Rating
                  id={product.id}
                  name="read-only"
                  readOnly
                  precision={0.1}
                  // how to access nested select value and average it?
                  value={averageRating(product.feedback)}
                >
                </Rating>
              </NextLink>
            </Grid>

            <Grid item="true">
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


  if (loading) {
    return (
      <ThemeProvider theme={theme}>
      <Grid container
        align="center"
        justify-content="center"
        maxWidth="75%"
        paddingTop="5em"
        paddingLeft="10em"
        paddingRight="10em"
        paddingBottom="1em"
        margin= "auto"
        spacing={5}
        >
          <div>Loading...</div>

        </Grid>
        </ThemeProvider>
    )
  }
  return (
    <ThemeProvider theme={theme}>

      <Grid container
        align="center"
        justify-content="center"
        maxWidth="75%"
        paddingTop="5em"
        paddingLeft="10em"
        paddingRight="10em"
        paddingBottom="1em"
        margin="auto"
        spacing={5}
      >
        {watercolorList()}

        <Paginate
          count={Math.ceil(totalProducts / productsPerPage)}
          page={currentPage}
          onChange={(e, value) => {
            setCurrentPage(value)
            scrollToTop();

          }}
          sx={{ shape: "rounded", marginTop: "1.5em" }}
        />

      </Grid>
    </ThemeProvider>
  );
};

export default WatercolorPaintings;