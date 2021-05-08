import { useState, useEffect } from 'react'
import Head from 'next/head'
import useMedSearch from '../hooks/useMedSearch'
import medList from '../data/medList'
import {
  Heading,
  Flex,
  Input,
  Button,
  Spinner,
  Box,
  useToast
} from '@chakra-ui/react'

export default function Home() {
  const [input, setInput] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, error, data] = useMedSearch(searchTerm)
  const [hepatotoxicity, setHepatotoxicity] = useState("")

  const toast = useToast()

  const handleSubmit = () => {
    setSearchTerm(input)
  }

  useEffect(() => {
    if (data && data["book-part-wrapper"]["book-part"][0].body[0].sec[0].sec[2].p) {
      setHepatotoxicity(data["book-part-wrapper"]["book-part"][0].body[0].sec[0].sec[2].p)
    } else {
      setHepatotoxicity("Sorry, that information doesn't exist.")
    }
  }, [data])
  console.log(hepatotoxicity)
  return (
    <div>
      <Head>
        <title>Simple LiverTox</title>
        <meta name="description" content="Quickly get hepatotoxicity." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Flex
          backgroundColor="#000000"
          minH="100vh"
          justifyContent="center"
          alignItems="center"
          direction="column"
          px={48}
        >
          <Heading
            as="h1"
            color="#fff"
            mb={4}
            fontSize="5rem"
            textAlign="center"
          >
            Simple LiverTox
      </Heading>
          <Input
            textAlign="center"
            color="#fff"
            w={48}
            mb={4}
            list="meds"
            onChange={(e) => setInput(e.target.value)}
          />

          <datalist id="meds">
            {input.length >= 3 && medList.filter(j => j.toLowerCase().includes(input.toLowerCase())).map(i => (
              <option
                key={i}
                value={i}
              />
            ))}

          </datalist>

          <Button
            onClick={handleSubmit}
            w={48}
            mb={12}
          >
            Get Hepatotoxicity
          </Button>

          {isLoading && searchTerm.length > 3 && <Spinner color="#fff" />}

          {!isLoading && !error &&
            <>
              <Box
                color="#ffffff"
                mb={8}
              >
                {hepatotoxicity}
              </Box>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(hepatotoxicity).then(function () {
                    toast({
                      title: "Copied to clipboard!",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    })
                  }, function (err) {
                    toast({
                      title: "Something went wrong, please try again.",
                      status: "error",
                      duration: 5000,
                      isClosable: true,
                    })
                  })
                }
                }
              >
                Copy to Clipboard
              </Button>
            </>
          }
        </Flex>
      </main>
    </div >
  )
}