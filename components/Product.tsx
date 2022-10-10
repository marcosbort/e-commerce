import styles from './Product.module.scss'

export default function Product() {
  return (
    <>
      <div className={styles['Product']}>
        <h2 className={styles['Product__brand']}> Dog Chow </h2>
        <p className={styles['Product__description']}>Cachorros 21kg</p>

        <div className={styles['Product__etiquet']}>
          <p className={styles['Product__etiquet__price']}>8.500</p>
          <div></div>
        </div>
        
        <div className={styles['Product__button-get']}>
          <a href="#" className={styles['Product__button-get__link']}>
            <span>START PROJECT</span>
          </a>
        </div>
        {/* <img className="card-image" src="" alt="foto" /> */}
        <img className={styles['Product__image']} src="https://marcosbort.github.io/server/images/pet-food/tiernitos-adultos.jpg" alt="foto" />
      </div>
    </>
  )
}
