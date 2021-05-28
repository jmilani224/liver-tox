import { useState, useEffect, useRef } from 'react'
import useMedList from '../hooks/useMedList'
import useMedSearch from '../hooks/useMedSearch'
import {
    Flex,
    Input,
    Button,
    Spinner,
    Box,
    InputGroup,
    InputLeftElement,
    Stack,
    useOutsideClick
} from '@chakra-ui/react'
import { SmallCloseIcon, SearchIcon } from '@chakra-ui/icons'

import Logo from '../components/logo'


const Sidebar = ({ medArray, setMedArray }) => {

    //input
    const [input, setInput] = useState("")
    const [dupError, setDupError] = useState(false)
    const [drugNameError, setDrugNameError] = useState(false)

    //dropdown
    const [showDropdown, setShowDropdown] = useState(false)
    const [active, setActive] = useState(0)
    const [selected, setSelected] = useState()
    const dropdown = useRef()
    useOutsideClick({
        ref: dropdown,
        handler: () => setShowDropdown(false)
    })

    //data
    const [medListLoading, medListError, medList] = useMedList()
    const [isLoading, isSuccess, isError, isIdle, data, error, refetch] = useMedSearch(selected)

    const handleSubmit = async () => {
        const drugNameList = medArray.map(i => i.drugName)
        const fullDrugNameList = await medList.map(i => i.name)
        if (drugNameList.includes(input)) {
            setDupError(true)
        }
        if (!fullDrugNameList.includes(input)) {
            setDrugNameError(true)
        } else {
            refetch()
        }
    }

    const handleRemoveItem = (name) => {
        setMedArray(medArray.filter(i => i.drugName != name))
    }

    useEffect(() => {
        if (data && data.hepatotoxicity) {
            setMedArray([{ id: Math.floor(Math.random() * 999999), drugName: data.drugName, hepatotoxicity: data.hepatotoxicity, href: data.href }, ...medArray])
        }
        setInput("")
    }, [data])

    useEffect(() => {
        if (input.length === 0) {
            setDupError(false)
            setDrugNameError(false)
        }
    }, [input])

    useEffect(() => {
        if (medList && input.length > 2) {
            setShowDropdown(true)
        } else {
            setShowDropdown(false)
        }
    }, [medList, input])

    useEffect(() => {
        if (selected) setShowDropdown(false)

    }, [selected])

    return (

        <Flex
            position="sticky"
            top="0"
            overflow="scroll"
            direction="column"
            bgColor="#fff"
            p={6}
            w={72}
            minW={72}
            h="100vh"
        >

            <Logo />
            <InputGroup
                mt={8}
                position="relative"
            >
                <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="brand.midBlue" />}
                />
                <Input
                    w={48}
                    background="transparent"
                    placeholder="Search LiverTox"
                    color="brand.darkGray"
                    onChange={(e) => {
                        setInput(e.target.value)
                    }}
                    value={input}
                    onClick={() => {
                        setInput("")
                        setSelected(null)
                        setActive(0)
                    }}
                    onKeyDown={(e) => {
                        switch (e.key) {
                            case "ArrowDown": {
                                e.preventDefault()
                                if (active + 1 < medList.length) {
                                    setActive(active + 1)
                                }
                                break
                            }
                            case "ArrowUp": {
                                e.preventDefault()
                                if (active - 1 >= 0) {
                                    setActive(active - 1)
                                }
                                break
                            }
                            case "Enter": {
                                setInput(medList.filter(j => j.name.toLowerCase().includes(input.toLowerCase()))[active].name)
                                setSelected(medList.filter(j => j.name.toLowerCase().includes(input.toLowerCase()))[active])
                                setShowDropdown(false)
                                break
                            }
                        }
                    }
                    }
                />
                {medListLoading && showDropdown &&

                    <Flex
                        spacing="0"
                        w={48}
                        position="absolute"
                        mt={10}
                        bg="#fff"
                        borderBottomRadius="15px"
                        boxShadow="rgb(125 127 129 / 17%) 0px 17px 56px"
                        zIndex="dropdown"
                        ref={dropdown}
                        h={20}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Spinner color="brand.darkBlue" />
                    </Flex>
                }

                {!medListLoading && showDropdown &&
                    <Stack
                        spacing="0"
                        w={48}
                        position="absolute"
                        mt={10}
                        bg="#fff"
                        borderBottomRadius="15px"
                        boxShadow="rgb(125 127 129 / 17%) 0px 17px 56px"
                        zIndex="dropdown"
                        ref={dropdown}
                    >
                        {medList.filter(j => j.name.toLowerCase().includes(input.toLowerCase())).map((item, index) => (
                            <Flex
                                color="brand.darkGray"
                                cursor="pointer"
                                bgColor={active === index && "brand.lightestBlue"}
                                key={item.href}
                                onMouseOver={() => setActive(index)}
                                onClick={() => {
                                    setInput(item.name)
                                    setSelected(item)
                                    setShowDropdown(false)
                                }}
                                p={3}
                            >
                                {item.name}
                            </Flex>
                        ))}
                    </Stack>
                }
            </InputGroup>

            <Box
                color="red"
                fontSize="x-small"
                mb={2}
                h={4}
            >
                {dupError && "You've already added that one."}
                {drugNameError && "Medication not found."}
            </Box>

            <Button
                onClick={handleSubmit}
                w={48}
                mb={8}
                colorScheme="blue"
            >
                {isLoading ? <Spinner /> : "Get Hepatotoxicity"}
            </Button>
            {
                medArray.map(i => (
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

                ))
            }
        </Flex >
    )
}

export default Sidebar
