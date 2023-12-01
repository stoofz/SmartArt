import React from 'react';
import Layout from '@/components/Layout';
import { useSpring, animated } from 'react-spring';



const AboutPage = () => {
  
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 } });
  return (
    // <Layout>
      <div className="container mx-auto mt-16 text-center px-6">
        <animated.h1 className="text-3xl md:text-5xl font-bold mb-8 text-primary" style={fadeIn}>
          Welcome to SmartArt E-commerce!
        </animated.h1>
        <p className="text-lg mb-10 text-gray-600">
          Elevate your shopping experience with SmartArt — where innovation meets aesthetics. We're not just an online store; we're creators of a seamless, secure, and visually enchanting retail journey.
        </p>

        <h2 className="text-2xl md:4xl font-bold mb-6 text-primary">What Sets Us Apart</h2>
        <p className="text-lg mb-10 text-gray-600">
          <strong>Visual Excellence:</strong> Explore a gallery-like shopping experience, where each product is a masterpiece.
          <br />
          <strong>Seamless Shopping:</strong> We ensure your security with integrated authentication and Stripe payment solutions.
          <br />
          <strong>Features for Everyone:</strong> SmartArt offers a full suite of features for shoppers and store owners alike.
        </p>

        <h2 className="text-2xl md:4xl font-bold mb-6 text-primary">Our Contribution</h2>
        <p className="text-lg mb-10 text-gray-600">
          We've poured expertise into the cart, wishlist, orders, and reviews functionalities. It's not just about tasks; it's about creating a delightful and functional platform.
        </p>

        <h2 className="text-2xl md:4xl font-bold mb-6 text-primary">Join Our Journey</h2>
        <p className="text-lg mb-10 text-gray-600">
          SmartArt is more than a store; it's a community. Join us in reimagining eCommerce. Your satisfaction is our motivation, and your joy is our success.
        </p>

        <p className="text-xl text-gray-700 pb-14 md:pb-24">Thank you for choosing SmartArt!</p>
      </div>
    // </Layout>
  );
};

export default AboutPage;