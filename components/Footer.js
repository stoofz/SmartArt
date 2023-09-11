import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from 'next/link';

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
      <div style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.info.main }}>
        <footer style={{ position: "static" }}>
          <div className="flex justify-around p-3">
            <div className="p-3">
              <h1 className="font-bold">Online Store</h1>
              <h3>We sell you items.</h3>
              <div className="flex justify-around">
                <div>
                  <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <FacebookIcon className="footer-icon" fontSize="large" />
                  </Link>
                </div>
                <div>
                  <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <InstagramIcon className="footer-icon " fontSize="large" />
                  </Link>
                </div>
                <div>
                  <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <TwitterIcon className="footer-icon" fontSize="large" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex space-between">
              <div className="p-3">
                <h3 className="font-bold">Information</h3>
                <ul>
                  <li>About</li>
                  <li>Product</li>
                  <li>Blog</li>
                </ul>
              </div>
              <div className="p-3">
                <h3 className="font-bold">Company</h3>
                <ul>
                  <li>Community</li>
                  <li>Career</li>
                  <li>Our Story</li>
                </ul>
              </div>
              <div className="p-3">
                <Link href={`/contact`}>
                  <h3 className="font-bold">Contact</h3>
                </Link>
                <ul>
                  <li>Getting Started</li>
                  <li>Pricing</li>
                  <li>Resources</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex justify-center p-3">
            <h3>2023 all rights reserved Online Store</h3>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
