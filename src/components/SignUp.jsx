import { useState } from 'react'
import { RegisterUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
const SignUp = () => {
  const { t, i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  let navigate = useNavigate()

  const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const [formValues, setFormValues] = useState(initialState)
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await RegisterUser(formValues)
    setFormValues(initialState)
    navigate('/login')
  }

  return (
    <div>
      <h2 className="title-info">{t('signup_title')}</h2>
      <form className="first-sign" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">{t('signup_name_label')}</label>
          <input
            name="name"
            type="text"
            placeholder={t('signup_name_placeholder')}
            onChange={handleChange}
            value={formValues.name}
            required
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="email">{t('signup_email_label')}</label>
          <input
            name="email"
            type="email"
            placeholder={t('signup_email_placeholder')}
            onChange={handleChange}
            value={formValues.email}
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="password">{t('signup_password_label')}</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={formValues.password}
            required
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">
            {t('signup_confirm_password_label')}
          </label>
          <input
            name="confirmPassword"
            type="password"
            onChange={handleChange}
            value={formValues.confirmPassword}
            required
            autoComplete="off"
          />
        </div>
        <button
          disabled={
            !formValues.email ||
            (!formValues.password &&
              formValues.password === formValues.confirmPassword)
          }
        >
          {t('signup_button')}
        </button>
      </form>
    </div>
  )
}

export default SignUp
