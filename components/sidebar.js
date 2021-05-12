import { useState, useEffect } from 'react'
import useMedList from '../hooks/useMedList'
import useMedSearch from '../hooks/useMedSearch'
import {
    Flex,
    Input,
    Button,
    Spinner,
    Box
} from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'

import Logo from '../components/logo'


const Sidebar = ({ medArray, setMedArray }) => {
    const [input, setInput] = useState("")
    const [dupError, setDupError] = useState(false)
    const [drugNameError, setDrugNameError] = useState(false)
    const [verifiedDrug, setVerifiedDrug] = useState("")
    const [medListLoading, medListError, medList] = useMedList()
    const [isLoading, isSuccess, isError, isIdle, data, error, refetch] = useMedSearch(input)

    const handleSubmit = async () => {
        const drugNameList = medArray.map(i => i.drugName)
        const fullDrugNameList = await medList.map(i => i.name)
        const selectedDrug = await medList.filter(i => i.name === input)
        if (drugNameList.includes(input)) {
            setDupError(true)
        }
        if (!fullDrugNameList.includes(input)) {
            setDrugNameError(true)
        } else {
            setVerifiedDrug(selectedDrug)
            refetch()
        }
    }

    const handleRemoveItem = (name) => {
        setMedArray(medArray.filter(i => i.drugName != name))
    }

    useEffect(() => {
        if (data && data.hepatotoxicity) {
            setMedArray([...medArray, { id: Math.floor(Math.random() * 999999), drugName: data.drugName, hepatotoxicity: data.hepatotoxicity }])
        }
        setInput("")
    }, [data])

    useEffect(() => {
        if (input.length === 0) {
            setDupError(false)
            setDrugNameError(false)
        }
    }, [input])

    return (
        <Box
            w="30vw"
            bgColor="#fff"
            minW={72}
            p={6}
            position="fixed"
            overflow="scroll"
            h="100vh"
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
                value={input}
                onClick={() => setInput("")}
            />
            <Box
                color="red"
                fontSize="x-small"
                mb={2}
                h={4}
            >
                {dupError && "You've already added that one."}
                {drugNameError && "Medication not found."}
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
                mb={8}
                colorScheme="blue"
            >
                {isLoading ? <Spinner /> : "Get Hepatotoxicity"}
            </Button>
            {medArray.map(i => (
                <Flex
                    key={i.id}
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
                        <a href={`#${i.drugName}`}>{i.drugName}</a>
                    </Flex>

                </Flex>

            ))}
        </Box>
    )
}

export default Sidebar
