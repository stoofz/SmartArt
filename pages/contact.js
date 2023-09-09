import React, { useRef } from 'react';
import { TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import emailjs from '@emailjs/browser';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '80vh',
};

const formStyle = {
  width: '100%',
  maxWidth: '400px',
  padding: '16px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'white',
  textAlign: 'center',
};

const textFieldStyle = {
  margin: '8px 0',
};

const buttonStyle = {
  marginTop: '16px',
};

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
    <>
      {/* Needs state for user */}
      {/* <Navigation /> */}
      <main>
        <div style={containerStyle}>
          <form ref={form} onSubmit={sendEmail} style={formStyle}>
            <h1>Contact Us</h1>
            <div>
              <TextField
                style={textFieldStyle}
                label="Name"
                variant="outlined"
                size="small"
                type="text"
                name="from_name"
                required
              />
              <TextField
                style={textFieldStyle}
                label="Email"
                variant="outlined"
                size="small"
                type="email"
                name="from_email"
                required
              />
            </div>
            <TextField
              style={textFieldStyle}
              label="Subject"
              variant="outlined"
              size="small"
              type="text"
              name="subject"
              required
            />
            <TextField
              style={textFieldStyle}
              label="Message"
              variant="outlined"
              size="small"
              type="text"
              name="message"
              multiline
              rows={4}
              required
            />
            <Button
              style={buttonStyle}
              variant="outlined"
              endIcon={<SendIcon />}
              type="submit"
            >
              Send
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </>
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