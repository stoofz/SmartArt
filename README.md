# SmartArt E-commerce Application

SmartArt is your all-in-one eCommerce engine, offering a seamless shopping experience. With secure authentication and Stripe payment integration, it provides a full range of features for both shoppers and store owners, making it the ideal platform for your online store needs.

This project was born in a team of four from the desire to create a visually stunning online store while pushing the boundaries of functionality. 

I focused on and contributed to specific project components, including cart, wishlist, orders and reviews, while also providing support and contributions to other areas of the project.


## Final Product
![website demonstration](./docs/sma1.png)


## Tech Stack
- [Next.js](https://nextjs.org/) Framework: The backbone of SmartArt, providing a robust foundation for the eCommerce platform.
- [Prisma.io](https://www.prisma.io/docs) and [PostgreSQL](https://www.postgresql.org/) : Leveraged Prisma.io with a PostgreSQL database on the server-side to handle data storage and management effectively.
-[Auth0](https://auth0.com/) Authentication: Integrated the Auth0 Authentication Platform to ensure secure login, registration, and password storage.
- [Stripe API](https://stripe.com/): Seamlessly integrated the Stripe API for checkout and payment processing, guaranteeing a smooth shopping experience.
-[Material UI](https://mui.com/material-ui/)  and [Tailwind CSS](https://tailwindcss.com/) : Crafted the front-end design using the Material UI React component library and Tailwind CSS for a visually appealing and responsive user interface.

## Features

### Logged Out User:
- Landing Page: An engaging carousel that highlights featured products and a selection of products. 
- Categories: Easy navigation through product categories for efficient browsing.
- Search: Users can search for specific products or items of interest.
Product Page: Users can view detailed product information by clicking product name or expand the popup.
- Contact: A convenient option to reach out for inquiries or support.
- Users receive prompts to log in when they interact with the profile, cart, wishlist, or review features.



### Logged In User:
- Profile: Users can view their information, cart, order history, and wishlist.
- Wishlist: Users can manage their wishlist by adding items with the heart icon and deleting items either by clicking the heart icon again or directly from the wishlist page and these actions will be reflected on all pages.
- Cart: Users can access their cart from the navigation menu or profile, allowing them to add or remove items.
- Checkout: After a successful payment, users receive a confirmation message. They can then proceed to view their order, which will display their cart as empty.
- Product Page Interaction: On the product page, logged-in users can leave reviews and provide ratings. They can observe how the product's rating changes as other users contribute reviews. Users can delete their own reviews, emphasizing that logged-in users have control only over their reviews.

### Admin:
- Category Management: Create and delete product categories.
- Product Management: Create and delete products.
- Discount Control: Create and delete discounts for products.
- Order Oversight: View and manage orders.
- Dashboard: Access a comprehensive dashboard for insights and overview.


## Setup

Please, feel free to contact me if you would like to discus how to setup the project: <https://www.linkedin.com/in/anastasia-zaika/>



## Stripe Testing

Use Credit Card # 4111 1111 1111 1111, any valid expiry date(e.g. 06/33), any CVC code(e.g. 123) for testing success scenarios. 

More information in their docs: <https://stripe.com/docs/testing#cards>
