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
      await prisma.customer.create({
        data: {
          email: user.email,
          subId: user.sub,
          firstName: user.first_name,
          lastName: user.last_name,
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