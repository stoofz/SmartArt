import AddCategory from 'components/Admin/AddCategory';
import AddProduct from 'components/Admin/AddProduct';
import DelProduct from 'components/Admin/DelProduct';
import DelCategory from 'components/Admin/DelCategory';
import Notification from 'components/Notification';
import { Button, Modal, Box, Typography } from '@mui/material';
import { useState } from 'react';

const ProductsPage = () => {
  const [productOpen, setProductOpen] = useState(false);
  const [delProductOpen, setDelProductOpen] = useState(false);
  const [productSuccess, setProductSuccess] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [delCategoryOpen, setDelCategoryOpen] = useState(false);
  const [categorySuccess, setCategorySuccess] = useState(false);


  const handleDelCategoryOpen = () => {
    setDelCategoryOpen(true);
  };

  const handleDelCategoryClose = () => {
    setDelCategoryOpen(false);
  };


  const handleDelProductOpen = () => {
    setDelProductOpen(true);
  };

  const handleDelProductClose = () => {
    setDelProductOpen(false);
  };


  const handleProductOpen = () => {
    setProductOpen(true);
  };

  const handleProductClose = () => {
    setProductOpen(false);
    setProductSuccess(false);
  };

  const handleProductSuccess = () => {
    setProductSuccess(true);
    setProductOpen(false);
  }


  const handleCategoryOpen = () => {
    setCategoryOpen(true);
  };

  const handleCategoryClose = () => {
    setCategoryOpen(false);
    setCategorySuccess(false);
  };

  const handleCategorySuccess = () => {
    setCategorySuccess(true);
    setCategoryOpen(false);
  }


  const theme = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#fff',
  };

  return (
    <>      
      <div>
        <Button onClick={handleCategoryOpen}>Add Category</Button>
        <Modal open={categoryOpen} onClose={handleCategoryClose} >
          <Box sx={theme}>
            <Typography id="addCategory">
              Add Category
            </Typography>
            <AddCategory onSuccess={handleCategorySuccess} />
          </Box>
        </Modal>

        <Notification
        open={categorySuccess}
        onClose={() => setCategorySuccess(false)}
        message="Category created"
        />
      </div>


        
      <div>
        <Button onClick={handleDelCategoryOpen}>Delete Category</Button>
        <Modal open={delCategoryOpen} onClose={handleDelCategoryClose} >
          <Box sx={theme}>
            <Typography id="delCategory">
              Delete Category
            </Typography>
            <DelCategory />
          </Box>
        </Modal>
      </div>



      <div>
        <Button onClick={handleProductOpen}>Add Product</Button>
        <Modal open={productOpen} onClose={handleProductClose} >
          <Box sx={theme}>
            <Typography id="addProduct">
              Add Product
            </Typography>
            <AddProduct onSuccess={ handleProductSuccess} />
          </Box>
        </Modal>

        <Notification
        open={productSuccess}
        onClose={() => setProductSuccess(false)}
          message="Product created"
        />
      </div>
      

      <div>
        <Button onClick={handleDelProductOpen}>Delete Product</Button>
        <Modal open={delProductOpen} onClose={handleDelProductClose} >
          <Box sx={theme}>
            <Typography id="delProduct">
              Delete Product
            </Typography>
            <DelProduct />
          </Box>
        </Modal>
      </div>



    </>
  );
};

export default ProductsPage;

