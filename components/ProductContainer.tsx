import { useCallback, useEffect, useState } from 'react'
import { ProductType } from '../types'
import styles from './ProductContainer.module.scss'
import Product from './Product'
import Papa from 'papaparse'
import axios from 'axios'
import Image from 'next/image'
import Spinner from './Spinner'

export default function ProductContainer() {
  const [products, setProducts] = useState<ProductType[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getProducts = useCallback(async () => {
    setIsLoading(true)
    const { data } = await axios.get(
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vQh35kh4HEg8CJd044vWDVgGa3laneMWv-1BxiG2xI09MByo4LEAdGxPpraA5wTbZw9CvJcDTb806vZ/pub?gid=0&single=true&output=csv', { responseType: 'blob', }
    )
    Papa.parse(data, {
      header: true,
      complete: (results) => setProducts(results.data as ProductType[]),
      error: (error) => error.message,
    })
    setIsLoading(false)
  }, [])

  console.log(products)

  useEffect(() => {
    getProducts()
  }, [getProducts])

  return (
    <div className={styles['ProductContainer']}>
      <img className={styles['ProductContainer__header']} src="https://marcosbort.github.io/server/images/pet-food/header-web-1.png" alt="foto" />
      <div className={styles['ProductContainer__product-box']}>
        {isLoading ? (
          <h2 className={styles['ProductContainer__loading']}>Loading...</h2>
          ) : (
            products?.map((product) => (
              <div key={product.id}>
              <Product
                key={product.id}
                id={product.id}
                brand={product.brand}
                description={product.description}
                category={product.category}
                image={product.image}
                price={product.price}
              />
            </div>
          ))
          )}
      </div>
      <Spinner />
    </div>
  )
}
