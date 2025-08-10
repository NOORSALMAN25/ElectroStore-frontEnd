import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, Link } from 'react-router-dom'
const Nav = ({ user, handleLogOut }) => {
  const { t, i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <nav className="navbar">
      <NavLink to="/">
        <div className="logo">Electro Store</div>
      </NavLink>

      <div className="nav-links">
        <button onClick={() => changeLanguage('en')}>EN</button>
        <button onClick={() => changeLanguage('ar')}>AR</button>
        <NavLink className="nav-item" to="/">
          {t('home')}
        </NavLink>

        {user ? (
          <>
            {user.role === 'admin' ? (
              <>
                <NavLink className="nav-item" to="/">
                  {t('addProduct')}
                </NavLink>
              </>
            ) : (
              <></>
            )}

            <NavLink className="nav-item" to="/products">
              {t('products')}
            </NavLink>
            <NavLink className="nav-item" to="/order">
              {t('cart')}
            </NavLink>
            <NavLink className="nav-item" to="/profile">
              {t('profile')}
            </NavLink>
            <Link className="nav-item" onClick={handleLogOut} to="/">
              {t('signout')}
            </Link>
          </>
        ) : (
          <>
            <NavLink className="nav-item" to="/login">
              {t('signin')}
            </NavLink>
            <NavLink className="nav-item" to="/signup">
              {t('signup')}
            </NavLink>
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
