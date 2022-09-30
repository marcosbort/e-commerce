import { GetStaticProps } from 'next'
import { useCallback, useEffect, useState } from 'react'
import { Product } from '../types'

export default function ProductContainer() {
  const [products, setProducts] = useState<Product[]>()

  const getProducts = useCallback( async () => {
  const getProductsFromGoogleSheet = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQh35kh4HEg8CJd044vWDVgGa3laneMWv-1BxiG2xI09MByo4LEAdGxPpraA5wTbZw9CvJcDTb806vZ/pub?gid=0&single=true&output=csv')
  
  return getProductsFromGoogleSheet

  },[])

  useEffect(() => {
    getProducts()
  },[getProducts])

  return (
    <>
      <h2>ProductContainer</h2>
    </>
  )
}
