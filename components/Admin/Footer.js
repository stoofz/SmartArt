import { createTheme, ThemeProvider } from '@mui/material/styles';

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
    
            </div>
            </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
