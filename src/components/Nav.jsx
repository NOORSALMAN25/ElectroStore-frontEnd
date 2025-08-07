import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Nav = ({ user, handleLogOut }) => {
  let userOptions
  if (user) {
    userOptions = (
      <>
        <Link onClick={handleLogOut} to="/">
          Sign Out
        </Link>
      </>
    )
  }

  const publicOptions = (
    <>
      <Link to="/">Home</Link>
      <Link to="/signup">Register</Link>
      <Link to="/login">Login</Link>
    </>
  )

  return (
    <header>
      {user ? <h3>Welcome, {user.name}!</h3> : null}
      <nav>{user ? userOptions : publicOptions}</nav>
    </header>
  )
}

export default Nav
