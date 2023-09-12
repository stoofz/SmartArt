import Box from '@mui/material/Box';

export default function BoxSx({data = data}) {
  return (
      <Box 
        sx={{
          width: 150,
          height: 150,
        }}
     >
      <p>{data.name}</p>
      <p>{data.stat}</p>
      </Box>
  );
}