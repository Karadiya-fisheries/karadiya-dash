import { FormControl, FormLabel, Grid, Input, Select } from '@chakra-ui/react';
import {
  
  
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react'

function AccountSettings() {
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
    </Grid>
  )
}

export default AccountSettings
