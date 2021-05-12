import { extendTheme } from "@chakra-ui/react"
// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
    colors: {
        brand: {
            lightestBlue: "#c4e3ff",
            lightBlue: "#b6dcfe",
            midBlue: "#98ccfd",
            darkBlue: "#4788c7",
            lightGray: "#fafafa", // bg
            darkGray: "#777d84", // text
        },
    },
    fonts: {
        body: 'Fira Sans, sans-serif',
        heading: 'Fira Sans, sans-serif',
    }
})

export default theme