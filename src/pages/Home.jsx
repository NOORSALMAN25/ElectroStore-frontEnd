import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Home = ({ user }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const images = [
    '/images/1poster.png',
    '/images/2poster.png',
    '/images/3poster.png',
    '/images/4poster.png'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [images.length])

  let navigate = useNavigate()
  return (
    <>
      {user ? (
        <div className="homepage-container">
          <div className="welcome-section">
            <h2 className="welcome-title">
              Welcome, <span className="username">{user.name}!</span>
            </h2>
            <p className="welcome-description">
              Ready to explore our latest electronics collection?
            </p>
          </div>

          <div className="hero-section">
            <h1 className="hero-title">Premium Electronics Store</h1>
            <p className="hero-description">
              Discover cutting-edge technology and innovative electronics with
              fast delivery and premium quality
            </p>
          </div>

          <div className="slideshow-container">
            <div className="slideshow-wrapper">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`slide ${
                    index === currentSlide ? 'slide-active' : 'slide-inactive'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Product poster ${index + 1}`}
                    className="slide-image"
                  />
                  <div className="slide-overlay"></div>
                </div>
              ))}
            </div>

            <div className="slide-indicators">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`indicator ${
                    index === currentSlide
                      ? 'indicator-active'
                      : 'indicator-inactive'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="info-section">
            <p className="info-title">
              Join thousands of tech enthusiasts worldwide
            </p>
            <div className="features-list">
              <div className="feature-item">
                <div className="feature-dot feature-dot-blue"></div>
                <span>Free Shipping</span>
              </div>
              <div className="feature-item">
                <div className="feature-dot feature-dot-orange"></div>
                <span>1 Year Warranty</span>
              </div>
              <div className="feature-item">
                <div className="feature-dot feature-dot-blue-dark"></div>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="homepage-container">
          <div className="cta-section">
            <button
              onClick={() => navigate('/signup')}
              className="signup-button"
            >
              <span className="signup-button-text">
                Sign Up to Start Shopping
              </span>
              <div className="signup-button-blur"></div>
            </button>

            <p className="cta-description">
              Create your account and explore our electronics collection
            </p>
          </div>

          <div className="hero-section">
            <h1 className="hero-title">Premium Electronics Store</h1>
            <p className="hero-description">
              Discover cutting-edge technology and innovative electronics with
              fast delivery and premium quality
            </p>
          </div>

          <div className="slideshow-container">
            <div className="slideshow-wrapper">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`slide ${
                    index === currentSlide ? 'slide-active' : 'slide-inactive'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Product poster ${index + 1}`}
                    className="slide-image"
                  />
                  <div className="slide-overlay"></div>
                </div>
              ))}
            </div>

            <div className="slide-indicators">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`indicator ${
                    index === currentSlide
                      ? 'indicator-active'
                      : 'indicator-inactive'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="info-section">
            <p className="info-title">
              Join thousands of tech enthusiasts worldwide
            </p>
            <div className="features-list">
              <div className="feature-item">
                <div className="feature-dot feature-dot-blue"></div>
                <span>Free Shipping</span>
              </div>
              <div className="feature-item">
                <div className="feature-dot feature-dot-orange"></div>
                <span>1 Year Warranty</span>
              </div>
              <div className="feature-item">
                <div className="feature-dot feature-dot-blue-dark"></div>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Home
