import { ProductType } from '../types'
import styles from './Product.module.scss'

export default function Product({ id, brand, description, category, image, price }: ProductType) {
  return (
    <>
      <div className={styles['Product']}>
        <h2 className={styles['Product__brand']}> {brand} </h2>
        <p className={styles['Product__description']}> {description} </p>
        <div className={styles['Product__etiquet']}>
          <p className={styles['Product__etiquet__price']}>{price}</p>
          <div></div>
        </div>
        <img className={styles['Product__image']} src={image} alt="foto" />
        <button className={styles['Product__btn-get']}
        > Agregar </button>
      </div>
    </>
  )
}
