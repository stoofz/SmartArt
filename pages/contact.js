import React, { useRef } from 'react';
// import { TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Button, TextField, Typography, Container, Grid, Paper } from '@mui/material';

import emailjs from '@emailjs/browser';




const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_obnskbd', 'template_bjrlix2', form.current, 'p3p1b53q_-yed7X7l')
      .then((result) => {
          console.log(result.text);
          // clear form on submit
          e.target.reset();
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={6} style={{ padding: '16px' }}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <form ref={form} onSubmit={sendEmail}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                size="small"
                type="text"
                name="from_name"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                size="small"
                type="email"
                name="from_email"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject"
                variant="outlined"
                size="small"
                type="text"
                name="subject"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                size="small"
                multiline
                rows={4}
                name="message"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                style={{
                  backgroundColor: 'lightpink',
                  color: 'white',
                  transition: 'background-color 0.3s',
                  '&:hover': {
                    backgroundColor: 'darkgray',
                  },
                }}
               
              >
                Send
              </Button>

             
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
   
    // <div>
    //   <form ref={form} onSubmit={sendEmail}>
    //     <h1>Contact Us</h1>
    //     <br />
    //     <div>
    //       <TextField id="outlined-basic" label="Name" variant="outlined" size="small" type="text" name="from_name" required="required" />
    //       <TextField id="outlined-basic" label="Email" variant="outlined" size="small" type="email" name="from_email" required="required" />
    //     </div>
    //     <TextField id="outlined-basic" label="Subject" variant="outlined" size="small" type="text" name="subject" required="required" />
    //     <br />
    //     <TextField id="outlined-basic" label="Message" variant="outlined" size="small" type="text" name="message" required="required" />
    //     <br />
    //     <Button variant="outlined" endIcon={<SendIcon />} type="submit">Send</Button>
    //   </form>
    // </div>
  );
};

export default ContactUs;