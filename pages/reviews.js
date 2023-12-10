import React from 'react';
import Link from 'next/link';
import { Button } from "@mui/material";

const UserReviewsPage = () => {
  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-xl md:text-3xl font-bold mb-4">🚧 User Reviews Under Construction 🚧</h1>
      <p className="text-lg mb-8">
        We're working on gathering and showcasing your reviews. Check back soon for updates.
      </p>
      <Link href={`/`}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#1E2E2D',
            color: 'white',
            fontSize: ['1rem', '1.2rem', '1.5rem', '1.5rem'],
            marginBottom: '3rem',
            alignSelf: 'center',
          }}
        >
          Go to the main page
        </Button>
      </Link>
    </div>
  );
};

export default UserReviewsPage;