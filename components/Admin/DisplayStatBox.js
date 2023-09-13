import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function BoxSx({data = data}) {
  return (
<Box
  className="component"
  sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
    padding: '10px',
    borderRadius: '5px',
    
    backgroundColor: '#fae4e2',
    '&:hover': {
      backgroundColor: '#32434e',
      color: 'white',
    },
    width: '200px',
    color: '#32434E',
  }}
>
<Typography variant="body1" sx={{ fontWeight: 'bold' }}>{data.name}</Typography>
  <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: '10px', fontSize: '32px' }}>{data.stat}</Typography>
</Box>
  );
};

//     );