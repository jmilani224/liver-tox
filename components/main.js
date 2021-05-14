import React from 'react'
import { Box, Heading, useToast, Icon, Flex, Tooltip, Link, HStack } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

const Main = ({ medArray }) => {
    const toast = useToast()
    if (medArray.length === 0) {
        return (
            <Flex
                bgColor="brand.lightGray"
                w="100%"
                minW={72}
                ml="24rem"
                justifyContent="center"
                alignItems="center"
            >
                <Box
                    as="span"
                    color="brand.darkGray"
                    fontSize="1.5rem"
                >
                    Add Medications
                </Box>
            </Flex>
        )
    }
    return (
        <Box
            bgColor="brand.lightGray"
            w="100%"
            ml="26rem"
            pt={8}
            minW={72}
        >
            <Box
                color="brand.darkBlue"
                position="absolute"
                top={4}
                right={12}
            >
                <ClipBoardIcon
                    w={12}
                    h={12}
                    p={2}
                    cursor="pointer"
                    bgColor="brand.lightestBlue"
                    borderRadius="50%"
                    onClick={() => {
                        const clipboardText = medArray.map(i => `${i.drugName}\n${i.hepatotoxicity}\n\n`).join("")
                        navigator.clipboard.writeText(clipboardText).then(function () {
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
                />
            </Box>
            {medArray.map(i => (
                <Box
                    key={i.id}
                    p={8}
                    m={12}
                    bgColor="#fff"
                    borderRadius="15px"
                    id={i.drugName}
                >
                    <Link
                        href={i.href}
                        _hover={{ textDecoration: "none" }}
                        isExternal
                        _focus={{ border: "none" }}
                    >
                        <HStack
                            mb={2}
                        >
                            <Heading
                                as="h3"
                                fontSize="1.2rem"

                                color="brand.darkBlue"
                            >
                                {i.drugName}
                            </Heading>
                            <ExternalLinkIcon color="brand.darkBlue" mx="2px" />
                        </HStack>
                    </Link>
                    <Box
                        fontSize="0.9rem"
                        color="brand.darkGray"
                    >{i.hepatotoxicity}</Box>
                </Box>
            ))}
        </Box>
    )
}

export default Main


const ClipBoardIcon = ({ ...props }) => (
    <Tooltip label="Copy all to clipboard." aria-label="A tooltip">
        <Icon
            fill="none"
            viewBox="0 0 128 128"
            viewBox="0 0 24 24"
            stroke="currentColor"
            {...props}
        >
            <path
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </Icon>
    </Tooltip>
)