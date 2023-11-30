import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { styled } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  weight: '600',
  subsets: ['latin']
});

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

const ReviewForm = ({ open, onClose, onSubmit, comment, setComment, rating, setRating }) => {

  return (
    <Dialog open={open} onClose={onClose} >
      <DialogTitle sx={{ color: theme.palette.primary.main, width: "600px" }}>Write a Review:</DialogTitle>
      <DialogContent>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <TextareaAutosize
            placeholder="   Write your review here..."
            minRows={3}
            style={{ width: "90%", 
            border: `1px solid ${theme.palette.primary.main}`, 
            borderRadius: "8px", 
            marginTop: "15px",
            fontSize: "0.8em",
              '@media (min-width: 600px)': {
                fontSize: "1.2em", // Adjust the font size for desktop
              },
           }}
            value={comment}
            onChange={(event) => {
              setComment(event.target.value);
            }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{ backgroundColor: theme.palette.secondary.dark, color: theme.palette.info.main, borderColor: 'transparent',
            "&:hover": {
              backgroundColor: theme.palette.primary.main, fontSize: { xs: '12px', md: 'inherit' },
          },
          }}>
          Cancel
        </Button>
        <Button
          onClick={() => onSubmit(rating, comment)}
          sx={{ backgroundColor: theme.palette.primary.dark, color: theme.palette.info.main, borderColor: 'transparent', 
          "&:hover": { backgroundColor: theme.palette.primary.main
          },
          }}>
          Submit Review
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewForm;