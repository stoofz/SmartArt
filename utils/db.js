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
        sub_id: user.sub,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    });
  }
  await prisma.$disconnect();
  return customer;
}

export { createUser };