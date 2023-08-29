import prisma from 'utils/prisma';

const createUser = async (user) => {

  const customer = await prisma.customer.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!customer) {
    await prisma.customer.create({
      data: {
        email: user.email,
        subId: user.sub,
        firstName: user.first_name,
        lastName: user.last_name,
      },
    });
  }
  await prisma.$disconnect();
  return customer;
}

export { createUser };