// Import the PrismaClient
const { PrismaClient } = require('@prisma/client');

// Instantiate the PrismaClient
const prisma = new PrismaClient();



async function main() {
  try {
 
    // Insert data into the "admins" table
    // await prisma.admin.create({
    //   data: {
    //     email: 'test@test6.com',
    //     subId: '1ffe23f',
    //     firstName: 'tester',
    //     lastName: 'test',
    //   },
    // });

    // Insert data into the "customers" table
   
  
    const customersData = [
      {
        firstName: 'Pete',
        lastName: 'Mo',
        email: 'mpo@mail.com',
        subId: 'werff34r23f',
      },
      {
        firstName: 'Lyda',
        lastName: 'Feep',
        email: 'feep@mail.com',
        subId: '32141241241',
      },
      {
        firstName: 'Todd',
        lastName: 'Bangaran',
        email: 'tbang@mail.com',
        subId: '4324235',
      },
      {
        firstName: 'George',
        lastName: 'Till',
        email: 'gtill@mail.com',
        subId: '4234235235',
      },
      {
        firstName: 'Tyson',
        lastName: 'Meo',
        email: 'tmeo@mail.com',
        subId: '4234235332',
      },
      // ... (other customer data)
    ];


    const createdCustomers = await prisma.customer.createMany({
      data: customersData,
    });

    const customers = await prisma.customer.findMany();
    // console.log("LINE 63: Customers:", customers);
    // Insert data into the "addresses" table
    await prisma.address.createMany({
      data: [
        {
          customerId:customers[0].id,
          street: '123 Main St',
          city: 'Denver',
          province: 'CO',
          country: 'USA',
          postal: '80202',
          phone: '111341789302',
          billing: true,
        },
        {
          customerId: customers[1].id,
          street: '325 Cycle St',
          city: 'Toronto',
          province: 'ON',
          country: 'CANADA',
          postal: 'M1S3X1',
          phone: '133341789302',
          billing: true,
        },
        {
          customerId: customers[2].id,
          street: '12 Too Ct',
          city: 'New York',
          province: 'NY',
          country: 'USA',
          postal: '10111',
          phone: '131341789302',
          billing: true,
        },
        {
          customerId: customers[3].id,
          street: '2882 Triple Ct',
          city: 'Tampa',
          province: 'FL',
          country: 'USA',
          postal: '22222',
          phone: '136341789302',
          billing: false,
        },
       
        {
          customerId: customers[4].id,
          street: '3567 Dice St',
          city: 'Vancouver',
          province: 'BC',
          country: 'CANADA',
          postal: 'B1N1L6',
          phone: '133343789302',
          billing: true,
        },
      ],
    });

    // Insert data into the "categories" table
    



    const categoriesData = [
      { name: 'Mobility Scooters' },
      { name: 'Personal Care' },
      { name: 'Electronics' },
     
    ];

    
    const createdCategories = await prisma.category.createMany({
      data: categoriesData,
    });

    const categories = await prisma.category.findMany();
    // console.log("LINE 63: categories:", categories);
    // Insert data into the "products" table
    await prisma.product.createMany({
      data: [
        {
          categoryId: categories[0].id,
          name: 'ViveHealth 3 Wheel Mobility Scooter',
          price: 1849.0,
          stock: 10,
          image: 'Red_3wheel_Basket.PNG',
          description: 'Top Speed: 3.70 mph',
        },
        {
          categoryId: categories[0].id,
          name: 'Drive S38601 Bobcat 3 Wheel Scooter',
          price: 1113.69,
          stock: 6,
          image: 'Drive_S38601_3wheel.PNG',
          description:
            'The Bobcat 3 Wheel Compact Scooter by Drive Medical is ideal for indoor and outdoor use and is lightweight and easy to operate. It has a 32.2" turning radius, with a top speed of 4 mph and a cruising range of 7.5 miles. It comes in a convenient, compact 4 piece design allows for easy tool free assembly and disassembly. The comfortable, height adjustable seat comes with flip back adjustable arms and anti-tipples to ensure users comfort and safety. The large carry basket provides a safe storage space for personal items and the tiller folds down for easy storage. If you are looking for added product protection, purchase the additional warranty coverage by adding Drive Medicals Piece of Mind protection to your scooter.',
        },
        {
          categoryId: categories[0].id,
          name: 'Medline Adult Toothbrush 30 Tuft',
          price: 13.53,
          stock: 200,
          image: 'MDS136000.PNG',
          description: 'Medline Adult Toothbrush 30 Tuft',
        },
        {
          categoryId: categories[0].id,
          name: 'DenTips Oral Swabsticks 6"',
          price: 70.91,
          stock: 100,
          image: 'MDS096202.PNG',
          description: 'DENTIP ORAL SWAB UNTREATED 6" INDIV WRAP',
        },
        {
          categoryId: categories[0].id,
          name: 'ENERGIZER L675ZA-8ZM RAYOVAC HEARING AID BATTERIES #675 PK/8',
          price: 15.99,
          stock: 130,
          image: 'RAYOVAC_L675ZA-8ZM_BATTERY_675__87636.PNG',
          description:
            'Hearing Aid Battery L675ZA-8ZM is a popular battery for behind-the-ear hearing aids. All manufacturers color code this battery blue for easy identification. However this should not be confused with the high power ZA675P cochlear implant batteries that are also colour coded blue.',
        },
        {
          categoryId: categories[0].id,
          name: 'Revamp Progloss Perfect Blow Dryer Volume & Shine Brush',
          price: 239.99,
          stock: 440,
          image: 'dr-2000product1__11588__30040__83552.PNG',
          description:
            'Powerful drying and styling combined into one simple hair tool. The Revamp Progloss Perfect Blow Dry Volume and Shine Air Styler dries, detangles, smooths and styles your hair in just one pass. The oval ceramic barrel of the brush works to smooth and style hair, whilst the rounded edges add volume at the root, to help you create a salon-quality blow-dry at home. To ensure frizz-free styling, this multifunctional styler features 4 ionic jet emitters and a ceramic barrel. Customize your styling experience with 3 Heat/Speed Settings, including a cool option to set your hairstyles in place. The lightweight design and 9 foot salon swivel cable allow for quick and easy styling, with additional flexibility. Infused with Progloss super smooth oils for enhanced shine.',
        },
      ],
    });

    // Insert data into the "carts" table
    await prisma.cart.createMany({
      data: [{ customerId: customers[0].id }, { customerId: customers[1].id }, { customerId: customers[2].id }],
    });

    // Hold "payments" table data in array
    const paymentsData = [
      {
        customerId: customers[0].id,
        date: new Date('2023-01-10T15:10:00Z'), 
        totalPrice: '423.94', 
        stripeChargeId: 'aegrds2323',
      },
      {
        customerId: customers[1].id,
        date: new Date('2023-03-11T13:10:00Z'),
        totalPrice: '23.9',
        stripeChargeId: 'agrds2323',
      },
      {
        customerId: customers[2].id,
        date: new Date('2023-04-01T01:11:00Z'),
        totalPrice: '311.24',
        stripeChargeId: 'ads23htr23',
      },
      {
        customerId: customers[2].id,
        date: new Date('2023-05-21T12:11:00Z'),
        totalPrice: '13.47',
        stripeChargeId: 'ahgfds2323',
      },
      {
        customerId: customers[4].id,
        date: new Date('2023-08-23T04:13:00Z'),
        totalPrice: '76.12',
        stripeChargeId: 'ad564s2323',
      },
    ];

    // Insert data into the "payments" table

    const createdPayments = await prisma.payment.createMany({
      data: paymentsData,
    });

    const payments = await prisma.payment.findMany();

    

// Hold "orders" table data in array
    const ordersData = [
      { 
        customerId: customers[1].id,
        paymentId: payments[0].id,
        orderDate: new Date('2023-01-10T15:10:00Z'), 
        totalPrice: '423.94',
       },
      { 
        customerId: customers[1].id,
        paymentId: payments[1].id,
        orderDate: new Date('2023-03-11T13:10:00Z'),
        totalPrice: '23.9',
       },
      { 
        customerId: customers[2].id,
        paymentId: payments[2].id,
        orderDate: new Date('2023-04-01T01:10:00Z'),
        totalPrice: '311.24',
       },
      { 
        customerId: customers[3].id,
        paymentId: payments[3].id,
        orderDate: new Date('2023-05-21T12:10:00Z'),
        totalPrice: '13.47',
      },
      { 
        customerId: customers[4].id,
        paymentId: payments[4].id,
        orderDate: new Date('2023-08-23T04:10:00Z'),
        totalPrice: '76.12',
      },
    ]


    // Insert data into the "orders" table
    const createdOrders = await prisma.order.createMany({
      data: ordersData,
    });
   
    const orders = await prisma.order.findMany();

    // Insert data into the "order_items" table
    // await prisma.orderItem.createMany({
    //   data: [
    //     { orderId: 1, productId: 1, qty: 1, price: 423.94 },
    //     { orderId: 2, productId: 3, qty: 2, price: 11.95 },
    //     { orderId: 3, productId: 2, qty: 1, price: 311.24 },
    //     { orderId: 4, productId: 1, qty: 1, price: 13.47 },
    //     { orderId: 5, productId: 4, qty: 1, price: 76.12 },
    //   ],
    // });

    // Insert data into the "wishlists" table
    // await prisma.wishlist.createMany({
    //   data: [{ customerId: 1, productId: 2 }, { customerId: 3, productId: 3 }, { customerId: 4, productId: 1 }],
    // });

    // // Insert data into the "feedback" table
    // await prisma.feedback.createMany({
    //   data: [
    //     { customerId: 1, productId: 1, rating: 5, comment: 'This is a great product!' },
    //     { customerId: 2, productId: 2, rating: 3, comment: 'This is a decent item!' },
    //     { customerId: 5, productId: 4, rating: 5, comment: 'This is a great product!' },
    //     { customerId: 3, productId: 2, rating: 1, comment: 'This is a terrible product!' },
    //   ],
    // });

    // // Insert data into the "discounts" table
    // await prisma.discount.createMany({
    //   data: [
    //     { productId: 2, discount: 10, startDate: '2023-08-01', endDate: '2023-09-30', description: '10% off in August - September' },
    //     { productId: 1, discount: 20, startDate: '2023-08-01', endDate: '2023-09-30', description: '20% off in August - September' },
    //     { productId: 4, discount: 40, startDate: '2023-08-01', endDate: '2023-09-30', description: '40% off in August - September' },
    //   ],
    // });

    // // Insert data into the "cart_items" table
    // await prisma.cartItem.createMany({
    //   data: [
    //     { cartId: 1, productId: 1, qty: 5 },
    //     { cartId: 1, productId: 2, qty: 2 },
    //     { cartId: 1, productId: 3, qty: 3 },
    //     { cartId: 1, productId: 4, qty: 1 },
    //     { cartId: 2, productId: 1, qty: 2 },
    //     { cartId: 3, productId: 2, qty: 1 },
    //     { cartId: 4, productId: 2, qty: 4 },
    //     { cartId: 4, productId: 3, qty: 1 },
    //     { cartId: 5, productId: 3, qty: 3 },
    //   ],
    // });

    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();