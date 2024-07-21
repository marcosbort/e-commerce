import type { NextPage } from 'next'
import Head from 'next/head'
import Product from '../components/ProductCard'
import ProductContainer from '../components/ProductContainer'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>e-Commerce</title>
        <meta name="description" content="e-commerce with Next.js and Typescript" />
        <link rel="icon" type="favicon/x-con" href="https://marcosbort.github.io/favicon-mb/favicon.png" />
      </Head>
      <ProductContainer />
    </>
  )
}

export default Home
