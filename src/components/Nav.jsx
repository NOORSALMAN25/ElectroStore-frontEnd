import { NavLink } from 'react-router-dom'
const Nav = () => {
  return (
    <nav className="navbar">
      <NavLink to="/">
        <div className="logo">🎇 Elecro store</div>
      </NavLink>
      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
      </div>
    </nav>
  )
}

export default Nav
