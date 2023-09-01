import React, { useRef } from 'react';
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
    <div>
      <h1>Contact Us</h1>
      <form ref={form} onSubmit={sendEmail}>
        <input type="text" name="from_name" placeholder="Name" required="required" />
        <input type="email" name="from_email" placeholder="Email" required="required" /><br />
        <input type="text" name="subject" placeholder="Subject" required="required" /><br />
        <textarea name="message" placeholder="Message" required="required" rows="4" /><br />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default ContactUs;