import { isAdmin } from 'utils/session';
import DeniedAccess from 'components/Admin/Denied';
import Navigation from 'components/Admin/Navigation';
import Footer from 'components/Admin/Footer';
import Sidebar from 'components/Admin/Sidebar';
import DisplayStatBox from 'components/Admin/DisplayStatBox';
import { Grid } from '@mui/material';

import prisma from '@/utils/prisma';

export async function getServerSideProps() {

  const adminDashStats = {};

  const weekAgo = new Date(new Date() - 7 * 60 * 60 * 24 * 1000);
  const dayAgo = new Date(new Date() - 1 * 60 * 60 * 24 * 1000);

  const totalOrders = await prisma.order.count();
  
  const totalOrdersToday = await prisma.order.aggregate({
    _count: {
      id: true,
    },
    where: {
      orderDate: {
        gte: dayAgo,
      },
    },
  });

  const totalOrdersWeek = await prisma.order.aggregate({
    _count: {
      id: true,
    },
    where: {
      orderDate: {
        gte: weekAgo,
      },
    },
  });


  const productsTotal = await prisma.product.count();
  const categoryTotal = await prisma.category.count();
  const customersTotal = await prisma.customer.count();
  
  const totalRevenue = await prisma.order.aggregate({
    _sum: {
      totalPrice: true,
    },
  });

  const totalRevenueToday = await prisma.order.aggregate({
    _sum: {
      totalPrice: true,
    },
    where: {
      orderDate: {
        gte: dayAgo,
      },
    },
  });

  const totalRevenueWeek = await prisma.order.aggregate({
    _sum: {
      totalPrice: true,
    },
    where: {
      orderDate: {
        gte: weekAgo,
      },
    },
  });

  adminDashStats.revenueToday = '$' + parseInt(totalRevenueToday._sum.totalPrice);
  adminDashStats.revenueWeek = '$' + parseInt(totalRevenueWeek._sum.totalPrice);
  adminDashStats.revenue = '$'+ parseInt(totalRevenue._sum.totalPrice);
  adminDashStats.totalOrders = totalOrders;
  adminDashStats.totalOrdersToday = totalOrdersToday._count.id;
  adminDashStats.totalOrdersWeek = totalOrdersWeek._count.id;
  adminDashStats.products = productsTotal;
  adminDashStats.categories = categoryTotal;
  adminDashStats.customers = customersTotal;

  return {
    props: {
      adminDashStats
    },
  };

}

export default function AdminDash({ adminDashStats }) {
 

  if (isAdmin()) {

    return (
      <>
        <Navigation />
          <div className="flex">
            <Sidebar />
            <main className="w-3/4 p-4">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      
            <Grid container
              align="center"
              justify-content="center"
              maxWidth="100%"
              paddingTop="1em"
              paddingLeft="1em"
              paddingRight="1em"
              paddingBottom="1em"
              margin="auto"
              spacing={5}
            >

            
            <DisplayStatBox data={{ stat: adminDashStats.revenue, name: 'Revenue - Total' }} />
            <DisplayStatBox data={{ stat: adminDashStats.revenueWeek, name: 'Revenue - Week' }} />
            <DisplayStatBox data={{ stat: adminDashStats.revenueToday, name: 'Revenue - Today' }} />            
          
            <DisplayStatBox data={{ stat: adminDashStats.totalOrders, name: 'Orders - Total' }} />
            <DisplayStatBox data={{ stat: adminDashStats.totalOrdersWeek, name: 'Orders - Week' }} />
            <DisplayStatBox data={{ stat: adminDashStats.totalOrdersToday, name: 'Orders - Today' }} />
        
            <DisplayStatBox data={{ stat: adminDashStats.customers, name: 'Customers' }} />
            <DisplayStatBox data={{ stat: adminDashStats.products, name: 'Products' }} />
            <DisplayStatBox data={{ stat: adminDashStats.categories, name: 'Categories' }} />
   
   

            </Grid>
           
            </main>
          </div>
        <Footer />
      </>
    );
  }
  else
  {
    return (
       <DeniedAccess />
    );
  }

};



