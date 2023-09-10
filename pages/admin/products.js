import React, { useState } from 'react';
import AddCategory from 'components/Admin/AddCategory';
import AddProduct from 'components/Admin/AddProduct';
import DelForm from 'components/Admin/DelForm';
import Notification from 'components/Notification';
import { Button, Modal, Box, Typography } from '@mui/material';
import { isAdmin } from 'utils/session';
import DeniedAccess from 'components/Admin/Denied';
import Navigation from 'components/Admin/Navigation';
import Footer from 'components/Admin/Footer';
import CreateDiscountForm from 'components/Admin/CreateDiscount';


const ProductsPage = () => {
  const [modals, setModals] = useState({
    category: false,
    delCategory: false,
    product: false,
    delProduct: false,
    createDiscount: false,
    delDiscount: false,
  });

  const [success, setSuccess] = useState({
    category: false,
    product: false,
    createDiscount: false,
  });

  const [delSuccess, setDelSuccess] = useState({
    delCategory: false,
    delProduct: false,
    delDiscount: false,
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
          <Button onClick={() => handleOpen('delCategory')}>Delete Category</Button>
          <Modal open={modals.delCategory} onClose={() => handleClose('delCategory')}>
            <Box sx={theme}>
              <Typography id="delCategory">Delete Category</Typography>
              <DelForm onSuccess={() => handleDelSuccess('delCategory')} apiListEndpoint="/api/listCategories" apiEndpoint="/api/delCategory?CategoryId=" itemName="Categories" />
            </Box>
          </Modal>

          <Notification
            open={delSuccess.delCategory}
            onClose={() => setDelSuccess((prevSuccess) => ({ ...prevSuccess, delCategory: false }))}
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
          <Button onClick={() => handleOpen('delProduct')}>Delete Product</Button>
          <Modal open={modals.delProduct} onClose={() => handleClose('delProduct')}>
            <Box sx={theme}>
              <Typography id="delProduct">Delete Product</Typography>
              <DelForm onSuccess={() => handleDelSuccess('delProduct')} apiListEndpoint="/api/listProducts" apiEndpoint="/api/delProduct?productId=" itemName="Products" />
            </Box>
          </Modal>

          <Notification
            open={delSuccess.delProduct}
            onClose={() => setDelSuccess((prevSuccess) => ({ ...prevSuccess, delProduct: false }))}
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
          <Button onClick={() => handleOpen('delDiscount')}>Delete Discount</Button>
          <Modal open={modals.delDiscount} onClose={() => handleClose('delDiscount')}>
            <Box sx={theme}>
              <Typography id="delDiscount">Delete Discount</Typography>
              <DelForm onSuccess={() => handleDelSuccess('delDiscount')} apiListEndpoint="/api/listDiscount" apiEndpoint="/api/delDiscount?discountId=" itemName="Discount" />
            </Box>
          </Modal>

          <Notification
            open={delSuccess.delDiscount}
            onClose={() => setDelSuccess((prevSuccess) => ({ ...prevSuccess, delDiscount: false }))}
            message="Discount deleted"
          />
          </div>


        </main>
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
