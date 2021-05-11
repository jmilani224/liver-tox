import { useState } from 'react'
import Head from 'next/head'
import Sidebar from '../components/sidebar'
import Main from '../components/main'
import { Flex } from '@chakra-ui/react'

export default function Home() {

  const [medArray, setMedArray] = useState([])
  return (
    <div>
      <Head>
        <title>Simple LiverTox</title>
        <meta name="description" content="Quickly get hepatotoxicity." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Flex
          minH="100vh"
        >
          <Sidebar medArray={medArray} setMedArray={setMedArray} />
          <Main medArray={medArray} />
        </Flex>
      </main>
    </div >
  )
}