import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ChakraProvider } from "@chakra-ui/react"

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp
