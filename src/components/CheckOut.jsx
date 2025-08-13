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
    <div className="checkout-container">
      <div className="checkout-card">
        <div className="checkout-header">
          <h1 className="checkout-title">Checkout</h1>
          <p className="checkout-subtitle">Complete your order details below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-section">
            <label className="form-label">Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              className="form-input"
            />
          </div>

          <div className="form-section">
            <h2 className="section-title">Payment Method</h2>
            <div className="payment-container">
              <div className="payment-option">
                <input
                  type="radio"
                  id="cash"
                  name="payment"
                  value="Cash"
                  required
                  className="payment-radio"
                />
                <label htmlFor="cash" className="payment-label">
                  <span className="payment-badge">💵</span>
                  Cash on Delivery
                </label>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">Delivery Address</h2>

            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label-medium">Building Number</label>
                <input
                  name="building"
                  type="text"
                  placeholder="e.g. 123"
                  className="form-input"
                />
              </div>

              <div className="address-grid">
                <div className="form-group">
                  <label className="form-label-medium">Road No.</label>
                  <input
                    name="road"
                    type="text"
                    placeholder="e.g. 45"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label-medium">Block No.</label>
                  <input
                    name="block"
                    type="text"
                    placeholder="e.g. 7A"
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>

        <div className="security-notice">
          <p className="security-text">
            <span className="security-icon">🔒</span>
            Your information is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  )
}

export default CheckOut
