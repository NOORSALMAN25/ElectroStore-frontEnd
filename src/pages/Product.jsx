import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ProductReview from '../components/ProductReview'

const backendUrl = import.meta.env.VITE_BACKEND_URL

const Product = ({ user }) => {
  const { id } = useParams()
  console.log(id)

  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${backendUrl}/products/${id}`)
        setProduct(response.data)
        const res = await axios.get(`${backendUrl}/products/${id}/reviews`)
        console.log(res.data)
        setReviews(res.data)
      } catch (error) {
        console.error('Error in fetching one product:', error)
      }
    }
    fetchProduct()
  }, [])

  // useEffect(() => {
  //   if (id) return
  //   setLoading(true)
  //   setError(null)
  //   const res = axios.get(`${backendUrl}/products/${id}/reviews`)
  //   console.log(res.data)
  //   // .then((res) => setReviews(res.data))
  //   // .catch((err) => setError('Failed to load reviews'))
  //   // .finally(() => setLoading(false))
  // }, [])

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
            {/* if (condition) {}else{} */}
          </div>
          <div>
            <ProductReview
              setReviews={setReviews}
              reviews={reviews}
              productId={id}
              user={user}
            />
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
