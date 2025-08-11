import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const backendUrl = import.meta.env.VITE_BACKEND_URL

const Cart = ({ user }) => {
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

  if (loading) return <p>Loading cart...</p>
  if (error) return <p>{error}</p>
  if (!cart || cart.items.length === 0) return <p>Your cart is empty.</p>

  return (
    <div>
      <h2>Your Cart</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cart.items.map((item) => (
          <li key={item._id} style={{ marginBottom: 20 }}>
            <img src={item.image} alt={item.name} width={100} />
            <div>
              <h4>{item.name}</h4>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>
                Quantity:
                <button onClick={() => decrementQuantity(item._id)}>-</button>
                <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                <button onClick={() => incrementQuantity(item._id)}>+</button>
              </p>
              <button onClick={() => removeItem(item._id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>

      <h3>
        Total: $
        {cart.items
          .reduce((sum, item) => sum + item.price * item.quantity, 0)
          .toFixed(2)}
      </h3>

      <button onClick={saveCart}>Save Cart</button>
    </div>
  )
}
export default Cart
