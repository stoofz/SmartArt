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
import Divider from '@mui/material/Divider';

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
        <Stack>
          <AppBar
            position="static"
            className={montserrat.className}
            sx={{ padding: "5em" }}
          >
            <Toolbar
              sx={{ display: "flex", alignSelf: "flex-start", marginBottom: "-11em" }}
            >
              <NextLink href={{
                pathname: "/",
              }}>
                <img
                  src='../uploads/smartartlogo.png'
                  style={{ height: "4.5em" }}
                />
              </NextLink>
            </Toolbar>
            <Stack sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", paddingTop: "4em" }}>
              <Stack spacing={1.5} sx={{ padding: "1.5em" }}>
                <Link href={'/admin'}>
                  Admin
                </Link>
                <Link href={'/about'}>
                  About Us
                </Link>
                <Link href={'/sale'} passHref>
                  Sale
                </Link>
              </Stack>
              <Stack spacing={1.5} sx={{ padding: "1.5em" }}>
                <Link href={'/terms'}>
                  Terms and Conditions
                </Link>
                <Link href={'/customercare'}>
                  User-Submitted Content
                </Link>
                <Link href={'/privacy'}>
                  Privacy Policy
                </Link>
              </Stack>
              <Stack spacing={1.5} sx={{ padding: "1.5em" }}>
                <Link href={'/contact'}>
                  Contact
                </Link>
                <Link href={'/warranty'}>
                  Warranty
                </Link>
                <Link href={'/faq'}>
                  FAQ
                </Link>
              </Stack>
            </Stack>
            <Typography sx={{ display: "flex", justifyContent: "center", paddingTop: "1em" }}>
              2023 All Rights Reserved SmartArt
            </Typography>
            <Stack
              direction="row"
              spacing={5}
              divider={<Divider orientation="vertical" flexItem sx={{ backgroundColor: theme.palette.secondary.dark, borderRightWidth: 3 }} />}
              sx={{ display: "flex", justifyContent: "flex-end", marginTop: "-8em", marginRight: "4em", padding: "2em" }}>
              <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" passHref>
                <FacebookIcon fontSize="large" />
              </Link>
              <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" passHref>
                <InstagramIcon fontSize="large" />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" passHref>
                <TwitterIcon fontSize="large" />
              </Link>
            </Stack>
          </AppBar>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
