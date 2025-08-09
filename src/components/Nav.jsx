import { NavLink } from 'react-router-dom'
const Nav = () => {
  return (
    <nav className="navbar">
      <NavLink to="/">
        <div className="logo"> Elecro store</div>
      </NavLink>
      <div className="nav-links">
        <NavLink className="nav-item" to="/">
          Home
        </NavLink>
        <NavLink className="nav-item" to="/products">
          products
        </NavLink>
        <NavLink className="nav-item" to="/order">
          Cart
        </NavLink>
        <NavLink className="nav-item" to="/profile">
          Profile
        </NavLink>
      </div>
    </nav>
  )
}

export default Nav
