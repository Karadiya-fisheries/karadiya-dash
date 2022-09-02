import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import  ElogBookForm from './ElogBookForm';

export default function SimplePaper() {
    const [elogBook, setelogBook] = useState({ createdAt: "2000-01-01" });
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
      <Paper elevation={0} />
      <Paper />
      <Paper elevation={3} />
    </Box>
  );
}
