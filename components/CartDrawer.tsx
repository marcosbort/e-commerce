import Cart from './Cart'
import styles from './CartDrawer.module.scss'
import { Product } from "../types";

declare type Props = {
  isOpen: boolean
  onIsOpen: () => void
  cart: Product[]
  onDeleteProduct: (productId: string) => void
  onResetCart: () => void
}

export default function CartDrawer({ isOpen, onIsOpen, cart, onDeleteProduct, onResetCart, }: Props) {

  return (
    <div className={styles['CartDrawer']}>
      <div className={`${styles['CartDrawer__backdrop']} ${isOpen ? styles['CartDrawer__backdrop--open'] : ''}`} onClick={onIsOpen} />
      <div className={`${styles['CartDrawer__container']} ${isOpen ? styles['CartDrawer__container--open'] : ''}`}>
        <div className={styles['CartDrawer__body']}>
          <div className={styles['CartDrawer__header']}>
            <h2>Cart</h2>
            <button className={styles['CartDrawer__header__close-btn']} onClick={onIsOpen} > Close </button>
          </div>
          <div className={styles['CartDrawer__content']}>
            <Cart
              cart={cart}
              onDeleteProduct={onDeleteProduct}
              onResetCart={onResetCart}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
