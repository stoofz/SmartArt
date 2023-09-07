import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const ReviewForm = ({ open, onClose, onSubmit, comment, setComment, rating, setRating }) => {
 
  



  return (
    <Dialog open={open} onClose={onClose} >
      <DialogTitle>Write a Review:</DialogTitle>
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
            style={{ width: "500px", border: "1px solid lightblue", borderRadius: "8px", marginTop: "15px" }}
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
        style={{ backgroundColor: 'lightblue', color: 'white', borderColor: 'transparent' }}>
          Cancel
        </Button>
        <Button 
          onClick={() => onSubmit(rating, comment)}
        style={{ backgroundColor: 'lightblue', color: 'white', borderColor: 'transparent' }}>
          Submit Review
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewForm;