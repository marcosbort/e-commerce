import { ProductType } from '../types'
import styles from './Product.module.scss'

interface Props {
  product: ProductType
  onAddToCart: (productId: string) => void
}

export default function Product({ product, onAddToCart }: Props) {
  return (
    <>
      <div className={styles['Product']}>
        <h2 className={styles['Product__brand']}> {product.brand} </h2>
        <p className={styles['Product__description']}> {product.description} </p>
        <div className={styles['Product__etiquet']}>
          <p className={styles['Product__etiquet__price']}>{product.price}</p>
          <div></div>
        </div>
        <img className={styles['Product__image']} src={product.image} alt="foto" />
        <button className={styles['Product__btn-get']}
          onClick={() => onAddToCart(product.id)}
        > Agregar </button>
      </div>
    </>
  )
}
