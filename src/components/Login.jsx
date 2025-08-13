import { useState } from 'react'
import { SignInUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Login = ({ setUser }) => {
  const { t, i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }
  let navigate = useNavigate()
  const initialState = { email: '', password: '' }
  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const userData = await SignInUser(formValues)
    setFormValues(initialState)
    setUser(userData)
    navigate('/')
  }

  return (
    <div>
      <h2 className="title-info">{t('signin_title')}</h2>
      <form className="first-sign" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">{t('signin_email_label')}</label>
          <input
            name="email"
            type="email"
            placeholder={t('signin_email_placeholder')}
            onChange={handleChange}
            value={formValues.email}
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="password">{t('signin_password_label')}</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={formValues.password}
            required
            autoComplete="off"
          />
        </div>
        <button disabled={!formValues.email || !formValues.password}>
          {t('signin_button')}
        </button>
      </form>
    </div>
  )
}

export default Login
