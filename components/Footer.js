import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from 'next/link';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
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
        sx={{ width: '100%', zIndex: 1000 }}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }}>
          <AppBar
            position="static"
            sx={{ padding: '1em' }}
          >
            <Toolbar
              sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '1em', paddingTop: '2em' }}
            >
              <NextLink href="/">
                <img
                  src="../uploads/smartartlogo.png"
                  style={{ height: '3em' }}
                  alt="SmartArt Logo"
                />
              </NextLink>
            </Toolbar>
            <Toolbar sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '1em' }}>
              <div className="p-3">
                <Link href="/about">
                  <h3 className="font-bold">About</h3>
                </Link>
              </div>
              <div className="p-3">
                <Link href="/admin">
                  <h3 className="font-bold">Admin</h3>
                </Link>
              </div>
              <div className="p-3">
                <Link href="/contact">
                  <h3 className="font-bold">Contact</h3>
                </Link>
              </div>
            </Toolbar>
            <Typography
              sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '1em' }}
            >
              2023 All Rights Reserved SmartArt
            </Typography>
            <Toolbar sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '1em' }}>
              <Link href="https://www.linkedin.com/in/anastasia-zaika/" target="_blank" rel="noopener noreferrer">
                <LinkedInIcon className="footer-icon" fontSize="large" sx={{ margin: '0.5em' }} />
              </Link>
              <Link href="https://github.com/anaProdigy/SmartArt" target="_blank" rel="noopener noreferrer">
                <GitHubIcon className="footer-icon" fontSize="large" sx={{ margin: '0.5em' }} />
              </Link>
              <Link href="https://github.com/anaProdigy" target="_blank" rel="noopener noreferrer">
                <GitHubIcon className="footer-icon" fontSize="large" sx={{ margin: '0.5em' }} />
              </Link>
            </Toolbar>
          </AppBar>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
