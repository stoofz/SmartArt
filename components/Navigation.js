import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { setSession, clearSession } from 'utils/session';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Montserrat } from 'next/font/google';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useUser } from '@auth0/nextjs-auth0/client';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
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

  //To show all products again on products page when clicking All Art after other filtering
  const handleClick = (value) => {
    const categoryToSearch = value === 'All Art' ? null : value;
    handleCategorySearch(categoryToSearch);
  };




  //---------------- HANDLE SEARCH BY WORD ------------------------------//
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
        sx={{
          width: '100%', 
          zIndex: "1000", 
          '@media (max-width: 767px)': {
            position: 'relative', // Non-sticky on mobile
          }, 
        }}
      >
        {/* ---------------------MY NAV ---------------------------------------*/}

        <nav className="bg-primary text-info p-4 border-b-4 border-secondary " >
          <div className="mx-auto md:px-12 flex justify-between items-center">
            {/* <div className="flex space-x-2 md:space-x-8"> */}
            {searchOpen ? (
              // Search bar is open
              <Formik initialValues={{ query: '' }} onSubmit={(values) => { handleSearch(values.query); }} >
                <Form style={{ width: "100%" }} className={`md:hidden w-full ${searchOpen ? 'relative z-10' : ''}`}>
                  <div className="relative">
                    <div className="flex">
                      <Field name="query" render={({ field }) => (
                        <div className="flex justify-between items-center bg-primary-light relative !w-full">
                          <input
                            {...field}
                            type="text"
                            placeholder="Search..."
                            className="bg-primary-light w-[75px] focus:outline-none text-primary-dark px-2 py-1 block"
                          />
                          <div >
                            <button type="submit" className="pr-2">
                              <SearchIcon className="text-primary-dark" />
                            </button>
                            <button onClick={toggleSearch} className="text-primary-dark pr-2" >
                              <CloseIcon />
                            </button>
                          </div>
                        </div>
                      )} />
                    </div>
                  </div>
                </Form>
              </Formik>
            ) : (
              // Search bar is closed
              <>
                <Link href="/">
                  <img
                    src="../uploads/smartartlogo.png"
                    className="h-8 md:h-20 lg:h-24"
                    alt="SmartArt Logo"
                  />
                </Link>
                <div className="flex space-x-2 md:space-x-8">

                  {/* USER IS NOT LOGGED IN */}
                  {!userId ? (
                    <>
                      <Link href="/api/auth/login" className={`text-xs md:text-base md:block hover:underline mt-1 md:mt-3 ${montserrat.className}`}>
                        Sign In
                      </Link>
                      <div className={`hover:cursor-pointer hidden md:block md:text-[30px]`}>
                        <FavoriteBorderIcon onClick={() => showLoginToast(textToastFav)} sx={{ fontSize: "1em" }} />
                      </div>
                        <button onClick={toggleSearch} className="md:hidden md:text-[30px]">
                        <SearchIcon sx={{ fontSize: "1.1em" }} />
                      </button>
                      <div className={`hover:cursor-pointer md:text-[30px]`}>
                        <ShoppingCartCheckoutIcon onClick={() => showLoginToast(textToastCart)} sx={{ fontSize: "1em" }} />
                      </div>
                      <Link href="/api/auth/login" className={`hover:cursor-pointer md:text-[30px] ${montserrat.className}`}>
                        <div>
                          <ManageAccountsIcon sx={{ fontSize: "1.1em !important" }} />
                        </div>
                      </Link>
                    </>
                  ) : (
                    <>
                      {/* USER IS LOGGED IN */}
                      <Link href="/api/auth/logout" className={`text-xs md:text-base md:block hover:underline mt-1 md:mt-3 ${montserrat.className}`} onClick={clearSession}>
                        Log Out
                      </Link>
                          <Link href="/wishlist" className={`hover:cursor-pointer hidden md:block md:text-[30px]`}>
                        <FavoriteBorderIcon sx={{ fontSize: "1em" }} />
                      </Link>
                          <button onClick={toggleSearch} className="md:hidden md:text-[30px]">
                        <SearchIcon sx={{ fontSize: "1.1em" }} />
                      </button>
                      <Link href="/cart" className={`hover:cursor-pointer md:text-[30px]`}>
                        <ShoppingCartCheckoutIcon sx={{ fontSize: "1em" }} />
                      </Link>
                      <Link href="/profile" className={`hover:cursor-pointer md:text-[30px] ${montserrat.className}`}>
                        <ManageAccountsIcon sx={{ fontSize: "1.1em !important" }} />
                      </Link>
                    </>
                  )}
                </div>
              </>

            )}
            {/* </div> */}

          </div>

        </nav>





        {!isUserProfilePage && !isOrdersPage && !isReviewsPage && !isCartPage && !isWishlistPage && (
          <>
            <div className="bg-primary text-white p-4 hidden md:block">
              <div className="px-3 md:px-12 mx-auto flex justify-between items-center ">
                <Link href="/products" className={`hover:underline pr-4 whitespace-nowrap ${montserrat.className}`}>
                  <button
                    onClick={() => {
                      handleClick('All Art');
                    }}
                    className={`text-info pr-4 hover:underline cursor-pointer ${montserrat.className}`}
                  >
                    All Art
                  </button>

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
                    handleClick('Sculptures');
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
                              className="bg-primary-light  focus:outline-none text-primary-dark px-3 py-2 w-2/3"
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
              </div>
            </div>

            {/* SWIPER MOBILE */}
            <div className="bg-primary text-white p-4 md:hidden">
              <div className="px-3 md:px-12 mx-auto text-xs">
                <Swiper
                  spaceBetween={20}
                  slidesPerView={'auto'}
                  loop={true}
                  onSlideChange={() => console.log('slide change')}
                  onSwiper={(swiper) => console.log(swiper)}
                >
                  <SwiperSlide style={{ width: 'auto', border: '1px solid white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Link href="/products" className={`px-3 py-1 text-xs ${montserrat.className}`}>
                      <button
                        onClick={() => {
                          handleClick('All Art');
                        }}
                        // className={`text-info pr-4 hover:underline cursor-pointer ${montserrat.className}`}
                      >
                        All Art
                      </button>
                    </Link>
                  </SwiperSlide>

                  


                  <SwiperSlide style={{ width: 'auto', border: '1px solid white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {/* <Link href="/products" className={`px-3 py-1 text-xs ${montserrat.className}`}> */}
                    <button
                      onClick={() => {
                        handleClick('Photography');
                      }}
                      className={`text-xs text-info px-3 py-1 cursor-pointer ${montserrat.className}`}

                    >
                      Photography
                    </button>
                    {/* </Link> */}
                  </SwiperSlide>

                  <SwiperSlide style={{ width: 'auto', border: '1px solid white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <button
                      onClick={() => {
                        handleClick('Sculptures');
                      }}
                      className={`text-xs text-info px-3 py-1 cursor-pointer ${montserrat.className}`}

                    >
                      Sculptures
                    </button>

                  </SwiperSlide>
                  <SwiperSlide style={{ width: 'auto', border: '1px solid white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <button
                      onClick={() => {
                        handleClick('Watercolor');
                      }}
                      className={`text-xs text-info px-3 py-1 cursor-pointer ${montserrat.className}`}
                    >
                      Watercolor paintings
                    </button>
                  </SwiperSlide>
                  <SwiperSlide style={{ width: 'auto', border: '1px solid white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <button
                      onClick={() => {
                        handleClick('Acrylic');
                      }}
                      className={`text-xs text-info px-3 py-1 cursor-pointer ${montserrat.className}`}
                    >
                      Acrylic paintings
                    </button>
                  </SwiperSlide>
                  <SwiperSlide style={{ width: 'auto', border: '1px solid white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <button
                      onClick={() => {
                        handleClick('Oil');
                      }}
                      className={`text-xs text-info px-3 py-1 cursor-pointer ${montserrat.className}`}
                    >
                      Oil paintings
                    </button>
                  </SwiperSlide>
                  <SwiperSlide style={{ width: 'auto', border: '1px solid white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Link href="/sale" >
                    <button
                      // onClick={() => {
                      //   handleClick('Sale');
                      // }}
                      className={`text-xs px-3 py-1 cursor-pointer ${montserrat.className}`}
                    >
                      Sale
                    </button>
                    
                    
                    </Link>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </>
        )}
      </Box>
    </ThemeProvider >
  );

};
