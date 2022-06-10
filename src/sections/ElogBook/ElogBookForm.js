import * as React from 'react';
import { FormControl, FormLabel, Grid, Input, Select } from "@chakra-ui/react";
import {
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./../../theme/helpers";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Divider from '@mui/material/Divider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

function ElogBookForm() {
    const [value, setValue] = React.useState('yes');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
      <Typography variant="h4" component="h2" style={{ textAlign: "center" }}>
       ElogBook Form
      </Typography>
      ;
      <ChakraProvider theme={theme}>
        <Box
          sx={{
            width: "90%",
            // height: "100vh",
            boxShadow: 5,
            justifyContent: "center",
            alignItems: "center",
            // flexDirection:'column',
            margin: "auto",
            padding: "20px",
          }}
        >
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            gap={6}
          >
            <FormControl id="Wessel Id">
              <FormLabel>Wessel ID</FormLabel>
              <Input
                focusBorderColor="brand.blue"
                type="text"
                placeholder="MP23455"
              />
            </FormControl>
            <FormControl id="Skipper ID">
              <FormLabel>Skipper Id</FormLabel>
              <Input
                focusBorderColor="brand.blue"
                type="text"
                placeholder="XO12328"
              />
            </FormControl>
            <FormControl id="harbor">
              <FormLabel>Departure Harbor </FormLabel>
              <Select focusBorderColor="brand.blue" placeholder="Select Harbor">
                <option value="Galle">Galle</option>
                <option value="Matara">Matara</option>
                <option value="Mirissa">Mirissa</option>
                <option value="Benthota" selected>
                  Benthota
                </option>
              </Select>
            </FormControl>
            <FormControl id="Departure Date">
              <FormLabel>Departure Date</FormLabel>
              <Input
                focusBorderColor="brand.blue"
                type="date"
                placeholder="2022.2.9"
              />
            </FormControl>
            
            <FormControl id="Departure Time">
              <FormLabel>Departure Time</FormLabel>
              <Input
                focusBorderColor="brand.blue"
                type="time"
                placeholder="2022.2.9"
              />
            </FormControl>
            <FormControl id="Gear Type">
              <FormLabel>Gear Type </FormLabel>
              <Select focusBorderColor="brand.blue" placeholder="Select gear type">
                <option value="LongLine" selected>LongLine</option>
                <option value="Matara">Matara</option>
                <option value="Mirissa">Mirissa</option>
                <option value="Benthota" >
                  Benthota
                </option>
              </Select>
            </FormControl>
            <FormControl id="main Line">
              <FormLabel>Main Line</FormLabel>
              <Input
                focusBorderColor="brand.blue"
                type="text"
                placeholder=""
              />
            </FormControl>
            <FormControl id="Branch Line">
              <FormLabel>Brach Line</FormLabel>
              <Input
                focusBorderColor="brand.blue"
                type="text"
                placeholder=""
              />
            </FormControl>
            <FormControl id="hooks">
              <FormLabel>Number of Hooks</FormLabel>
              <Input
                focusBorderColor="brand.blue"
                type="number"
                placeholder="17"
              />
            </FormControl>
            <FormControl id="Hook Type">
              <FormLabel>Hook Type </FormLabel>
              <Select focusBorderColor="brand.blue" placeholder="Select gear type">
                <option value="LongLine" selected>LongLine</option>
                <option value="Matara">Matara</option>
                <option value="Mirissa">Mirissa</option>
                <option value="Benthota" >
                  Benthota
                </option>
              </Select>
            </FormControl>
            <FormControl id="depth">
              <FormLabel>Depth(m)</FormLabel>
              <Input
                focusBorderColor="brand.blue"
                type="number"
                placeholder="17"
              />
            </FormControl>
            <FormControl id="Bait">
              <FormLabel>Bait</FormLabel>
              <Select focusBorderColor="brand.blue" placeholder="squid">
                <option value="Galle">Galle</option>
                <option value="Matara">Matara</option>
                <option value="Mirissa">Mirissa</option>
                <option value="Benthota" >
                  Benthota
                </option>
              </Select>
            </FormControl>
            <FormControl id="Fishing Date">
              <FormLabel>Fishing Date</FormLabel>
              <Input
                focusBorderColor="brand.blue"
                type="date"
                placeholder="2022.2.9"
              />
            </FormControl>
            <FormControl id="Fishing Time">
              <FormLabel>Fishing Time</FormLabel>
              <Input
                focusBorderColor="brand.blue"
                type="time"
                placeholder="2022.2.9"
              />
            </FormControl>
            <FormControl id="GPS point">
              <FormLabel>GPS point</FormLabel>
              <Select focusBorderColor="brand.blue" placeholder="start gps">
                <option value="Galle">Galle</option>
                <option value="Matara">Matara</option>
                <option value="Mirissa">Mirissa</option>
                <option value="Benthota" >
                  Benthota
                </option>
              </Select>
            </FormControl>
            
              {/* <Grid container spacing={2}>
                <Grid item xs={6} md={8}>
                  <Item>xs=6 md=8</Item>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Item>xs=6 md=4</Item>
                </Grid>
              </Grid> */}
              
              <FormControl id="Latitude">
                <FormLabel>Latitude</FormLabel>
                <Input
                  focusBorderColor="brand.blue"
                  type="text"
                  placeholder="454566466"
                />
              </FormControl>
              <FormControl id="Longitude">
                <FormLabel>Longitude</FormLabel>
                <Input
                  focusBorderColor="brand.blue"
                  type="text"
                  placeholder="454566466"
                />
                </FormControl>
                <FormControl id="fish type">
              <FormLabel>Fish type</FormLabel>
              <Select focusBorderColor="brand.blue" placeholder="Luna">
              <option value="Luna">Luna</option>
                <option value="dry fish">dry fish</option>
                <option value="Mirissa">Mirissa</option>
                <option value="Benthota" selected>
                  Benthota
                </option>
              </Select>
            </FormControl>
            <FormControl id="fish type">
              <FormLabel>Fish type</FormLabel>
              <Select focusBorderColor="brand.blue" placeholder="Luna">
              <option value="Luna">Luna</option>
                <option value="dry fish">dry fish</option>
                <option value="Mirissa">Mirissa</option>
                <option value="Benthota" selected>
                  Benthota
                </option>
              </Select>
            </FormControl>
             
              
              <FormControl id="boatTraveller">
              <FormLabel>Boat traveler Details</FormLabel>
              <FormLabel>Name of first passenger</FormLabel>
              <Input
                focusBorderColor="brand.blue"
                type="text"
                placeholder="Saman"
              />
            </FormControl>
             
            
            
            
              <FormControl id="radioStation">
              <FormLabel>Radio station address by Vessel</FormLabel>
              <Select focusBorderColor="brand.blue" placeholder="Station">
              <option value="Galle">Galle</option>
                <option value="Matara">Matara</option>
                <option value="Mirissa">Mirissa</option>
                <option value="Benthota" selected>
                  Benthota
                </option>
              </Select>
            </FormControl>
            {/* <FormControl id="radioCode">
              <FormLabel>Radio code address by Vessel</FormLabel>
              <Select focusBorderColor="brand.blue" placeholder="Radio Code">
              <option value="409.6hz">409.6hz</option>
                <option value="285.67hz">285.67hz</option>
                <option value="860.56hz">860.56hz</option>
                <option value="95.56hz" selected>
                  95.56hz
                </option>
              </Select>
            </FormControl> */}
            
            <FormControl>
              <FormLabel>Radio code address by Vessel</FormLabel>
              <NumberInput>
                <NumberInputField placeholder="456.hz" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
  <FormLabel id="demo-controlled-radio-buttons-group">I have a VMS device on board</FormLabel>
  <RadioGroup
    aria-labelledby="demo-controlled-radio-buttons-group"
    name="controlled-radio-buttons-group"
    value={value}
    onChange={handleChange}
  >
    <FormControlLabel value="yes" control={<Radio />} label="yes" />
    <FormControlLabel value="no" control={<Radio />} label="no" />
  </RadioGroup>
</FormControl>

          </Grid>
          <Button variant="contained" style={{margin: '0 auto', display: "flex",width: '30%'}}>Save</Button>
        </Box>
      </ChakraProvider>
    </>
  );
}

export default ElogBookForm;
