import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { CheckSession } from './services/Auth'
import './App.css'
import Nav from './components/Nav'
import Home from './pages/Home'
import AddProduct from './pages/AddProduct'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import ProductCard from './components/ProductCard'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Product from './pages/Product'
import EditProduct from './pages/EditProduct'
const App = () => {
  const [user, setUser] = useState(null)

  const checkToken = async () => {
    const userData = await CheckSession()
    setUser(userData)
  }

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <>
      <div>
        <Nav user={user} handleLogOut={handleLogOut} />
        <main>
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/AddProduct" element={<AddProduct />} />
            <Route path="/Products" element={<Products user={user} />} />
            <Route
              path="/Products/:productId"
              element={<Product user={user} />}
            />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/Profile" element={<Profile user={user} />} />
            <Route
              path="/Products/:productId/EditProduct"
              element={<EditProduct />}
            />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
