import prisma from 'utils/prisma';
import initStripe from 'stripe';
const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

//naming here on user vs customer vs customers is confusing
const createUser = async(cust) => {
  const user = await prisma.customer.findUnique({
    where: {
      email: cust.email,
    },
  });
  if (!user) {
    try {
      const customer = await stripe.customers.create({
        email: cust.email,
      });
      console.log(customer);
      await prisma.customer.create({
        data: {
          email: cust.email,
          subId: cust.sub,
          firstName: cust.first_name,
          lastName: cust.last_name,
          stripeId: customer.id,
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      await prisma.$disconnect();
    }
  }
};

export { createUser };