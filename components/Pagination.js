import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Paginate = () => {
  return (
    <Stack>
      <Pagination count={10} shape="rounded" />
    </Stack>
  )
};

export default Paginate;