import { Product } from "../types";
import styles from './Cart.module.scss'
import { DeleteIcon } from "./Icons";

interface Props {
  cart: Product[]
  onDeleteProduct: (productId: string) => void
  onResetCart: () => void
}

export default function Cart({ cart, onDeleteProduct, onResetCart, }: Props) {
  return (
    <>
      <div className={styles['Cart']}>
        {cart.length === 0
          ? (
            <h3 className={styles['Cart__message']}>Nada por aquí!!!</h3>
          ) : (
            <>
              {cart.map((product, i) => (
                <div key={i} className={styles['Cart__details']}>
                  <img className={styles['Cart__details__image']} src={product.image} alt={product.brand} />
                  <p className={styles['Cart__details__brand-and-description']}><span>{product.brand}</span> - {product.description}</p>
                  <p className={styles['Cart__details__units']}>x {product.units}</p>
                  <p className={styles['Cart__details__price']}>$ {product.price * product.units}</p>
                  <button
                    className={styles['Cart__details__btn-delete-product']}
                    onClick={() => onDeleteProduct(product.id)}
                  > <DeleteIcon /> </button>
                </div>
              ))}
              <div className={styles['Cart__footer-container']}>
                <button
                  className={styles['Cart__btn-reset-cart']}
                  onClick={() => onResetCart()}
                > Vaciar carrito </button>
                <p className={styles['Cart__total']}>
                  Total: $ {cart.reduce((count, product: Product) => count + (product.price * product.units), 0)}
                </p>
              </div>
            </>
          )}
      </div>
    </>
  )
}
