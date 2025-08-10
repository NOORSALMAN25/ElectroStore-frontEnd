import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ProductReview from '../components/ProductReview'

const backendUrl = import.meta.env.VITE_BACKEND_URL

const Product = ({ user }) => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${backendUrl}/products/${id}`)
        setProduct(response.data)
      } catch (error) {
        console.error('Error in fetching one product:', error)
      }
    }
    fetchProduct()
  }, [])

  return (
    <div className="one-product-box">
      {product ? (
        <div className="one-product-in-a-page">
          <img src={product.image} alt={product.name} />
          <div className="product-details">
            <h2>{product.name}</h2>
            <h3>Price: ${product.price}</h3>
            <p>Category: {product.category}</p>
            <p>{product.description}</p>
            {user && user.role === 'admin' ? (
              <>
                <Link to={`/Products/${id}/edit`}>
                  <button>Edit</button>
                </Link>
                <Link to={`/Products/${id}/delete`}>
                  <button>Delete</button>
                </Link>
              </>
            ) : (
              <Link to="/Orders">
                <button>Add to Cart</button>
              </Link>
            )}
          </div>
          <div>
            <ProductReview />
          </div>
        </div>
      ) : (
        <div className="wait-message">
          <h1> Wait a second ... </h1>
        </div>
      )}
    </div>
  )
}

export default Product
