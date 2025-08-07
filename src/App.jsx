import { Routes, Route } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav'
import Home from './pages/Home'
import AddProduct from './pages/AddProduct'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import ProductDetails from './components/ProductDetails'
const App = () => {
  return (
    <>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/AddProduct" element={<AddProduct />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Products/:id" element={<ProductDetails />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/Profile" element={<Profile />} /> */}
        </Routes>
      </div>
    </>
  )
}

export default App
