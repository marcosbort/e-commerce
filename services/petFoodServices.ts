import { Product } from '../types'
import axios from 'axios'
import Papa from 'papaparse'

export const getPetFood = async () => {
  const { data } = await axios.get(
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQh35kh4HEg8CJd044vWDVgGa3laneMWv-1BxiG2xI09MByo4LEAdGxPpraA5wTbZw9CvJcDTb806vZ/pub?output=csv',
    { responseType: 'blob' }
  )
  Papa.parse(data, {
    header: true,
    complete: (results) => {
      const stringProducts = results.data as Product[]
      const productsWithNumberPrice = stringProducts.map((product) => ({
        ...product,
        price: Number(product.price),
      }))
      return productsWithNumberPrice
    },
    error: (error) => error.message,
  })
}
