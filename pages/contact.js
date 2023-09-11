import React, { useRef, useState } from 'react';
import Link from 'next/link';
// import { TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Button, TextField, Typography, Container, Grid, Paper } from '@mui/material';
import Layout from '../components/Layout';
import emailjs from '@emailjs/browser';




const ContactUs = () => {
  const [isEmailSent, setEmailSent] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_obnskbd', 'template_bjrlix2', form.current, 'p3p1b53q_-yed7X7l')
      .then((result) => {
          console.log(result.text);
          // clear form on submit
          e.target.reset();
        setEmailSent(true);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <Layout>
    <Container maxWidth="md" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }} >
      <Paper elevation={6} style={{ padding: '16px' }}>

        {isEmailSent ? (
          <div>
            <Typography variant="h4" gutterBottom>
              Thank you for sending your email!
            </Typography>
            <Typography variant="body1">
              We'll get back to you as soon as possible.
            </Typography>
            <Link href={`/products/`}>
              <Button size="small"
                variant="contained"
                style={{
                  backgroundColor: 'lightblue', color: 'white', transition: 'background-color 0.3s',
                  '&:hover': {
                    backgroundColor: 'blue',
                  },
                }}
              >
                Continue shopping
              </Button>
            </Link>
          </div>
        ) : (
            <div>
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
        </div>
        )}
      </Paper>
    </Container>
   
    </Layout>
  );
};

export default ContactUs;