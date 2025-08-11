import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const backendUrl = import.meta.env.VITE_BACKEND_URL

const Cart = () => {
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  return (
    <>
      <div className="cart-container"></div>
    </>
  )
}

export default Cart
