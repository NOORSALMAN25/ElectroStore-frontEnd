import emailjs from 'emailjs-com'
import { useNavigate } from 'react-router-dom'

const CheckOut = () => {
  let navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()

    const userEmail = e.target.email.value
    const building = e.target.building.value
    const road = e.target.road.value
    const block = e.target.block.value

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_email: userEmail,
          building,
          road,
          block
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        navigate('/')
      })
      .catch((error) => {
        console.error('Error sending email:', error)
        alert('Failed to send confirmation email.')
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Your Email:</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <h2>Payment</h2>
          <input type="radio" id="cash" name="payment" value="Cash" required />
          <label htmlFor="cash">Cash</label>
        </div>

        <h2>Address:</h2>
        <div>
          <label>Building No:</label>
          <input name="building" type="text" placeholder="Building Number" />
        </div>
        <div>
          <label>Road No:</label>
          <input name="road" type="text" placeholder="Road Number" />
        </div>
        <div>
          <label>Block No:</label>
          <input name="block" type="text" placeholder="Block Number" />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CheckOut
