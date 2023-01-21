import { ProductType } from '../types'
import styles from './Product.module.scss'

export default function Product({id, brand, description, category, image, price}: ProductType) {
  return (
    <>
      <div className={styles['Product']}>
        <h2 className={styles['Product__brand']}> {brand} </h2>
        <p className={styles['Product__description']}> {description} </p>

        <div className={styles['Product__etiquet']}>
          <p className={styles['Product__etiquet__price']}>{price}</p>
          <div></div>
        </div>
        
        <div className={styles['Product__button-get']}>
          <a href="#" className={styles['Product__button-get__link']}>
            <span>AGREGAR</span>
          </a>
        </div>
        <img className={styles['Product__image']} src={image} alt="foto" />
      </div>
    </>
  )
}
