import { useCallback, useEffect, useState } from 'react'
import { ProductType } from '../types'
import styles from './ProductContainer.module.scss'
import Product from './Product'
import Papa from 'papaparse'
import axios from 'axios'
import Spinner from './Spinner'
import { CartIcon, WhatsappIcon } from './Icons'
import { getPetFood } from '../services/petFoodServices' // move getProducts to Services
import { Modal, Text, Button } from "@deca-ui/react"
import Cart from './Cart'

export default function ProductContainer() {
  const [products, setProducts] = useState<ProductType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [cart, setCart] = useState<ProductType[]>([])
  const [openCartModal, setOpenCartModal] = useState<boolean>(false)
  const orderText = cart.reduce((message, product) => message.concat(''), '')

  const getProducts = useCallback(async () => {
    setIsLoading(true)
    const { data } = await axios.get(
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vQh35kh4HEg8CJd044vWDVgGa3laneMWv-1BxiG2xI09MByo4LEAdGxPpraA5wTbZw9CvJcDTb806vZ/pub?output=csv', { responseType: 'blob', }
    )
    Papa.parse(data, {
      header: true,
      complete: (results) => {
        const stringProducts = results.data as ProductType[]
        const productsWithNumberPrice = stringProducts.map((product) => ({ ...product, price: Number(product.price) }))
        return setProducts(productsWithNumberPrice)
      },
      error: (error) => error.message,
    })
    setIsLoading(false)
  }, [])

  console.log('Products:', products)

  // handleAddToCart Original:
  // const handleAddToCart = useCallback((productId: string) => {
  //   const product: ProductType = products.filter((product) => product.id === productId)[0]
  //   const productWithUnits = { ...product, units: 1 }
  //   const newCart: ProductType[] = [...cart, productWithUnits]
  //   setCart(newCart)
  //   sessionStorage.setItem('petFoodsCart', JSON.stringify(newCart))
  // }, [products, cart])

  const handleAddToCart = useCallback((productId: string) => {
    const product: ProductType = products.filter((product) => product.id === productId)[0]
    console.log('Included product:', cart.includes(product))
    if (cart.includes(product)) { // error is here (si lo incluye da false)
      const newCart = cart.map((product) => (
        product.units && product.id === productId
          ? { ...product, units: product.units++ }
          : { ...product }
      ))
      setCart(newCart as ProductType[])
      sessionStorage.setItem('petFoodsCart', JSON.stringify(newCart))
    } else {
      const productWithUnits = { ...product, units: 1 }
      const newCart: ProductType[] = [...cart, productWithUnits]
      setCart(newCart)
      sessionStorage.setItem('petFoodsCart', JSON.stringify(newCart))
    }
  }, [products, cart])

  const handleDeleteProduct = useCallback((productId: string) => {
    const newCart: ProductType[] = cart.filter((product) => product.id !== productId)
    setCart(newCart)
    sessionStorage.setItem('petFoodsCart', JSON.stringify(newCart))
    if (newCart.length === 0) {
      setOpenCartModal(false)
    }
  }, [cart])

  const handleResetCart = useCallback(() => {
    setCart([])
    setOpenCartModal(false)
  }, [])

  useEffect(() => {
    getProducts()
  }, [getProducts])

  useEffect(() => {
    const storageCart: ProductType[] = JSON.parse(sessionStorage.getItem('petFoodsCart')) // error: storageCart can be null
    storageCart && setCart(storageCart)
    console.log(storageCart) // inicia null
  }, [])

  console.log('Cart:', cart)

  return (
    <div className={styles['ProductContainer']}>
      <div className={styles['ProductContainer__header']}>
        <div className={styles['ProductContainer__header__wrap']}>
          <img className={styles['ProductContainer__header__logo']} src="https://marcosbort.github.io/server/images/pet-food/header-web-1.png" alt="logo" />
          <div className={styles['ProductContainer__header__buttons']}>
            <button className={styles['ProductContainer__header__buttons__btn-cart']}
              onClick={() => setOpenCartModal(true)}
            >
              <CartIcon />
              <span>{cart.length > 0 ? cart.reduce((count, product: ProductType) => count + product.units, 0) : 0}</span> {/* suma product.units de los product de Cart */}
            </button>
            <a href={`http://wa.me/1122222222?text=${encodeURIComponent(orderText)}`} target='_blank' rel='noreferrer'  >
              <button className={styles['ProductContainer__header__buttons__btn-to-complete']} >
                <WhatsappIcon />
                Completar Pedido
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className={styles['ProductContainer__product-box']}>
        {isLoading ? (
          <h2 className={styles['ProductContainer__loading']}>Loading...</h2>
        ) : (
          products?.map((product) => (
            <div key={product.id}>
              <Product
                product={product}
                onAddToCart={handleAddToCart}
              />
            </div>
          ))
        )}
      </div>
      <Modal
        closeButton open={openCartModal}
        setOpen={setOpenCartModal}
      >
        <Cart
          cart={cart}
          onDeleteProduct={handleDeleteProduct}
          onResetCart={handleResetCart}
        />
      </Modal>
    </div>
  )
}
