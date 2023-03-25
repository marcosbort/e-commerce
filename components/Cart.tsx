import { ProductType } from "../types";
import styles from './Cart.module.scss'

interface Props {
  cart: ProductType[]
  onDeleteProduct: (productId: string) => void
  onResetCart: () => void
}

export default function Cart({ cart, onDeleteProduct, onResetCart, }: Props) {

  return (
    <>
      <div className={styles['Cart']}>

        {cart.length === 0
          ? (
            <h3 className={styles['Cart__message']}>No hay nada por aquí!!!</h3>
          ) : (
            <>
              {cart.map((product) => (
                <div key={product.id} className={styles['Cart__details']}>
                  <img className={styles['Cart__details__image']} src={product.image} alt={product.brand} />
                  <p className={styles['Cart__details__brand-and-description']}><span>{product.brand}</span> - {product.description}</p>
                  <p className={styles['Cart__details__price']}>$ {product.price}</p>
                  <button
                    className={styles['Cart__details__btn-delete-product']}
                    onClick={() => onDeleteProduct(product.id)}
                  > Quitar </button>
                </div>
              ))}
              <button
                className={styles['Cart__btn-reset-cart']}
                onClick={() => onResetCart()}
              > Vaciar carrito </button>
            </>
          )}
      </div>
    </>
  )
}

/* Pending

crear algoritmo para agrupar los repetidos
add propertie product.units 'x1' o 'x8' etc. 
add total
add delete (individual) Y que la useCallback escuche 'cart'

*/