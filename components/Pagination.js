import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Paginate = ({ count, page, onChange,}) => {
  return (
    <Stack>
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        shape="rounded"
      />
    </Stack>
  );
};

export default Paginate;