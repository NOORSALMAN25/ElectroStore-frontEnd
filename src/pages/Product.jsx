import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ProductReview from '../components/ProductReview'
import { Link } from 'react-router-dom'
const backendUrl = import.meta.env.VITE_BACKEND_URL

const Product = ({ user }) => {
  const navigate = useNavigate()
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${backendUrl}/products/${productId}`)
        setProduct(response.data)
        const res = await axios.get(
          `${backendUrl}/products/${productId}/reviews`
        )
        setReviews(res.data)
      } catch (error) {
        console.error('Error in fetching one product:', error)
      }
    }
    fetchProduct()
  }, [productId])

  const addToCart = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    try {
      // geting the ongoing order
      const ordersResponse = await axios.get(`${backendUrl}/orders`)
      const userOngoingOrder = ordersResponse.data.find(
        (order) => order.user === user._id && order.status === 'ongoing'
      )

      //  product already in the order
      if (userOngoingOrder) {
        const existingItem = userOngoingOrder.items.find(
          (item) => item.product === productId
        )

        // Update quantity
        if (existingItem) {
          const updatedItems = userOngoingOrder.items.map((item) =>
            item.product === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )

          const newTotal = updatedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          )

          await axios.put(`${backendUrl}/orders/${userOngoingOrder._id}`, {
            ...userOngoingOrder,
            items: updatedItems,
            total: newTotal
          })
        } else {
          // Add new item to existing order
          const newItem = {
            product: productId,
            quantity: 1,
            price: product.price
          }

          const updatedItems = [...userOngoingOrder.items, newItem]
          const newTotal = updatedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          )

          await axios.put(`${backendUrl}/orders/${userOngoingOrder._id}`, {
            ...userOngoingOrder,
            items: updatedItems,
            total: newTotal
          })
        }
      } else {
        // new order
        const newOrder = {
          total: product.price,
          items: [
            {
              product: productId,
              quantity: 1,
              price: product.price
            }
          ],
          user: user._id
        }

        await axios.post(`${backendUrl}/orders`, newOrder)
      }

      navigate('/cart')
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`${backendUrl}/products/${productId}`, product)
      navigate('/products')
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }

  const buttons_auth = () => {
    return (
      <>
        {user && user.role === 'admin' ? (
          <>
            <Link to={`/Products/${productId}/EditProduct`}>
              <button>Edit</button>
            </Link>
            <Link to="/Products" onClick={handleDelete}>
              <button onClick={handleDelete}>Delete</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="">
              <button onClick={addToCart}>Add to Cart</button>
            </Link>
          </>
        )}
      </>
    )
  }

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
            <p>{buttons_auth()}</p>
          </div>
          <div>
            <ProductReview
              setReviews={setReviews}
              reviews={reviews}
              productId={productId}
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
