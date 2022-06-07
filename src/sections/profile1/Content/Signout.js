import React from 'react';
import { FormControl, FormLabel, Switch } from '@chakra-ui/react'

const Signout = () => {
  return (
    <FormControl
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <FormLabel
        htmlFor="notificationEmails"
        mb={0}
        cursor="pointer"
        userSelect="none"
      >
        Sign Out now!!!
      </FormLabel>
      <Switch id="notificationEmails" />
    </FormControl>
  )
}

export default Signout