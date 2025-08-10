import { useState, useEffect } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'
const backendUrl = import.meta.env.VITE_BACKEND_URL
const Products = ({ user }) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/products`)
        setProducts(response.data)
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
          <ProductCard key={product._id} product={product} />
        ))
      )}
    </div>
  )
}

export default Products
