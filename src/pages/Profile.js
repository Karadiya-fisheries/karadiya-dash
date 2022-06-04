// import * as React from 'react';
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
//import avatar_3 from "../../public/static/mock-images/avatars/avatar_3.jpg";
import UploadButton from "./UploadButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ButtonGroup from "./ButtonGroup";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const profile = {
  photoURL: "/static/mock-images/avatars/avatar_3.jpg",
};
//const AvatarStyle = {backgroundSize: 'cover'}

export default function Profile() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={4}>
          <Item
            style={{
              justifyContent: "center",
              textAlign: "center",
              display: "flex",
              backgroundColor: "#f9fafb",
            }}
          >
            <Box
              sx={{
                display: "grid",
               
                gap: 1,
                justifyContent: "center",
                
              textAlign: "center",
              
              backgroundColor: "#f9fafb",
              }}
              style={{justifyContent:"center",textAlign: "center",backgroundColor:"#f9fafb"}}
            >
              <Item sx={{ gridColumn: "1", gridRow: "span 2" }}>
              <img
              src={profile.photoURL}
              alt=""
              style={{
                borderRadius: "50%",
                
              }}
              sx={{
                width: { xs: "10%", sm: "20%", md: "30%", lg: "60%" },
                borderRadius: "50%",
              }}
            />
              </Item>
              {/* The second non-visible row has height of 40px */}
              <Item sx={{ gridColumn: "1", gridRow: "4 / 5",justifyContent:'left' }}><ButtonGroup /></Item>
            </Box>
           
           
            
          </Item>
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <Item
            style={{
              justifyContent: "center",
              textAlign: "center",

              backgroundColor: "#f9fafb",
            }}
          >
            <Typography variant="h4" component="h5">
              Jayodon Frankie
            </Typography>
            <Typography variant="h7">JayodonFrankie@gmail.com</Typography>

            <Grid
              container
              spacing={3}
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              style={{ marginTop: "5%" }}
            >
              <Grid item xs={12} md={6}>
                <Item>
                  <TextField
                    label="Outlined secondary"
                    color="secondary"
                    focused
                    fullWidth
                  />
                </Item>
              </Grid>
              <Grid item xs={12} md={6}>
                <Item>
                  <TextField
                    label="Outlined secondary"
                    color="secondary"
                    focused
                    fullWidth
                  />
                </Item>
              </Grid>
              <Grid item xs={12} md={6}>
                <Item>
                  <TextField
                    label="Outlined secondary"
                    color="secondary"
                    focused
                    fullWidth
                  />
                </Item>
              </Grid>
              <Grid item xs={12} md={6}>
                <Item>
                  <TextField
                    label="Outlined secondary"
                    color="secondary"
                    focused
                    fullWidth
                  />
                </Item>
              </Grid>
              <Grid item xs={12} md={6}>
                <Item>
                  <TextField
                    label="Outlined secondary"
                    color="secondary"
                    focused
                    fullWidth
                  />
                </Item>
              </Grid>
              <Grid item xs={12} md={6}>
                <Item>
                  <TextField
                    label="Outlined secondary"
                    color="secondary"
                    focused
                    fullWidth
                  />
                </Item>
              </Grid>
            </Grid>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
