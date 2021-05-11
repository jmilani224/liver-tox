import { useState, useEffect } from 'react'
import useMedList from '../hooks/useMedList'
import useMedSearch from '../hooks/useMedSearch'
import {
    Heading,
    Flex,
    Input,
    Button,
    Spinner,
    Box,
    useToast,
} from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'

import Logo from '../components/logo'


const Sidebar = ({ medArray, setMedArray }) => {
    const [input, setInput] = useState("")
    const [dupError, setDupError] = useState(false)
    const [medListLoading, medListError, medList] = useMedList()
    const [isLoading, isSuccess, isError, isIdle, data, error, refetch] = useMedSearch(input)

    const handleSubmit = () => {
        const drugNameList = medArray.map(i => i.drugName)
        if (drugNameList.includes(input)) {
            setDupError(true)
        } else {
            refetch()
        }
    }

    const handleRemoveItem = (name) => {
        setMedArray(medArray.filter(i => i.drugName != name))
    }

    useEffect(() => {
        if (data && data.hepatotoxicity) {
            setMedArray([...medArray, { drugName: data.drugName, text: data.hepatotoxicity }])
        }
    }, [data])

    useEffect(() => {
        if (input.length === 0) {
            setDupError(false)
        }
    }, [input])

    return (
        <Box
            w="30vw"
            bgColor="#fff"
            minW={72}
            m={6}
        >
            <Logo />

            <Input
                w={48}
                mt={8}
                background="transparent"
                placeholder="Search LiverTox"
                list="meds"
                onChange={(e) => {
                    setInput(e.target.value)
                }}
            />

            <Box
                color="red"
                fontSize="x-small"
                mb={2}
                h={4}
            >
                {dupError && "You've already added that one."}
            </Box>
            <datalist
                id="meds"
            >
                {!medListLoading &&
                    input.length >= 3 &&
                    medList.filter(j => j.name.toLowerCase().includes(input.toLowerCase())).map(i => (
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
                {isLoading ? <Spinner /> : "Get Hepatotoxicity"}
            </Button>
            {medArray.map(i => (
                <Flex
                    key={i.drugName}
                    direction="column"
                    color="brand.darkGray"
                >
                    <Flex
                        alignItems="center"
                    >
                        <SmallCloseIcon
                            bgColor="brand.darkBlue"
                            color="white"
                            borderRadius="50%"
                            mr={2}
                            onClick={() => handleRemoveItem(i.drugName)}
                            cursor="pointer"
                        />
                        {i.drugName}
                    </Flex>

                </Flex>

            ))}
        </Box>
    )
}

export default Sidebar
