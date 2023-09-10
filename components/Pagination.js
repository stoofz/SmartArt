import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const Paginate = ({ count, page, onChange, }) => {
  
  return (
    <Stack 
    margin= "auto"
    >
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        size="large"
        sx={{ color:'#F5C9C6' }}
      />
    </Stack>
  );
};

export default Paginate;