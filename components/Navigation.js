import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import { useSessionId } from '../utils/session';
import { setSession, clearSession } from 'utils/session';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import NextLink from 'next/link';
import { Montserrat } from 'next/font/google';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { handleAddToCart } from 'utils/cart';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useUser } from '@auth0/nextjs-auth0/client';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Fade from '@mui/material/Fade';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
//import debounce from 'lodash/debounce';
import { Formik, Form, Field } from "formik";
import { useSearchState } from 'utils/search';
import Link from 'next/link';
import CloseIcon from '@material-ui/icons/Close';

import { useRouter } from 'next/router';
import { ca } from "date-fns/locale";
import { showLoginToast } from "@/utils/loginToast";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';









const montserrat = Montserrat({
  weight: '600',
  subsets: ['latin']
});

// const Search = styled('div')`
//   width: '100%',
//   },
// `;


export default function Navigation({ sessionId }) {
  //const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const { user, error, isLoading } = useUser();

  const { searchResults, setSearchResults } = useSearchState();
  const open = Boolean(anchorEl);

  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  //to render conditionally second stack on use profule page as we dont have access to search functionality from there
  const router = useRouter();
  const isUserProfilePage = router.pathname === '/profile';
  const isOrdersPage = router.pathname.startsWith('/orders');
  const isReviewsPage = router.pathname === '/reviews';
  const isCartPage = router.pathname === '/cart';
  const isWishlistPage = router.pathname === '/wishlist';


  // useEffect(() => {
  //   new Swiper('.swiper-container', {
  //     slidesPerView: 'auto', // Adjust the number of visible items based on the container's width
  //     spaceBetween: 10,     // Adjust the space between items
  //     centeredSlides: true, // Center the active item
  //     navigation: {
  //       nextEl: '.swiper-button-next',
  //       prevEl: '.swiper-button-prev',
  //     },
  //   });
  // }, []);

  /*
  const handleChange = (event) => {
    //  setSearchTerm(event.target.value);
    handleSearch(event.target.value)
  };
  */
  //Paintings menu open/close

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl2(null);
  };

  //Profile menu open/close


  //---------------- HANDLE CATEGORY SEARCH ------------------------------//

  const handleCategorySearch = (async (categoryQuery) => {
    try {
      const response = await fetch('api/searchCategory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: categoryQuery }),
      });
      const results = await response.json();
      setSearchResults(results[0].products);
    }
    catch (error) {
      console.error('Error', error);
    }
  });

  const handleClick = (value) => {
    handleCategorySearch(value);
  };




  const handleSearch = (async (searchQuery) => {
    //  const handleSearch = debounce(async (searchQuery) => {
    try {
      const response = await fetch('api/searchProducts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });

      const results = await response.json();
      setSearchResults(results);
    }

    catch (error) {
      console.error('Error', error);
    }
  });
  // Debounce delay in milliseconds to delay search on input change
  //, 300);

  //-------------------WISHLIST, Cart, Profile LOGIC --------------------
  //pass this text to show in toaster
  const textToastFav = "Please log in to see your wishlist.";
  const textToastCart = "Please log in to see your cart.";
  const textToastProfile = "Please log in to access your account.";


  const theme = createTheme({
    typography: {
      fontFamily: [
        montserrat
      ]
    },
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

  // const userId = useSessionId();
  const userId = sessionId;

  const renderPaintingsMenu = (
    <Menu
      id="painting-menu-appbar"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
    >
      <MenuItem>
        <Button
          onClick={() => {
            handleClick('Watercolor');
            handleClose();
          }}
          sx={{
            color: theme.palette.primary.main,
            textDecoration: 'none',
            textTransform: "none",
            display: "flex",
            justifyContent: "flex-start",
            '&:hover': { textDecoration: 'underline' },
            cursor: 'pointer',
            background: 'none',
            border: 'none',
          }}
        >
          Watercolour
        </Button>
      </MenuItem>
      <MenuItem>

        <Button
          onClick={() => {
            handleClick('Acrylic');
            handleClose();
          }}
          sx={{
            color: theme.palette.primary.main,
            textDecoration: 'none',
            textTransform: "none",
            display: "flex",
            justifyContent: "flex-start",
            '&:hover': { textDecoration: 'underline' },
            cursor: 'pointer',
            background: 'none',
            border: 'none',
          }}
        >
          Acrylic
        </Button>

      </MenuItem>

      <MenuItem>
        <Button
          onClick={() => {
            handleClick('Oil');
            handleClose();
          }}
          sx={{
            color: theme.palette.primary.main,
            textDecoration: 'none',
            textTransform: "none",
            display: "flex",
            justifyContent: "flex-start",
            '&:hover': { textDecoration: 'underline' },
            cursor: 'pointer',
            background: 'none',
            border: 'none',
          }}
        >
          Oil
        </Button>
      </MenuItem>

    </Menu>
  );



  return (
    <ThemeProvider theme={theme}>
      <Box
        position="sticky"
        top={0}
        sx={{ width: '100%', zIndex: "1000" }}
      >
        {/* ---------------------MY NAV ---------------------------------------*/}

        <nav className="bg-primary text-info p-4 border-b-4 border-secondary" >
          <div className="mx-auto px-3 md:px-12 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <img
                  src="../uploads/smartartlogo.png"
                  className="h-12 md:h-20 lg:h-24"
                  alt="SmartArt Logo"
                />
              </Link>
            </div>
            <div className="flex space-x-2 md:space-x-8 " >

              {!userId ? (
                <>
                  <Link href="/api/auth/login" className={`hidden md:block hover:underline ${montserrat.className}`}>
                    <div>
                      Sign In
                    </div>
                  </Link>

                  <div className={`hover:cursor-pointer hidden md:block`}>
                    <FavoriteBorderIcon onClick={() => showLoginToast(textToastFav)}
                      sx={{ fontSize: "2em" }}
                    />
                  </div>

                  <div className={`hover:cursor-pointer`}>
                    <ShoppingCartCheckoutIcon onClick={() => showLoginToast(textToastCart)}
                      sx={{ fontSize: "2em" }} />
                  </div>

                  <Link href="/api/auth/login" className={`hover:cursor-pointer ${montserrat.className}`}>
                    <div>
                      <ManageAccountsIcon sx={{ fontSize: "2.1em !important" }} />
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/api/auth/logout"
                    className={`hover:underline ${montserrat.className}`}
                    onClick={clearSession}>
                    Log Out
                  </Link>

                  <Link href="/wishlist" className={`hover:cursor-pointer`}>
                    <FavoriteBorderIcon sx={{ fontSize: "2em" }} />
                  </Link>

                  <Link href="/cart" className={`hover:cursor-pointer`}>
                    <ShoppingCartCheckoutIcon sx={{ fontSize: "2em", marginRight: "1em" }} />
                  </Link>
                  <Link href="/profile" className={`hover:cursor-pointer`}>
                    <ManageAccountsIcon
                      sx={{ fontSize: "2.1em !important", marginRight: "1em" }}
                    />
                  </Link>
                </>
              )}
            </div>
          </div>


        </nav>




        {!isUserProfilePage && !isOrdersPage && !isReviewsPage && !isCartPage && !isWishlistPage && (
          <>

            <div className="bg-gray-800 text-white p-4">
              <div className="px-3 md:px-12 mx-auto flex justify-between items-center">
                <Link href="/products" className={`hover:underline pr-4 ${montserrat.className}`}>
                  <div>
                    The Collection
                  </div>
                </Link>

                <button
                  onClick={() => {
                    handleClick('Photography');
                  }}
                  className={`text-info pr-4 hover:underline cursor-pointer ${montserrat.className}`}

                >
                  Photography
                </button>

                <button
                  onClick={() => {
                    handleClick(' Sculptures');
                  }}
                  className={`text-info pr-4 hover:underline cursor-pointer ${montserrat.className}`}

                >
                  Sculptures
                </button>



                {/* Dropdown Menu */}
                <div className="pr-4 relative inline-block text-left">
                  <button
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    className={`inline-flex items-center justify-between w-30  py-2 font-medium  text-info hover:underline cursor-pointer  ${montserrat.className}`}
                    id="options-menu"
                    aria-expanded="true"
                  >
                    Paintings
                    <svg
                      className="w-5 h-5 ml-2 -mr-1"
                      // fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
                  {renderPaintingsMenu}


                </div>

                <Link href="/sale" className={`hover:underline pr-4 ${montserrat.className}`}>
                  <div>
                    Sale
                  </div>
                </Link>
                <Link href="/about" className={`hover:underline ${montserrat.className}`}>
                  <div>
                    About
                  </div>
                </Link>

                {/* Search Bar */}


                {/* <Search> */}
                <Formik initialValues={{ query: '' }} onSubmit={(values) => { handleSearch(values.query); }}>
                  <Form>
                    <div className="relative pl-10">
                      <div className="flex">
                        <Field name="query" render={({ field }) => (
                          <div className="flex items-center bg-primary-light hidden md:block">
                            <input
                              {...field}
                              type="text"
                              placeholder="Search..."
                              className="bg-primary-light focus:outline-none  text-primary-dark px-3 py-2 w-2/3 "
                            />

                            <button type="submit" className="ml-2">
                              <SearchIcon className="text-primary-dark text-2xl mr-3" />
                            </button>
                          </div>
                        )} />
                      </div>
                    </div>
                  </Form>
                </Formik>
                {/* </Search> */}
    
                    {searchOpen ? (
                      // Search bar is open
                      <Formik initialValues={{ query: '' }} onSubmit={(values) => { handleSearch(values.query); }}>
                        <Form>
                          <div className="relative">
                            <div className="flex">
                              <Field name="query" render={({ field }) => (
                                <div className="flex items-center bg-primary-light relative z-10">
                                  <input
                                    {...field}
                                    type="text"
                                    placeholder="Search..."
                                    className="bg-primary-light focus:outline-none text-primary-dark px-3 py-2 w-full"
                                  />

                                  <button type="submit" className="ml-2">
                                    <SearchIcon className="text-primary-dark text-2xl mr-3" />
                                  </button>
                                  <button onClick={toggleSearch} className="text-primary-dark text-2xl absolute top-0 right-0 -mt-3 -mr-3 z-20">
                                    <CloseIcon />
                                  </button>
                                </div>
                              )} />
                            </div>
                          </div>
                        </Form>
                      </Formik>
                    ) : (
                      // Search bar is closed

                      <button onClick={toggleSearch} className="text-2xl mr-3 md:hidden">
                        <SearchIcon />
                      </button>
                )}

              </div>
            </div>

            {/* SWIPER */}
            <div className="bg-gray-800 text-white p-4">
              <div className="px-3 md:px-12 mx-auto">
                <Swiper
                  spaceBetween={20}
                  slidesPerView={3}
                  loop={true}
                  onSlideChange={() => console.log('slide change')}
                  onSwiper={(swiper) => console.log(swiper)}
                >
                  <SwiperSlide style={{ border: '2px solid white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Link href="/products" className={`py-2 ${montserrat.className}`}>
                      <button>
                        The Collection
                      </button>
                    </Link>
                  </SwiperSlide>

                  <SwiperSlide style={{ border: '2px solid white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <button
                    onClick={() => {
                      handleClick('Photography');
                    }}
                    className={`text-info py-2 cursor-pointer ${montserrat.className}`}

                  >
                    Photography
                  </button>
                  </SwiperSlide>

                  <SwiperSlide style={{ border: '2px solid white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <button
                      onClick={() => {
                        handleClick(' Sculptures');
                      }}
                      className={`text-info py-2 cursor-pointer ${montserrat.className}`}

                    >
                      Sculptures
                    </button>

                  </SwiperSlide>
                  <SwiperSlide style={{ border: '2px solid white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <button
                      onClick={() => {
                        handleClick('Watercolor');
                      }}
                      className={`text-xs text-info py-3 cursor-pointer ${montserrat.className}`}
                    >
                      Watercolor paintings
                    </button>
                  </SwiperSlide>
                  <SwiperSlide style={{ border: '2px solid white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <button
                      onClick={() => {
                        handleClick('Acrylic');
                      }}
                      className={`text-xs text-info py-3 cursor-pointer ${montserrat.className}`}
                    >
                      Acrylic paintings
                    </button>
                  </SwiperSlide>
                  <SwiperSlide style={{ border: '2px solid white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <button
                      onClick={() => {
                        handleClick('Oil');
                      }}
                      className={`text-xs text-info py-3 cursor-pointer ${montserrat.className}`}
                    >
                      Oil paintings
                    </button>
                  </SwiperSlide>
                  <SwiperSlide style={{ border: '2px solid white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <button
                      onClick={() => {
                        handleClick('Sale');
                      }}
                      className={`text-info py-2 cursor-pointer ${montserrat.className}`}
                    >
                      Sale
                    </button>
                  </SwiperSlide>
                 
                  
                
                </Swiper>
              </div>
            </div>

            <Stack>
              <AppBar
                position="static"
                className={montserrat.className}
              >
                <Toolbar sx={{ display: "flex", justifyContent: "space-evenly" }}>
                  <NextLink
                    href={{
                      pathname: "/products",
                    }}
                    passHref
                    overlay="true"
                    sx={{ color: theme.palette.info.main }}
                  //        onClick={clearSession}
                  >
                    <Typography
                      sx={{
                        color: theme.palette.info.main,
                        textDecoration: 'none', '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      The Collection
                    </Typography>
                  </NextLink>

                  <Button
                    onClick={() => {
                      handleClick('Photography');
                    }}
                    sx={{
                      color: theme.palette.info.main,
                      textTransform: "none",
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                      cursor: 'pointer',
                      background: 'none',
                      border: 'none',
                    }}>
                    <Typography
                      sx={{
                        color: theme.palette.info.main,
                        textDecoration: 'none', '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      Photography
                    </Typography>
                  </Button>

                  <Button
                    onClick={() => {
                      handleClick('Sculptures');
                    }}
                    sx={{
                      color: theme.palette.info.main,
                      textTransform: "none",
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                      cursor: 'pointer',
                      background: 'none',
                      border: 'none',
                    }}>
                    <Typography
                      sx={{
                        color: theme.palette.info.main,
                        textDecoration: 'none', '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      Sculptures
                    </Typography>
                  </Button>

                  <Button
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{
                      mr: 2,
                      textTransform: 'none',
                      fontFamily: theme.typography.fontFamily,
                    }}
                    onClick={e => setAnchorEl(e.currentTarget)}
                    endIcon={<ArrowDropDownIcon sx={{ color: theme.palette.info }} />}
                  >
                    Paintings
                  </Button>
                  {/* 
                  {renderPaintingsMenu} */}

                  <NextLink
                    href={{
                      pathname: "/sale",
                    }}
                    passHref
                    overlay="true"
                    underline="none"
                    sx={{ color: theme.palette.info.main }}
                  //      onClick={clearSession}
                  >
                    <Typography
                      sx={{
                        color: theme.palette.info.main,
                        textDecoration: 'none', '&:hover': { textDecoration: 'underline' },
                        marginLeft: "-1em"
                      }}
                    >
                      Sale
                    </Typography>
                  </NextLink>
                  <NextLink
                    href={{
                      pathname: "/about",
                    }}
                    passHref
                    overlay="true"
                    underline="none"
                    sx={{ color: theme.palette.info.main }}
                  //        onClick={clearSession}
                  >
                    <Typography
                      sx={{
                        color: theme.palette.info.main,
                        textDecoration: 'none', '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      About
                    </Typography>
                  </NextLink>
                  {/* <Search> */}
                  {/* <Formik initialValues={{ query: '' }} onSubmit={(values) => { handleSearch(values.query); }}>
                    <Form>
                      <Field
                        name="query"
                        render={({ field }) => (
                          <TextField
                            {...field}
                            placeholder="Search…"
                            sx={{
                              backgroundColor: theme.palette.primary.light,
                              color: theme.palette.primary.main,
                              marginTop: "0.5em",
                              marginBottom: "0.5em",
                              marginRight: "-5em",
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <button type="submit"><SearchIcon sx={{ margin: "0.5em", fontSize: "2em" }} /></button>
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />
                    </Form>
                  </Formik> */}
                  {/* </Search> */}

                </Toolbar>
              </AppBar>
            </Stack>
          </>
        )}
      </Box>
    </ThemeProvider >
  );

};
