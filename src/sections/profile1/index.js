import SimpleBar from 'simplebar-react'

import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './../../theme/helpers'
import Cover from './Cover'
import Main from './Main'

export default function App() {
  return (
    <SimpleBar style={{ maxHeight: '90vh' }}>
      <ChakraProvider theme={theme}>
        
              <Cover />
              <Main />
           
      </ChakraProvider>
    </SimpleBar>
  )
}
