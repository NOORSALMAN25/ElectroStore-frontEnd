import { useState, useEffect } from 'react'
import axios from 'axios'
import ProductDetails from '../components/ProductDetails'
const port = import.meta.env.VITE_BACKEND_URL
const Products = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${port}/products`)
        setProducts(response)
        console.log('Products fetched:', products)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="products-list">
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((product) => (
          <ProductDetails key={product._id} product={product} />
        ))
      )}
    </div>
  )
}

export default Products
