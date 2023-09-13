import { isAdmin } from 'utils/session';
import DeniedAccess from 'components/Admin/Denied';
import Navigation from 'components/Admin/Navigation';
import Footer from 'components/Admin/Footer';
import Sidebar from 'components/Admin/Sidebar';
import DisplayStatBox from 'components/Admin/DisplayStatBox';
import { Grid } from '@mui/material';
import formatPrice from '@/utils/formatPrice';
import Container from '@mui/material/Container';
import prisma from '@/utils/prisma';

export async function getServerSideProps() {

  const adminDashStats = {};

  const weekAgo = new Date(new Date() - 7 * 60 * 60 * 24 * 1000);
  const dayAgo = new Date(new Date() - 1 * 60 * 60 * 24 * 1000);

  const totalOrders = await prisma.order.count() || 0;
  
  const totalOrdersToday = await prisma.order.aggregate({
    _count: {
      id: true,
    },
    where: {
      orderDate: {
        gte: dayAgo,
      },
    },
  }) || 0;

  const totalOrdersWeek = await prisma.order.aggregate({
    _count: {
      id: true,
    },
    where: {
      orderDate: {
        gte: weekAgo,
      },
    },
  }) || 0;

  const productsTotal = await prisma.product.count() || 0;
  const categoryTotal = await prisma.category.count() || 0;
  const customersTotal = await prisma.customer.count() | 0;
  
  const totalRevenue = await prisma.order.aggregate({
    _sum: {
      totalPrice: true,
    },
  }) || 0;


  const totalRevenueToday = await prisma.order.aggregate({
    _sum: {
      totalPrice: true,
    },
    where: {
      orderDate: {
        gte: dayAgo,
      },
    },
  }) || 0;


  const totalRevenueWeek = await prisma.order.aggregate({
    _sum: {
      totalPrice: true,
    },
    where: {
      orderDate: {
        gte: weekAgo,
      },
    },
  }) || 0;


  adminDashStats.revenueToday = '$' + formatPrice(parseInt(totalRevenueToday._sum.totalPrice * 100));
  adminDashStats.revenueWeek = '$' + formatPrice(parseInt(totalRevenueWeek._sum.totalPrice * 100));
  adminDashStats.revenue = '$' + formatPrice((totalRevenue._sum.totalPrice * 100));

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

          <Container 
            style={{
              paddingTop: '1.5rem',
              paddingBottom: '1.5rem',
            }}

            >
                
          <main className="w-3/4 p-4" >
    
            <Grid container spacing={4}>

              <Grid item>
                <DisplayStatBox data={{ stat: adminDashStats.revenue, name: 'Revenue - Total' }} />
              </Grid>
              <Grid item>
                <DisplayStatBox data={{ stat: adminDashStats.revenueWeek, name: 'Revenue - Week' }} />
              </Grid>
              <Grid item>
                <DisplayStatBox data={{ stat: adminDashStats.revenueToday, name: 'Revenue - Today' }} />
              </Grid>
    
              <Grid item>
                <DisplayStatBox data={{ stat: adminDashStats.totalOrders, name: 'Orders - Total' }} />
              </Grid>
              <Grid item>
                <DisplayStatBox data={{ stat: adminDashStats.totalOrdersWeek, name: 'Orders - Week' }} />
              </Grid>
              <Grid item>
                <DisplayStatBox data={{ stat: adminDashStats.totalOrdersToday, name: 'Orders - Today' }} />
              </Grid>
    
              <Grid item>
                <DisplayStatBox data={{ stat: adminDashStats.customers, name: 'Customers' }} />
              </Grid>
              <Grid item>
                <DisplayStatBox data={{ stat: adminDashStats.products, name: 'Products' }} />
              </Grid>
              <Grid item>
                <DisplayStatBox data={{ stat: adminDashStats.categories, name: 'Categories' }} />
              </Grid>
            </Grid>

            </main>
            </Container>
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



