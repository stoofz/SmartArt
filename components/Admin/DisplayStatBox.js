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
    backgroundColor: '#f0f0f0',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '200px',
  }}
>
<Typography variant="body1" sx={{ fontWeight: 'bold' }}>{data.name}</Typography>
  <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: '10px', fontSize: '32px' }}>{data.stat}</Typography>
</Box>
  );
};

//     );