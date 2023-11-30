import Products from '../components/Products';
import Layout from '@/components/Layout';
import MyCarousel from '@/components/MyCarousel';
import { StyledEngineProvider } from '@mui/material/styles';


export default function Index() {
  

  return (
    <Layout>
      <main>
      <StyledEngineProvider injectFirst>
        <MyCarousel />
      </StyledEngineProvider>
      <Products />
      </main>
    </Layout>
  );
}