import { useState, useEffect } from 'react'
import Head from 'next/head'
import useMedSearch from '../hooks/useMedSearch'
import useMedList from '../hooks/useMedList'
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
  const [selectedDrugFromList, setSelectedDrugFromList] = useState({})
  const [hepatotoxicity, setHepatotoxicity] = useState("")
  const [showDropDown, setShowDropdown] = useState(true)

  const [isLoading, error, data] = useMedSearch(searchTerm)
  const [medListLoading, medListError, medList] = useMedList()

  const toast = useToast()

  const handleSubmit = () => {
    setSearchTerm(input)
  }

  useEffect(() => {
    if (data && data.hepatotoxicity) {
      setHepatotoxicity(data.hepatotoxicity)
    } else {
      setHepatotoxicity("Sorry, that information doesn't exist.")
    }
  }, [data])

  useEffect(() => {
    if (medList) {
      const selectedDrug = medList.filter(j => j.name.toLowerCase().includes(input.toLowerCase()))
      if (selectedDrug.length === 1) {
        setSelectedDrugFromList(selectedDrug)
      }
    }
  }, [input])

  console.log(selectedDrugFromList)

  return (
    <div>
      <Head>
        <title>Simple LiverTox</title>
        <meta name="description" content="Quickly get hepatotoxicity." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Flex
          background="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(64,9,121,1) 50%, rgba(2,0,36,1) 100%)"
          minH="100vh"
          alignItems="center"
          direction="column"
          px={48}
          pt={36}
          pb={8}
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
            background="transparent"
            placeholder="Search"
            list="meds"
            onChange={(e) => {
              setInput(e.target.value)
            }}
          />
          <datalist
            id="meds"
          >
            {!medListLoading && input.length >= 3 && medList.filter(j => j.name.toLowerCase().includes(input.toLowerCase())).map(i => (
              <option
                key={i.href}
                value={i.name}
              />
            ))}

          </datalist>
          <Button
            onClick={handleSubmit}
            w={48}
            mb={12}
            colorScheme="blue"
          >
            Get Hepatotoxicity
          </Button>

          {isLoading && searchTerm.length > 3 && <Spinner color="#fff" />}

          {!isLoading && !error &&
            <>
              <Box
                color="#ffffff"
                mb={8}
                dangerouslySetInnerHTML={{ __html: hepatotoxicity }}
              >
                {/* {hepatotoxicity} */}
              </Box>
              <Button
                colorScheme="blue"
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