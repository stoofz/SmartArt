import { useState, useEffect } from 'react';
import { Slide, Snackbar } from '@mui/material';

const Notification = ({ open, onClose, message }) => {
  const [slide, setSlide] = useState(open);

  useEffect(() => {
    setSlide(open);
  }, [open]);

  return (
    <Snackbar
      open={slide}
      onClose={() => {
        setSlide(false);
        onClose();
      }}
      autoHideDuration={5000}
      TransitionComponent={Slide}
      message={message}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    />
  );
};

export default Notification;