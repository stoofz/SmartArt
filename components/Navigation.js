import { React, useState } from "react";
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
import { handleAddToCart } from 'utils/cart';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useUser } from '@auth0/nextjs-auth0/client';

const montserrat = Montserrat({
  weight: '600',
  subsets: ['latin']
});

const Search = styled('div')`
  width: '100%',
  },
`;

export default function Navigation({ sessionId }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { user, error, isLoading } = useUser();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
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
 // const userId = useSessionId();
  const userId = sessionId;

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Stack spacing={4}>
          <AppBar
            position="static"
            className={montserrat.className}
            sx={{ padding: "0 1.5em", borderBottom: `thick double ${theme.palette.secondary.main}` }}
          >
            <Toolbar>
              <Typography variant="h4" sx={{ color: theme.palette.info.main, padding: "1em" }}>
                SmartArt
              </Typography>
              {userId &&
                <Typography
                  className={montserrat.className}
                  sx={{
                    color: theme.palette.info.main,
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                    padding: "1em",
                    // marginLeft: "80em",
                  }}
                >
                  Welcome, {user.name}!
                </Typography>
              }
              {userId &&
                <NextLink
                  sx={{
                    color: theme.palette.info.main,
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                    padding: "1em",
                    marginLeft: "1em",
                  }}
                  href={{
                    pathname: "/api/auth/logout",
                  }}
                  passHref
                  overlay="true"
                  underline="none"
                  onClick={clearSession}
                >
                  Logout
                </NextLink>}
              {!userId &&
                <NextLink
                  href={{
                    pathname: "/api/auth/login",
                  }}
                  passHref
                  overlay="true"
                  underline="none"
                  sx={{
                    color: theme.palette.info.main,
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                    padding: "1em",
                    // marginLeft: "90em",
                  }}
                >
                  Sign In
                </NextLink>}
              <NextLink
                href={{
                  pathname: "/wishlist",
                }}
                passHref
                overlay="true"
                underline="none"
                sx={{ color: theme.palette.info.main, marginLeft: "1em" }}
              >
                <FavoriteBorderIcon />
              </NextLink>
              <NextLink
                href={{
                  pathname: "/cart",
                }}
                passHref
                overlay="true"
                underline="none"
                sx={{ color: theme.palette.info.main, marginLeft: "1em" }}
              >
                <ShoppingCartCheckoutIcon />
              </NextLink>
            </Toolbar>
          </AppBar>
        </Stack>
        <Stack>
          <AppBar
            position="static"
            className={montserrat.className}
            sx={{ padding: "0 1.5em" }}
          >
            <Toolbar>
              <NextLink
                href={{
                  pathname: "/products",
                }}
                passHref
                overlay="true"
                sx={{
                  color: theme.palette.info.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' },
                  padding: "1em",
                  paddingLeft: "2em"
                }}
                onClick={clearSession}
              >
                Art
              </NextLink>
              <NextLink
                href={{
                  pathname: "/sculptures",
                }}
                passHref
                overlay="true"
                sx={{ color: theme.palette.info.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' }, padding: "1em" }}
                onClick={clearSession}
              >
                Sculptures
              </NextLink>
              <NextLink
                href={{
                  pathname: "/photography",
                }}
                passHref
                overlay="true"
                sx={{ color: theme.palette.info.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' }, padding: "1em" }}
                onClick={clearSession}
              >
                Photography
              </NextLink>
              <NextLink
                href={{
                  pathname: "/watercolour",
                }}
                passHref
                overlay="true"
                underline="none"
                sx={{ color: theme.palette.info.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' }, padding: "1em" }}
                onClick={clearSession}
              >
                Watercolour
              </NextLink>
              <NextLink
                href={{
                  pathname: "/promotions",
                }}
                passHref
                overlay="true"
                underline="none"
                sx={{ color: theme.palette.info.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' }, padding: "1em" }}
                onClick={clearSession}
              >
                Promotions
              </NextLink>
              <NextLink
                href={{
                  pathname: "/about",
                }}
                passHref
                overlay="true"
                underline="none"
                sx={{ color: theme.palette.info.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' }, padding: "1em" }}
                onClick={clearSession}
              >
                About
              </NextLink>
              <Search>
                <TextField
                  placeholder="Search…"
                  sx={{ backgroundColor: theme.palette.primary.light, color: theme.palette.primary.main, 
                    // marginLeft: "80em" 
                  }}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Search>
            </Toolbar>
          </AppBar>
        </Stack>
      </Box>
    </ThemeProvider >
  );

};