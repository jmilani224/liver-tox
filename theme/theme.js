import { extendTheme } from "@chakra-ui/react"
// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
    colors: {
        brand: {
            lightBlue: "#b6dcfe",
            midBlue: "#98ccfd",
            darkBlue: "#4788c7"
        },
    },
    fonts: {
        body: 'Fira Sans, sans-serif',
        heading: 'Fira Sans, sans-serif',
    }
})

export default theme