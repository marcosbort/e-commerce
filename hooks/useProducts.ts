import { useCallback, useEffect, useState } from 'react'
import { getPetFood } from '../services/petFoodServices'
import { Product } from '../types'

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])

  const getPetFoodProducts = useCallback(async () => {
    const petFoodProducts: Product[] = await getPetFood()
    setProducts(petFoodProducts)
  }, [])

  useEffect(() => {
    getPetFoodProducts()
  }, [])

  return products && products
}
