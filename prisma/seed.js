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

// CUSTOMERS
    //Hold "customers" table data in array
    // const customersData = [
    //   {
    //     firstName: 'Pete',
    //     lastName: 'Mo',
    //     email: 'mpo@mail.com',
    //     subId: 'werff34r23f',
    //   },
    //   {
    //     firstName: 'Lyda',
    //     lastName: 'Feep',
    //     email: 'feep@mail.com',
    //     subId: '32141241241',
    //   },
    //   {
    //     firstName: 'Todd',
    //     lastName: 'Bangaran',
    //     email: 'tbang@mail.com',
    //     subId: '4324235',
    //   },
    //   {
    //     firstName: 'George',
    //     lastName: 'Till',
    //     email: 'gtill@mail.com',
    //     subId: '4234235235',
    //   },
    //   {
    //     firstName: 'Tyson',
    //     lastName: 'Meo',
    //     email: 'tmeo@mail.com',
    //     subId: '4234235332',
    //   }
    // ];

    //  //Insert data into the "customers" table
    // const createdCustomers = await prisma.customer.createMany({
    //   data: customersData,
    // });
    //Get and store in var newly created customers to extract id dinamically
    const customers = await prisma.customer.findMany();
    // console.log("LINE 63: Customers:", customers);


//ADDRESSES
    //Hold "customers" table data in array
    const addressesData = [
      {
        customerId: customers[0].id,
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
    ]
    // Insert data into the "addresses" table
    const createdAddresses = await prisma.address.createMany({
      data: addressesData,
    });

    //Get and store in var newly created addresses to extract id dinamically
    const addresses = await prisma.category.findMany();


//CATEGORIES
     //Hold "categories" table data in array
    const categoriesData = [
      { name: 'Mobility Scooters' },
      { name: 'Personal Care' },
      { name: 'Electronics' },
     
    ];
    //Insert data into the "categories" table
    const createdCategories = await prisma.category.createMany({
      data: categoriesData,
    });
    //Get and store in var newly created categories to extract id dinamically
    const categories = await prisma.category.findMany();
    // console.log("LINE 63: categories:", categories);


//PRODUCTS
    //Hold "products" table data in array
    const productsData = [
      {
        categoryId: categories[0].id,
        name: 'ViveHealth 3 Wheel Mobility Scooter',
        price: 18490,
        stock: 10,
        image: 'Red_3wheel_Basket.PNG',
        description: 'Top Speed: 3.70 mph',
      },
      {
        categoryId: categories[0].id,
        name: 'Drive S38601 Bobcat 3 Wheel Scooter',
        price: 111369,
        stock: 6,
        image: 'Drive_S38601_3wheel.PNG',
        description:
          'The Bobcat 3 Wheel Compact Scooter by Drive Medical is ideal for indoor and outdoor use and is lightweight and easy to operate. It has a 32.2" turning radius, with a top speed of 4 mph and a cruising range of 7.5 miles. It comes in a convenient, compact 4 piece design allows for easy tool free assembly and disassembly. The comfortable, height adjustable seat comes with flip back adjustable arms and anti-tipples to ensure users comfort and safety. The large carry basket provides a safe storage space for personal items and the tiller folds down for easy storage. If you are looking for added product protection, purchase the additional warranty coverage by adding Drive Medicals Piece of Mind protection to your scooter.',
      },
      {
        categoryId: categories[0].id,
        name: 'Medline Adult Toothbrush 30 Tuft',
        price: 1353,
        stock: 200,
        image: 'MDS136000.PNG',
        description: 'Medline Adult Toothbrush 30 Tuft',
      },
      {
        categoryId: categories[0].id,
        name: 'DenTips Oral Swabsticks 6"',
        price: 7091,
        stock: 100,
        image: 'MDS096202.PNG',
        description: 'DENTIP ORAL SWAB UNTREATED 6" INDIV WRAP',
      },
      {
        categoryId: categories[0].id,
        name: 'ENERGIZER L675ZA-8ZM RAYOVAC HEARING AID BATTERIES #675 PK/8',
        price: 1599,
        stock: 130,
        image: 'RAYOVAC_L675ZA-8ZM_BATTERY_675__87636.PNG',
        description:
          'Hearing Aid Battery L675ZA-8ZM is a popular battery for behind-the-ear hearing aids. All manufacturers color code this battery blue for easy identification. However this should not be confused with the high power ZA675P cochlear implant batteries that are also colour coded blue.',
      },
      {
        categoryId: categories[0].id,
        name: 'Revamp Progloss Perfect Blow Dryer Volume & Shine Brush',
        price: 23999,
        stock: 440,
        image: 'dr-2000product1__11588__30040__83552.PNG',
        description:
          'Powerful drying and styling combined into one simple hair tool. The Revamp Progloss Perfect Blow Dry Volume and Shine Air Styler dries, detangles, smooths and styles your hair in just one pass. The oval ceramic barrel of the brush works to smooth and style hair, whilst the rounded edges add volume at the root, to help you create a salon-quality blow-dry at home. To ensure frizz-free styling, this multifunctional styler features 4 ionic jet emitters and a ceramic barrel. Customize your styling experience with 3 Heat/Speed Settings, including a cool option to set your hairstyles in place. The lightweight design and 9 foot salon swivel cable allow for quick and easy styling, with additional flexibility. Infused with Progloss super smooth oils for enhanced shine.',
      },
    ];
    //Insert data into the "products" table
    const createdProducts = await prisma.product.createMany({
      data: productsData,
    });
    //get and store in var newly created products to extract id dinamically
    const products = await prisma.product.findMany();
  

//CARTS
    //Hold "carts" table data in array
    const cartsData = [
      { customerId: customers[0].id },
      { customerId: customers[1].id },
      { customerId: customers[2].id }
    ]

    //Insert data into the "carts" table
    const createdCarts = await prisma.cart.createMany({
      data: cartsData,
    });
    //get and store in var newly created carts to extract id dinamically
    const carts = await prisma.cart.findMany();


//CART ITEM
    //  Insert data into the "cart_items" table directly
    await prisma.cartItem.createMany({
      data: [
        { 
          cartId: carts[0].id,
          productId: products[0].id,
          qty: 2 
        },
        { 
          cartId: carts[0].id,
          productId: products[1].id,
          qty: 2 
        },
        { 
          cartId: carts[0].id,
          productId: products[2].id,
          qty: 3 
        },
        { 
          cartId: carts[0].id,
          productId: products[3].id,
          qty: 1 
        },
        { 
          cartId: carts[1].id,
          productId: products[0].id,
          qty: 2 
        },
        { 
          cartId: carts[2].id,
          productId: products[1].id,
          qty: 1 
        },
        { 
          cartId: carts[3].id,
          productId: products[1].id,
          qty: 4 
        },
        { 
          cartId: carts[3].id,
          productId: products[2].id,
          qty: 1 
        }, 
      ],
    });
   
   

//PAYMENTS
    // Hold "payments" table data in array
    const paymentsData = [
      {
        customerId: customers[0].id,
        date: new Date('2023-01-10T15:10:00Z'), 
        totalPrice: 42394, 
        stripeChargeId: 'aegrds2323',
      },
      {
        customerId: customers[1].id,
        date: new Date('2023-03-11T13:10:00Z'),
        totalPrice: 239,
        stripeChargeId: 'agrds2323',
      },
      {
        customerId: customers[2].id,
        date: new Date('2023-04-01T01:11:00Z'),
        totalPrice: 31124,
        stripeChargeId: 'ads23htr23',
      },
      {
        customerId: customers[2].id,
        date: new Date('2023-05-21T12:11:00Z'),
        totalPrice: 1347,
        stripeChargeId: 'ahgfds2323',
      },
      {
        customerId: customers[4].id,
        date: new Date('2023-08-23T04:13:00Z'),
        totalPrice: 7612,
        stripeChargeId: 'ad564s2323',
      },
    ];

    // Insert data into the "payments" table
    const createdPayments = await prisma.payment.createMany({
      data: paymentsData,
    });

    const payments = await prisma.payment.findMany();

    
//ORDERS
     // Hold "orders" table data in array
    const ordersData = [
      { 
        customerId: customers[1].id,
        paymentId: payments[0].id,
        orderDate: new Date('2023-01-10T15:10:00Z'), 
        totalPrice: 42394,
       },
      { 
        customerId: customers[1].id,
        paymentId: payments[1].id,
        orderDate: new Date('2023-03-11T13:10:00Z'),
        totalPrice: 239,
       },
      { 
        customerId: customers[2].id,
        paymentId: payments[2].id,
        orderDate: new Date('2023-04-01T01:10:00Z'),
        totalPrice: 31124,
       },
      { 
        customerId: customers[3].id,
        paymentId: payments[3].id,
        orderDate: new Date('2023-05-21T12:10:00Z'),
        totalPrice: 1347,
      },
      { 
        customerId: customers[4].id,
        paymentId: payments[4].id,
        orderDate: new Date('2023-08-23T04:10:00Z'),
        totalPrice: 7612,
      },
    ]

    // Insert data into the "orders" table
    const createdOrders = await prisma.order.createMany({
      data: ordersData,
    });
   
    //Find created orders to get ids dinamically from them
    const orders = await prisma.order.findMany();


//OREDER ITEMS
    // Insert data into the "order_items" table directly
    await prisma.orderItem.createMany({
      data: [
        { 
          orderId: orders[0].id,
          productId: products[0].id,
          qty: 1,
          price: 42394
        },
        { 
          orderId: orders[1].id,
          productId: products[2].id,
          qty: 2,
          price: 1195 
        },
        { 
          orderId: orders[2].id,
          productId: products[3].id,
          qty: 1,
          price: 31124
        },
        { 
          orderId: orders[3].id,
          productId: products[0].id,
          qty: 1,
          price: 1347
        },
        { 
          orderId: orders[4].id,
          productId: products[3].id,
          qty: 1,
          price: 7612
        },
      ],
    });


//WISHLISTS
    // Hold "orders" table data in array
    const wishlistsData = [
      { 
        customerId: customers[0].id,
        productId: products[1].id, 
      },
      {
        customerId: customers[2].id,
        productId: products[2].id,
      }, 
      { 
        customerId: customers[3].id,
        productId: products[0].id,
      }
    ]

    // Insert data into the "wishlists" table
    const createdWishlists = await prisma.wishlist.createMany({
      data: wishlistsData,
    });

    //?Find created wishlists to get ids dinamically from them
    const wishlists = await prisma.order.findMany();
    

//FEEDBACKS
    // Insert data into the "feedback" table directly
    await prisma.feedback.createMany({
      data: [
        { 
          customerId: customers[0].id,
          productId: products[0].id,
          rating: 5,
          comment: 'This is a great product!' 
        },
        { 
          customerId: customers[2].id,
          productId: products[1].id,
          rating: 3,
          comment: 'This is a decent item!' 
        },
        { 
          customerId: customers[2].id,
          productId: products[3].id,
          rating: 5,
          comment: 'This is a great product!' 
        },
        { 
          customerId: customers[2].id,
          productId: products[1].id,
          rating: 1,
          comment: 'This is a terrible product!' 
        },
      ],
    });

//DISCOUNTS
    // Insert data into the "discounts" table directly
    await prisma.discount.createMany({
      data: [
        { 
          productId: products[1].id,
          discount: 10,
          startDate: new Date('2023-08-01'),
          endDate: new Date('2023-09-30'),
          description: '10% off in August - September'
        },
        { 
          productId: products[0].id,
          discount: 20,
          startDate: new Date('2023-08-01'),
          endDate: new Date('2023-09-30'),
          description: '20% off in August - September' 
        },
        { 
          productId: products[3].id,
          discount: 40,
          startDate: new Date('2023-08-01'),
          endDate: new Date('2023-09-30'),
          description: '40% off in August - September' 
        },
      ],
    });


    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();