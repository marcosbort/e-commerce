import { useCallback, useEffect, useState } from 'react'
import { Product } from '../types'
import Papa from 'papaparse'
import axios from 'axios'

export default function ProductContainer() {
  const [products, setProducts] = useState<Product[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getProducts = useCallback(async () => {
    setIsLoading(true)
    const { data } = await axios.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vQh35kh4HEg8CJd044vWDVgGa3laneMWv-1BxiG2xI09MByo4LEAdGxPpraA5wTbZw9CvJcDTb806vZ/pub?gid=0&single=true&output=csv', {
      responseType: 'blob'
    })
    Papa.parse(data, {
      header: true,
      complete: (results) => setProducts(results.data as Product[]),
      error: (error) => error.message,
    })
    setIsLoading(false)
  }, [])

  console.log(products)

  useEffect(() => {
    getProducts()
  }, [getProducts])

  return (
    <>
      {isLoading
        ? (
          <h2>Loading...</h2>
        ) : (
          <h1>ProductContainer</h1>
        )}
    </>
  )
}
