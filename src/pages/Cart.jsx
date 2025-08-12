import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const backendUrl = import.meta.env.VITE_BACKEND_URL

const Cart = ({ user }) => {
  let navigate = useNavigate()
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch data
  useEffect(() => {
    if (!user) return
    const fetchCart = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${backendUrl}/cart/${user.id}`)
        setCart(res.data)
      } catch (err) {
        setError('Failed to fetch cart')
      } finally {
        setLoading(false)
      }
    }
    fetchCart()
  }, [user])

  // Increase quantity by 1
  const incrementQuantity = (itemId) => {
    const updatedItems = cart.items.map((item) => {
      if (item._id === itemId) {
        return { ...item, quantity: item.quantity + 1 }
      }
      return item
    })
    setCart({ ...cart, items: updatedItems })
  }

  // Decrease quantity o by 1
  const decrementQuantity = (itemId) => {
    const updatedItems = cart.items.map((item) => {
      if (item._id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 }
      }
      return item
    })
    setCart({ ...cart, items: updatedItems })
  }

  // Remove item from cart
  const removeItem = async (itemId) => {
    try {
      await axios.delete(`${backendUrl}/cart/${user.id}/${itemId}`)
      // Remove locally
      setCart({
        ...cart,
        items: cart.items.filter((item) => item._id !== itemId)
      })
    } catch (err) {
      throw new Error('Failed to remove item from cart')
    }
  }

  // Save updated cart
  const saveCart = async () => {
    try {
      const total = cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
      const updatedCart = {
        ...cart,
        total
      }

      await axios.put(`${backendUrl}/orders/${cart._id}`, updatedCart)
    } catch (err) {
      throw new Error('Failed to save cart')
    }
  }

  const checkout = async () => {
    try {
      await axios.delete(`${backendUrl}/cart/${user.id}`)
      setCart({ ...cart, items: [] })
      navigate('/checkout')
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <p>Loading cart...</p>
  if (error) return <p>{error}</p>
  if (!cart || cart.items.length === 0) return <p>Your cart is empty.</p>

  return (
    <section className="cart-wrapper">
      <h1 className="cart-heading">Shopping Cart</h1>
      <ul className="cart-list">
        {cart.items.map((item) => (
          <li key={item._id} className="cart-item-card">
            <img src={item.image} alt={item.name} className="cart-item-photo" />
            <div className="cart-item-info">
              <h3 className="cart-item-title">{item.name}</h3>
              <p className="cart-item-cost">Price: ${item.price.toFixed(2)}</p>
              <div className="cart-item-quantity-controls">
                Quantity:
                <button
                  className="quantity-control-btn decrement"
                  onClick={() => decrementQuantity(item._id)}
                >
                  -
                </button>
                <span style={{ margin: '0 10px' }} className="quantity-display">
                  {item.quantity}
                </span>
                <button
                  onClick={() => incrementQuantity(item._id)}
                  className="quantity-control-btn increment"
                >
                  +
                </button>
              </div>
              <button
                className="cart-item-remove-btn"
                onClick={() => removeItem(item._id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="cart-footer">
        <h3 className="cart-total-price">
          Total: $
          {cart.items
            .reduce((sum, item) => sum + item.price * item.quantity, 0)
            .toFixed(2)}
        </h3>

        <button className="cart-save-btn" onClick={saveCart}>
          Save Cart
        </button>
        <button onClick={checkout}>Buy</button>
      </div>
    </section>
  )
}
export default Cart
