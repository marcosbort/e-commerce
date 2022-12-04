import { useCallback, useEffect, useState } from 'react'
import { ProductType } from '../types'
import Papa from 'papaparse'
import axios from 'axios'

export const getProducts = async () => {
  const { data } = await axios.get(
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQh35kh4HEg8CJd044vWDVgGa3laneMWv-1BxiG2xI09MByo4LEAdGxPpraA5wTbZw9CvJcDTb806vZ/pub?gid=0&single=true&output=csv',
    {
      responseType: 'blob',
    }
  )
  const products = Papa.parse(data, {
    header: true,
    complete: (results) => results.data as ProductType[],
    error: (error) => error.message,
  })
  return products
}
