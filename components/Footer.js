import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from 'next/link';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Stack from '@mui/material/Stack';
import { Montserrat } from 'next/font/google';
import NextLink from 'next/link';

const montserrat = Montserrat({
  weight: '600',
  subsets: ['latin']
});

export default function Footer() {

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

  return (
    <ThemeProvider theme={theme}>
      <Box
        position="sticky"
        top={0}
        sx={{ width: '100%', zIndex: "1000" }}
      >
        <Stack direction="row">
          <AppBar
            position="static"
            className={montserrat.className}
            sx={{ padding: "0 1.5em" }}
          >
            <Toolbar
              sx={{ display: "flex", justifyContent: "flex-start", paddingTop: "5em", marginBottom: "-3em" }}
            >
              <NextLink href={{
                pathname: "/",
              }}>
                <img
                  src='../uploads/smartartlogo.png'
                  style={{ height: "4em" }}
                />
              </NextLink>
            </Toolbar>
            <Toolbar sx={{ display: "flex", justifyContent: "center", paddingBottom: "2em", marginTop: "-3em" }}>
              <div className="p-3">
                <h3 className="font-bold">Information</h3>
                <ul>
                  <li>About</li>
                  <li>Product</li>
                </ul>
              </div>
              <div className="p-3">
                <h3 className="font-bold">Company</h3>
                <ul>
                  <Link href={`/admin`}>
                    <h3 className="font-bold">Admin</h3>
                  </Link>
                  <Link href={`/contact`}>
                    <h3 className="font-bold">Contact</h3>
                  </Link>
                </ul>
              </div>
              <div className="p-3">
                <ul>
                  <li>Getting Started</li>
                  <li>Pricing</li>
                  <li>Resources</li>
                </ul>
              </div>
            </Toolbar>
            <Typography sx={{ display: "flex", justifyContent: "center", paddingBottom: "1em", paddingRight: "2em" }}>
              2023 All Rights Reserved SmartArt
            </Typography>
            <Toolbar sx={{ display: "flex", justifyContent: "flex-end", marginRight: "5em", paddingBottom: "5em", marginTop: "-8em" }}>
              <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FacebookIcon className="footer-icon" fontSize="large" sx={{ margin: "0.5em" }} />
              </Link>
              <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <InstagramIcon className="footer-icon " fontSize="large" sx={{ margin: "0.5em" }} />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <TwitterIcon className="footer-icon" fontSize="large" sx={{ margin: "0.5em" }} />
              </Link>
            </Toolbar>
          </AppBar>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
