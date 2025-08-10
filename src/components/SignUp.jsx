import { useState } from 'react'
import { RegisterUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            placeholder="Enter your name"
            onChange={handleChange}
            value={formValues.name}
            required
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            placeholder="example@example.com"
            onChange={handleChange}
            value={formValues.email}
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
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
          <label htmlFor="confirmPassword">Confirm Password</label>
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
          Sign-up
        </button>
      </form>
    </div>
  )
}

export default SignUp
