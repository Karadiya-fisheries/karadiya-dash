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
import DepartureDevice from "./DepartureDevice";
import Divider from '@mui/material/Divider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

function DepartureFrom() {
    const [value, setValue] = React.useState('yes');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
      <Typography variant="h4" component="h2" style={{ textAlign: "center" }}>
        Departure Form
      </Typography>
      ;
      <ChakraProvider theme={theme}>
        <Box
          sx={{
            width: "90%",
            // height: "100vh",
            backgroundColor: "#edeff1",
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
            <FormControl id="IMULnumber">
              <FormLabel>IMUL Number</FormLabel>
              <Input
                focusBorderColor="brand.blue"
                type="text"
                placeholder="WS23333"
              />
            </FormControl>
            <FormControl id="Name">
              <FormLabel>Name</FormLabel>
              <Input
                focusBorderColor="brand.blue"
                type="text"
                placeholder="Jayodon Frankie"
              />
            </FormControl>
            <FormControl id="phoneNumber">
              <FormLabel>Phone Number</FormLabel>
              <Input
                focusBorderColor="brand.blue"
                type="tel"
                placeholder="(408) 996–1010"
              />
            </FormControl>
            <FormControl id="emailAddress">
              <FormLabel>Email Address of owner</FormLabel>
              <Input
                focusBorderColor="brand.blue"
                type="text"
                placeholder="Jayodn@me.com"
              />
            </FormControl>
            <FormControl id="nameSkipper">
              <FormLabel>Skipper's Name</FormLabel>
              <Input
                focusBorderColor="brand.blue"
                type="text"
                placeholder="Sarath perera"
              />
            </FormControl>
            <FormControl id="skipperId">
              <FormLabel>Skipper's NIC Number</FormLabel>
              <Input
                focusBorderColor="brand.blue"
                type="text"
                placeholder="19782655555v"
              />
            </FormControl>
            <FormControl id="skipperNumber">
              <FormLabel>Skipper Number(Start with SK or SL)</FormLabel>
              <Input
                focusBorderColor="brand.blue"
                type="text"
                placeholder="454566466"
              />
            </FormControl>
            <FormControl id="PORT">
              <FormLabel>Port where the boat is expected to depart </FormLabel>
              <Select focusBorderColor="brand.blue" placeholder="Select Port">
                <option value="Galle">Galle</option>
                <option value="Matara">Matara</option>
                <option value="Mirissa">Mirissa</option>
                <option value="Benthota" selected>
                  Benthota
                </option>
              </Select>
            </FormControl>
            <FormControl id="fishArea">
              <FormLabel>Fishing Area During fishing Operation</FormLabel>
              <Select focusBorderColor="brand.blue" placeholder="Select Sea">
                <option value="Indigenous Sea">Indigenous Sea</option>
                <option value="International Sea" selected>
                  International Sea
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
              
              <FormControl id="caringDevice">
                <FormLabel>Description of the carrying device</FormLabel>
                <Input
                  focusBorderColor="brand.blue"
                  type="text"
                  placeholder="454566466"
                />
              </FormControl>
              <FormControl id="muruwela">
                <FormLabel>Length of Maruwela(Meter)</FormLabel>
                <Input
                  focusBorderColor="brand.blue"
                  type="text"
                  placeholder="25m"
                />
              </FormControl>
              <FormControl id="thorns">
                <FormLabel>Number of thorns</FormLabel>
                <Input
                  focusBorderColor="brand.blue"
                  type="text"
                  placeholder="50"
                />
              </FormControl>
              <FormControl id="net">
                <FormLabel>Length of the Net(KM)</FormLabel>
                <Input
                  focusBorderColor="brand.blue"
                  type="text"
                  placeholder="23km"
                />
              </FormControl>
              <FormControl id="EyeSize">
                <FormLabel>Eye Size(Inches)</FormLabel>
                <Input
                  focusBorderColor="brand.blue"
                  type="text"
                  placeholder="2.5"
                />
              </FormControl>
              <FormControl id="lengthNetting">
                <FormLabel>Length of Netting(Meter)</FormLabel>
                <Input
                  focusBorderColor="brand.blue"
                  type="text"
                  placeholder="2.5"
                />
              </FormControl>
              <FormControl id="EyeSize">
                <FormLabel>Eye Size(Inches-Netting)</FormLabel>
                <Input
                  focusBorderColor="brand.blue"
                  type="text"
                  placeholder="2.5"
                />
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
             <FormControl id="Hookno">
              <FormLabel>NIC Number of passenger</FormLabel>
              
              <Input
                focusBorderColor="brand.blue"
                type="text"
                placeholder="Saman"
              />
            </FormControl>
            
            
            <FormControl id="licenseVissel">
              <FormLabel>Local Operating License Number of Vessel</FormLabel>
              <Input
                focusBorderColor="brand.blue"
                type="text"
                placeholder="KPG4556"
              />
            </FormControl>
            <FormControl id="licenseVissel">
              <FormLabel>International License Number of Vessel</FormLabel>
              <Input
                focusBorderColor="brand.blue"
                type="text"
                placeholder="KPG4556"
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

export default DepartureFrom;
