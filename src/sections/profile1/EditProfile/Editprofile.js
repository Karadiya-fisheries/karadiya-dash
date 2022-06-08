import { FormControl, FormLabel, Grid, Input, Select } from '@chakra-ui/react';
import {
  
  
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';

import SaveProfile from './Save';

function EditProfile() {
  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      gap={6}
    >
      <FormControl id="firstName">
        <FormLabel>First Name</FormLabel>
        <Input focusBorderColor="brand.blue" type="text" placeholder="Jayodon" />
      </FormControl>
      <FormControl id="lastName">
        <FormLabel>Last Name</FormLabel>
        <Input focusBorderColor="brand.blue" type="text" placeholder="Frankie" />
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
        <FormLabel>Email Address</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="email"
          placeholder="Jayodn@me.com"
        />
      </FormControl>
      <FormControl id="gearType">
        <FormLabel>Gear Type</FormLabel>
        <Select focusBorderColor="brand.blue" placeholder="Select Gear">
          <option value="BMG">BMG</option>
          <option value="APRS">APRS</option>
          <option value="CRIPTO">CRIPTO</option>
          <option value="IPJJ" selected>
          IPJJ
          </option>
          
        </Select>
      </FormControl>
      <FormControl id="country">
        <FormLabel>Hook Type</FormLabel>
        <Select focusBorderColor="brand.blue" placeholder="Select Hooks type">
          <option value="america" selected>
            short
          </option>
          <option value="england">long</option>
          <option value="poland">longer</option>
        </Select>
      </FormControl>
      <FormControl id="Hookno">
        <FormLabel>Hook Number</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="tel"
          placeholder="KPG4556"
        />
      </FormControl>
      <FormControl>
          <FormLabel>Size</FormLabel>
          <NumberInput>
            <NumberInputField placeholder="6000" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl id="Harbor">
          <FormLabel>Harbor Name</FormLabel>
          <Input focusBorderColor="brand.blue" type="text" placeholder="Galle" />
        </FormControl>
        <FormControl id="WesselID">
          <FormLabel>Wessel ID </FormLabel>
          <Input focusBorderColor="brand.blue" type="text" placeholder="XO15677" />
          {/* <InputGroup> */}
            {/* <InputLeftAddon color="gray.500">
              <svg width="1em" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                  clipRule="evenodd"
                />
              </svg>
            </InputLeftAddon>
            <Input
              focusBorderColor="brand.blue"
              type="text"
              placeholder="apple"
            />
          </InputGroup> */}
        </FormControl>
        <FormControl id="mainLine">
          <FormLabel>Main Line</FormLabel>
          <Input focusBorderColor="brand.blue" type="text" placeholder="south west" />
        </FormControl>
        <FormControl id="emailCompany">
          <FormLabel>Email Address</FormLabel>
          <Input
            focusBorderColor="brand.blue"
            type="email"
            placeholder="info@apple.com"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Size</FormLabel>
          <NumberInput>
            <NumberInputField placeholder="6000" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <SaveProfile/>
    </Grid>
  )
}

export default EditProfile
