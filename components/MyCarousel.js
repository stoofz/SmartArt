import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Montserrat } from 'next/font/google';
import { autoPlay } from 'react-swipeable-views-utils';

const montserrat = Montserrat({
  weight: '600',
  subsets: ['latin']
});

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

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

const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath: '/swiper/backdrop.jpg',
  },
  {
    label: 'Bird',
    imgPath: '/swiper/woman.jpg',
  },
  {
    label: 'Bali, Indonesia',
    imgPath: '/swiper/girl.jpg',
  },
  {
    label: 'Goč, Serbia',
    imgPath: '/swiper/boho-art.jpg',
  },
  {
    label: 'Bright Watercolour',
    imgPath: '/swiper/watercolor.jpg',
  },
];

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: '100vw', flexGrow: 1 }}>

        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          interval={5000}
        >
          {images.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="div"
                  sx={{
                    width: '100%',
                    height: ['200px', '300px', '400px', '500px'],
                    display: 'block',
                    maxWidth: '100%',
                    objectFit: 'cover',
                    position: 'relative',
                    opacity: 0.8,
                  }}
                >
                  <img
                    src={step.imgPath}
                    alt={step.label}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  {/* Add text overlay here */}
                  <Typography
                    variant="h4"
                    sx={{
                      position: 'absolute',
                      bottom: '10%', // Adjust the bottom value to position it as desired
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'transperent', // Semi-transparent background
                      color: 'white',
                      padding: '20px',
                      fontSize: ['22px', '34px', '54px', '64px'],
                      fontWeight: 'bold',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                      borderRadius: '10px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Discover Art You Love
                  </Typography>
                </Box>
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>
    </ThemeProvider>
  );
}

export default SwipeableTextMobileStepper;
