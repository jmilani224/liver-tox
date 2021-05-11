import React from 'react'
import { Box, Flex } from '@chakra-ui/react'

export const Liver = () => {

    const image = `<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 40 40\"><path fill=\"#98ccfd\" d=\"M25.632,22.5c-0.109,0-0.221-0.005-0.334-0.017c-0.345-0.036-0.745-1.373-0.614-3.468 c0.076-1.231-2.287-10.841-3.135-12.98c0.729-1.058,3.843-1.682,5.739-2.063C27.8,3.87,28.267,3.776,28.65,3.686 C31.994,2.899,34.348,2.5,35.647,2.5c0.228,0,1.005,0.039,1.465,0.544c0.309,0.338,0.434,0.845,0.372,1.507 c-0.002,12.447-6.873,15.896-10.176,17.552C27.024,22.24,26.389,22.5,25.632,22.5L25.632,22.5z\"/><path fill=\"#4788c7\" d=\"M35.648,3c0.362,0,0.839,0.1,1.096,0.381c0.209,0.23,0.292,0.608,0.244,1.124l-0.004,0.046v0.046 c0,12.093-6.685,15.447-9.898,17.06l-0.036,0.019C26.842,21.773,26.289,22,25.631,22c-0.046,0-0.092-0.001-0.139-0.003 c-0.177-0.312-0.409-1.353-0.309-2.95c0.07-1.122-2.012-10.002-3.076-12.901c0.856-0.795,3.904-1.407,5.279-1.683 c0.518-0.104,0.991-0.199,1.38-0.291C32.883,3.203,34.781,3,35.648,3 M35.648,2c-1.486,0-4.14,0.5-7.112,1.199 c-2.123,0.5-6.793,1.099-7.536,2.797c0.212,0.2,3.29,11.289,3.184,12.988s0.106,3.896,1.061,3.996 c0.13,0.014,0.259,0.02,0.385,0.02c0.795,0,1.478-0.247,1.844-0.419c3.184-1.598,10.508-5.195,10.508-17.983 C38.195,2.3,36.391,2,35.648,2L35.648,2z\"/><g><path fill=\"#b6dcfe\" d=\"M5.339,37.5l-0.075-0.186C4.795,35.937,2.5,28.892,2.5,22.8C2.5,9.501,13.249,6.25,19.657,5.497 c0.432,0.003,1.688,0.129,2.331,0.5l0.056,0.056c0.101,0.122,0.28,0.303,0.495,0.52c1.581,1.594,5.283,5.327,3.469,14.227 c-0.25,1.374-0.909,3.376-2.015,4.907C16.237,35.451,9.817,37.5,5.8,37.5H5.339z\"/><path fill=\"#4788c7\" d=\"M19.654,6.001c0.489,0.009,1.507,0.131,2.026,0.397c0.13,0.148,0.302,0.323,0.504,0.527 c1.525,1.537,5.096,5.137,3.33,13.796c-0.238,1.309-0.869,3.229-1.898,4.656C15.971,34.984,9.708,37,5.8,37H5.686 C5.146,35.395,3,28.65,3,22.8C3,9.93,13.404,6.749,19.654,6.001 M19.599,5C14.499,5.6,2,8.4,2,22.8c0,6.7,2.7,14.4,2.8,14.7L5,38 h0.8c4.3,0,10.799-2.2,18.599-12c1.3-1.8,1.9-4,2.1-5.1c2.1-10.3-3-13.9-4.1-15.2c-0.1-0.1-0.1-0.1-0.1-0.1 C21.499,5.1,19.999,5,19.599,5L19.599,5z\"/></g></svg>`
    return (
        <div dangerouslySetInnerHTML={{ __html: image }}></div>
    )
}

const Logo = () => (
    <Flex alignItems="center">
        <Box h={14} w={14}>
            <Liver />
        </Box>
        <Box
            as="span"
            lineHeight={5}
            fontSize="1.2rem"
            color="brand.darkGray"
            fontWeight="500"
        >Simple<br />LiverTox</Box>
    </Flex>
)

export default Logo
