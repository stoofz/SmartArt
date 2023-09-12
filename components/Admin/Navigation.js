import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import { useSessionId } from 'utils/session';
import { clearSession } from 'utils/session';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import NextLink from 'next/link';
import { Montserrat } from 'next/font/google';

import Stack from '@mui/material/Stack';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useUser } from '@auth0/nextjs-auth0/client';

const montserrat = Montserrat({
  weight: '600',
  subsets: ['latin']
});


export default function Navigation() {



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

  const userId = useSessionId();

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
              <NextLink href={{ pathname: "/", }}>
              <Typography variant="h4" sx={{ color: theme.palette.info.main, padding: "1em" }}>
                SmartArt
              </Typography>
              </NextLink>
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

            </Toolbar>
          </AppBar>
        </Stack>

        <Stack>
          <AppBar
            position="static"
            className={montserrat.className}
            sx={{ padding: "0 1.5em" }}
          >
          </AppBar>
        </Stack>
        
      </Box>
    </ThemeProvider >
  );

};