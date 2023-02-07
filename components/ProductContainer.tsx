import { useCallback, useEffect, useState } from 'react'
import { ProductType } from '../types'
import styles from './ProductContainer.module.scss'
import Product from './Product'
import Papa from 'papaparse'
import axios from 'axios'
import Spinner from './Spinner'
import { WhatsappIcon } from './Icons'
import { getPetFood } from '../services/petFoodServices' // move getProducts to Services

export default function ProductContainer() {
  const [products, setProducts] = useState<ProductType[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [cart, setCart] = useState<ProductType[]>([])

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

  const addToCart = useCallback(() => {
    // method to add to cart

    // const changedCart = [currentProduct, ...cart]
    // setCart(changedCart)
  }, [])

  useEffect(() => {
    getProducts()
  }, [getProducts])

  return (
    <div className={styles['ProductContainer']}>
      <div className={styles['ProductContainer__header']}>
        <div className={styles['ProductContainer__header__wrap']}>
          <img className={styles['ProductContainer__header__logo']} src="https://marcosbort.github.io/server/images/pet-food/header-web-1.png" alt="foto" />
          <button className={styles['ProductContainer__header__btn-to-complete']} >
            <WhatsappIcon />
            Completar Pedido
          </button>
        </div>
      </div>
      <div className={styles['ProductContainer__product-box']}>
        {isLoading ? (
          <h2 className={styles['ProductContainer__loading']}>Loading...</h2>
        ) : (
          products?.map((product) => (
            <div key={product.id}>
              <Product
                id={product.id}
                brand={product.brand}
                description={product.description}
                category={product.category}
                image={product.image}
                price={product.price}
              // addToCart={addToCart}
              />
            </div>
          ))
        )}
      </div>
    </div>
  )
}
