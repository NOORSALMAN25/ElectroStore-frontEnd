import emailjs from 'emailjs-com'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const CheckOut = () => {
  const { t, i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }
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
      })
  }

  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <div className="checkout-header">
          <h1 className="checkout-title">{t('checkout_title')}</h1>
          <p className="checkout-subtitle">{t('checkout_subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-section">
            <label className="form-label">{t('checkout_email_label')}</label>
            <input
              name="email"
              type="email"
              placeholder={t('checkout_email_placeholder')}
              required
              className="form-input"
            />
          </div>

          <div className="form-section">
            <h2 className="section-title">
              {t('checkout_payment_method_title')}
            </h2>
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
                  {t('checkout_payment_cash')}
                </label>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">
              {t('checkout_delivery_address_title')}
            </h2>

            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label-medium">
                  {t('checkout_building_label')}
                </label>
                <input
                  name="building"
                  type="text"
                  placeholder={t('checkout_building_placeholder')}
                  className="form-input"
                />
              </div>

              <div className="address-grid">
                <div className="form-group">
                  <label className="form-label-medium">
                    {t('checkout_road_label')}
                  </label>
                  <input
                    name="road"
                    type="text"
                    placeholder={t('checkout_road_placeholder')}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label-medium">
                    {t('checkout_block_label')}
                  </label>
                  <input
                    name="block"
                    type="text"
                    placeholder={t('checkout_block_placeholder')}
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="submit-button">
            {t('checkout_submit_button')}
          </button>
        </form>

        <div className="security-notice">
          <p className="security-text">
            <span className="security-icon">🔒</span>
            {t('checkout_security_text')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CheckOut
