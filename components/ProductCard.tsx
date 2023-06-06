import { Product } from '../types'
import styles from './ProductCard.module.scss'

interface Props {
  product: Product
  cart: Product[]
  onAddToCart: (productId: string) => void
}

export default function ProductCard({ product, cart, onAddToCart }: Props) {
  return (
    <>
      <div className={styles['ProductCard']}>
        <h2 className={styles['ProductCard__brand']}> {product.brand} </h2>
        <p className={styles['ProductCard__description']}> {product.description} </p>
        {
          cart.some(productCart => productCart.id === product.id) &&
          <h2 className={styles['ProductCard__units']}><span> {cart.filter(productCart => productCart.id === product.id)[0].units} </span></h2>
        }
        <div className={styles['ProductCard__etiquet']}>
          <p className={styles['ProductCard__etiquet__price']}>{product.price}</p>
          <div></div>
        </div>
        <img className={styles['ProductCard__image']} src={product.image} alt="photo" />
        <button className={styles['ProductCard__btn-get']}
          onClick={() => onAddToCart(product.id)}
        > Agregar </button>
      </div>
    </>
  )
}
