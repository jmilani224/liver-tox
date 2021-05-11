import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ChakraProvider } from "@chakra-ui/react"
import theme from '../theme/theme'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp
