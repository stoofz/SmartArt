import React, { useState } from 'react';
import AddCategory from 'components/Admin/AddCategory';
import AddProduct from 'components/Admin/AddProduct';
import DeleteForm from 'components/Admin/DeleteForm';
import CreateDiscountForm from 'components/Admin/CreateDiscount';
import DeniedAccess from 'components/Admin/Denied';
import Layout from 'components/Admin/Layout';
import Notification from 'components/Notification';
import { List, ListItem, ListItemText, Button, Modal, Box, Typography } from '@mui/material';
import { isAdmin } from 'utils/session';
import Container from '@mui/material/Container';


const ProductsPage = () => {
  const [modals, setModals] = useState({
    category: false,
    deleteCategory: false,
    product: false,
    deleteProduct: false,
    createDiscount: false,
    deleteDiscount: false,
  });

  const [success, setSuccess] = useState({
    category: false,
    product: false,
    createDiscount: false,
  });

  const [delSuccess, setDelSuccess] = useState({
    deleteCategory: false,
    deleteProduct: false,
    deleteDiscount: false,
  });

  const handleOpen = (modalKey) => {
    setModals((prevModals) => ({ ...prevModals, [modalKey]: true }));
  };

  const handleClose = (modalKey) => {
    setModals((prevModals) => ({ ...prevModals, [modalKey]: false }));
    setSuccess((prevSuccess) => ({ ...prevSuccess, [modalKey]: false }));
  };

  const handleSuccess = (modalKey) => {
    setSuccess((prevSuccess) => ({ ...prevSuccess, [modalKey]: true }));
    setModals((prevModals) => ({ ...prevModals, [modalKey]: false }));
  };

  const handleDelSuccess = (modalKey) => {
    setDelSuccess((prevSuccess) => ({ ...prevSuccess, [modalKey]: true }));
  };

  const theme = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: '#fff',
    padding: '20px',
    borderRadius: '10px',

    '& .form-input': {
      marginBottom: '15px',
    },
  
    '& .form-label': {
      fontSize: '16px',
      marginBottom: '5px',
    },
  };

  if (isAdmin()) {

    return (
    
       <Layout>
         
        <>
        <Container maxWidth="sm" style={{ minHeight: "560px", marginTop: '2em' }}>
            
          <ListItem style={{ cursor: 'pointer' }}>
         
              <Button onClick={() => handleOpen('category') } variant="contained" style={{
                  backgroundColor: '#fae4e2',
                  '&:hover': {
                    backgroundColor: '#32434e',
                    color: 'white',
                  },
                  width: '200px',
                  color: '#32434E',
                }}>Add Category</Button>
              <Modal open={modals.category} onClose={() => handleClose('category')}>
                <Box sx={theme}>
                  <Typography id="addCategory" style={{ fontWeight: 'bold' }}>Add Category</Typography>
                  <AddCategory onSuccess={() => handleSuccess('category')} />
                </Box>
              </Modal>

              <Notification
                open={success.category}
                onClose={() => setSuccess((prevSuccess) => ({ ...prevSuccess, category: false }))}
                message="Category created"
              />
            
                </ListItem>

                <ListItem style={{ cursor: 'pointer' }}>
            <Button onClick={() => handleOpen('deleteCategory') } variant="contained" style={{
                  backgroundColor: '#fae4e2',
                  '&:hover': {
                    backgroundColor: '#32434e',
                    color: 'white',
                  },
                  width: '200px',
                  color: '#32434E',
                }}>Delete Category</Button>
              <Modal open={modals.deleteCategory} onClose={() => handleClose('deleteCategory')}>
                <Box sx={theme}>
                  <Typography id="deleteCategory" style={{ fontWeight: 'bold' }}>Delete Category</Typography>
                  <DeleteForm onSuccess={() => handleDelSuccess('deleteCategory')} apiListEndpoint="/api/listCategories" apiEndpoint="/api/deleteCategory?CategoryId=" itemName="Categories" />
                </Box>
              </Modal>

              <Notification
                open={delSuccess.deleteCategory}
                onClose={() => setDelSuccess((prevSuccess) => ({ ...prevSuccess, deleteCategory: false }))}
                message="Category deleted"
              />
            </ListItem>

            <ListItem style={{ cursor: 'pointer' }}>
            <Button onClick={() => handleOpen('product') } variant="contained" style={{
                  backgroundColor: '#fae4e2',
                  '&:hover': {
                    backgroundColor: '#32434e',
                    color: 'white',
                  },
                  width: '200px',
                  color: '#32434E',
                }}>Add Product</Button>
              <Modal open={modals.product} onClose={() => handleClose('product')}>
                <Box sx={theme}>
                  <Typography id="addProduct" style={{ fontWeight: 'bold' }}>Add Product</Typography>
                  <AddProduct onSuccess={() => handleSuccess('product')} />
                </Box>
              </Modal>

              <Notification
                open={success.product}
                onClose={() => setSuccess((prevSuccess) => ({ ...prevSuccess, product: false }))}
                message="Product created"
              />
            </ListItem>

            <ListItem style={{ cursor: 'pointer' }}>
            <Button onClick={() => handleOpen('deleteProduct') } variant="contained" style={{
                  backgroundColor: '#fae4e2',
                  '&:hover': {
                    backgroundColor: '#32434e',
                    color: 'white',
                  },
                  width: '200px',
                  color: '#32434E',
                }}>Delete Product</Button>
              <Modal open={modals.deleteProduct} onClose={() => handleClose('deleteProduct')}>
                <Box sx={theme}>
                  <Typography id="deleteProduct" style={{ fontWeight: 'bold' }}>Delete Product</Typography>
                  <DeleteForm onSuccess={() => handleDelSuccess('deleteProduct')} apiListEndpoint="/api/listProducts" apiEndpoint="/api/deleteProduct?productId=" itemName="Products" />
                </Box>
              </Modal>

              <Notification
                open={delSuccess.deleteProduct}
                onClose={() => setDelSuccess((prevSuccess) => ({ ...prevSuccess, deleteProduct: false }))}
                message="Product deleted"
              />
              </ListItem>
              
              <ListItem style={{ cursor: 'pointer' }}>
              <Button onClick={() => handleOpen('createDiscount') } variant="contained" style={{
                  backgroundColor: '#fae4e2',
                  '&:hover': {
                    backgroundColor: '#32434e',
                    color: 'white',
                  },
                  width: '200px',
                  color: '#32434E',
                }}>Create Discount</Button>
              <Modal open={modals.createDiscount} onClose={() => handleClose('createDiscount')}>
                <Box sx={theme}>
                  <Typography id="createDiscount" style={{ fontWeight: 'bold' }}>Create Discount</Typography>
                  <CreateDiscountForm onSuccess={() => handleSuccess('createDiscount')} />
                </Box>
              </Modal>

              <Notification
                open={success.createDiscount}
                onClose={() => setSuccess((prevSuccess) => ({ ...prevSuccess, createDisount: false }))}
                message="Discount created"
              />
            </ListItem>

            <ListItem style={{ cursor: 'pointer' }}>
            <Button onClick={() => handleOpen('deleteDiscount') } variant="contained" style={{
                  backgroundColor: '#fae4e2',
                  '&:hover': {
                    backgroundColor: '#32434e',
                    color: 'white',
                  },
                  width: '200px',
                  color: '#32434E',
                }}>Delete Discount</Button>
              <Modal open={modals.deleteDiscount} onClose={() => handleClose('deleteDiscount')}>
                <Box sx={theme}>
                  <Typography id="deleteDiscount" style={{ fontWeight: 'bold' }}>Delete Discount</Typography>
                  <DeleteForm onSuccess={() => handleDelSuccess('deleteDiscount')} apiListEndpoint="/api/listDiscount" apiEndpoint="/api/deleteDiscount?discountId=" itemName="Discount" />
                </Box>
              </Modal>

              <Notification
                open={delSuccess.deleteDiscount}
                onClose={() => setDelSuccess((prevSuccess) => ({ ...prevSuccess, deleteDiscount: false }))}
                message="Discount deleted"
              />
            </ListItem>


</Container>
         </>
        </Layout>
     
    );
  }else
  {
    return (
      <DeniedAccess />
    );
  }
};

export default ProductsPage;
