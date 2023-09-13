import React, { useState } from 'react';
import AddCategory from 'components/Admin/AddCategory';
import AddProduct from 'components/Admin/AddProduct';
import DeleteForm from 'components/Admin/DeleteForm';
import Sidebar from 'components/Admin/Sidebar';
import CreateDiscountForm from 'components/Admin/CreateDiscount';
import DeniedAccess from 'components/Admin/Denied';
import Navigation from 'components/Admin/Navigation';
import Footer from 'components/Admin/Footer';
import Notification from 'components/Notification';
import { Button, Modal, Box, Typography } from '@mui/material';
import { isAdmin } from 'utils/session';

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
    width: 700,
    bgcolor: '#fff',
  };

  if (isAdmin()) {

    return (
      <>
        <Navigation />
        <div className="flex">
          <Sidebar />
          <main>
            <div>
              <Button onClick={() => handleOpen('category')}>Add Category</Button>
              <Modal open={modals.category} onClose={() => handleClose('category')}>
                <Box sx={theme}>
                  <Typography id="addCategory">Add Category</Typography>
                  <AddCategory onSuccess={() => handleSuccess('category')} />
                </Box>
              </Modal>

              <Notification
                open={success.category}
                onClose={() => setSuccess((prevSuccess) => ({ ...prevSuccess, category: false }))}
                message="Category created"
              />
            </div>

            <div>
              <Button onClick={() => handleOpen('deleteCategory')}>Delete Category</Button>
              <Modal open={modals.deleteCategory} onClose={() => handleClose('deleteCategory')}>
                <Box sx={theme}>
                  <Typography id="deleteCategory">Delete Category</Typography>
                  <DeleteForm onSuccess={() => handleDelSuccess('deleteCategory')} apiListEndpoint="/api/listCategories" apiEndpoint="/api/deleteCategory?CategoryId=" itemName="Categories" />
                </Box>
              </Modal>

              <Notification
                open={delSuccess.deleteCategory}
                onClose={() => setDelSuccess((prevSuccess) => ({ ...prevSuccess, deleteCategory: false }))}
                message="Category deleted"
              />
            </div>

            <div>
              <Button onClick={() => handleOpen('product')}>Add Product</Button>
              <Modal open={modals.product} onClose={() => handleClose('product')}>
                <Box sx={theme}>
                  <Typography id="addProduct">Add Product</Typography>
                  <AddProduct onSuccess={() => handleSuccess('product')} />
                </Box>
              </Modal>

              <Notification
                open={success.product}
                onClose={() => setSuccess((prevSuccess) => ({ ...prevSuccess, product: false }))}
                message="Product created"
              />
            </div>

            <div>
              <Button onClick={() => handleOpen('deleteProduct')}>Delete Product</Button>
              <Modal open={modals.deleteProduct} onClose={() => handleClose('deleteProduct')}>
                <Box sx={theme}>
                  <Typography id="deleteProduct">Delete Product</Typography>
                  <DeleteForm onSuccess={() => handleDelSuccess('deleteProduct')} apiListEndpoint="/api/listProducts" apiEndpoint="/api/deleteProduct?productId=" itemName="Products" />
                </Box>
              </Modal>

              <Notification
                open={delSuccess.deleteProduct}
                onClose={() => setDelSuccess((prevSuccess) => ({ ...prevSuccess, deleteProduct: false }))}
                message="Product deleted"
              />
              </div>
              
              <div>
              <Button onClick={() => handleOpen('createDiscount')}>Create Discount</Button>
              <Modal open={modals.createDiscount} onClose={() => handleClose('createDiscount')}>
                <Box sx={theme}>
                  <Typography id="createDiscount">Create Discount</Typography>
                  <CreateDiscountForm onSuccess={() => handleSuccess('createDiscount')} />
                </Box>
              </Modal>

              <Notification
                open={success.createDiscount}
                onClose={() => setSuccess((prevSuccess) => ({ ...prevSuccess, createDisount: false }))}
                message="Discount created"
              />
            </div>

            <div>
              <Button onClick={() => handleOpen('deleteDiscount')}
                sx={{
                  backgroundColor: '#f0f0f0',
                  color: '#fff',
                  borderRadius: '1px solid #ccc',
                  
                }}><Typography variant="body1" sx={{ fontWeight: 'bold',color: 'black' }}>Delete Discount</Typography></Button>
              <Modal open={modals.deleteDiscount} onClose={() => handleClose('deleteDiscount')}>
                <Box sx={theme}>
                  <Typography id="deleteDiscount">Delete Discount</Typography>
                  <DeleteForm onSuccess={() => handleDelSuccess('deleteDiscount')} apiListEndpoint="/api/listDiscount" apiEndpoint="/api/deleteDiscount?discountId=" itemName="Discount" />
                </Box>
              </Modal>

              <Notification
                open={delSuccess.deleteDiscount}
                onClose={() => setDelSuccess((prevSuccess) => ({ ...prevSuccess, deleteDiscount: false }))}
                message="Discount deleted"
              />
            </div>

          </main>
        </div>
        <Footer />
      </>
    );
  }else
  {
    return (
      <DeniedAccess />
    );
  }
};

export default ProductsPage;
