import { NavLink, Link } from 'react-router-dom'
const Nav = ({ user, handleLogOut }) => {
  return (
    <nav className="navbar">
      <NavLink to="/">
        <div className="logo">Electro Store</div>
      </NavLink>

      <div className="nav-links">
        <NavLink className="nav-item" to="/">
          Home
        </NavLink>

        {user ? (
          <>
            {user.role === 'admin' ? (
              <>
                <NavLink className="nav-item" to="/">
                  Add Product
                </NavLink>
              </>
            ) : (
              <></>
            )}

            <NavLink className="nav-item" to="/products">
              Products
            </NavLink>
            <NavLink className="nav-item" to="/order">
              Cart
            </NavLink>
            <NavLink className="nav-item" to="/profile">
              Profile
            </NavLink>
            <Link className="nav-item" onClick={handleLogOut} to="/">
              Sign Out
            </Link>
          </>
        ) : (
          <>
            <NavLink className="nav-item" to="/login">
              Sign In
            </NavLink>
            <NavLink className="nav-item" to="/signup">
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
