import { useState } from 'react'
import { SignInUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const Login = ({ setUser }) => {
  let navigate = useNavigate
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
    navigate('/products')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <button disabled={!formValues.email || !formValues.password}>
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
