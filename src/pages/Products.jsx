import { useState, useEffect } from 'react'
import axios from 'axios'
import ProductDetails from '../components/ProductDetails'
// const n = import.meta.env.VITE_BACKEND_URL
const Products = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3010/products`)
        setProducts(response.data)
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
          <a
            key={product._id}
            href={`/products/${product._id}`}
            className="product-item"
          >
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
          </a>
        ))
      )}
    </div>
  )
}

export default Products
