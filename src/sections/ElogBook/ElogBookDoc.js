import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ElogBookOneRecord from './ElogbookOnerecord';

export default function SimplePaper() {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 5,
          width: 700,
          height: 1000,
        },
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "0",
      }}
    >
      <Paper elevation={3} >
      <Typography variant="h3" component="h2" sx={{textAlign:'center',m:4}}>
       ElogBook Record ID
      </Typography>
      <Divider sx={{width:'100%',borderBottomWidth: 3}} />
      
  {/* <Grid container item xs={6} direction="column" >
  
  </Grid>
  <Grid container item xs={6} direction="column" >
  
  </Grid> */}
  <ElogBookOneRecord/>

      </Paper>
    </Box>
  );
}
