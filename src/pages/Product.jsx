import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Client from '../services/api'

import ProductReview from '../components/ProductReview'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
const backendUrl = import.meta.env.VITE_BACKEND_URL

const Product = ({ user }) => {
  const { t, i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }
  const navigate = useNavigate()
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await Client.get(`${backendUrl}/products/${productId}`)
        setProduct(response.data)
        const res = await Client.get(
          `${backendUrl}/products/${productId}/reviews`
        )
        setReviews(res.data)
      } catch (error) {
        console.error('Error in fetching one product:', error)
      }
    }
    fetchProduct()
  }, [])

  // adding a product work in all cases
  const addToCart = async () => {
    if (!user) {
      navigate('/login')
      return
    }
    try {
      const ordersResponse = await Client.get(`${backendUrl}/orders`) // tested

      const userOngoingOrders = ordersResponse.data.filter(
        (order) => order.user === user.id && order.status === 'ongoing'
      )

      const userOngoingOrder =
        userOngoingOrders.length > 0 ? userOngoingOrders[0] : null

      if (userOngoingOrder) {
        const existingItem = userOngoingOrder.items.find(
          (item) => item.product === productId
        ) // tested

        if (existingItem) {
          const updatedItems = userOngoingOrder.items.map((item) =>
            item.product === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ) //tested

          const newTotal = updatedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ) //tested

          await Client.put(`${backendUrl}/orders/${userOngoingOrder._id}`, {
            ...userOngoingOrder,
            items: updatedItems,
            total: newTotal
          }) // tested
        } else {
          const newItem = {
            product: productId,
            name: product.name,
            quantity: 1,
            price: product.price,
            image: product.image
          }

          const updatedItems = [...userOngoingOrder.items, newItem]
          const newTotal = updatedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          )

          await Client.put(`${backendUrl}/orders/${userOngoingOrder._id}`, {
            ...userOngoingOrder,
            items: updatedItems,
            total: newTotal
          })
        }
      } else {
        const newOrder = {
          total: product.price,
          items: [
            {
              product: productId,
              name: product.name,
              quantity: 1,
              price: product.price,
              image: product.imag
            }
          ],
          user: user.id,
          status: 'ongoing'
        }
        await Client.post(`${backendUrl}/orders`, newOrder)
      }

      navigate('/cart')
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  const handleDelete = async () => {
    try {
      await Client.delete(`${backendUrl}/products/${productId}`, product)
      navigate('/products')
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }

  const buttons_auth = () => {
    return (
      <>
        {user && user.role === 'admin' ? (
          <>
            <Link to={`/Products/${productId}/EditProduct`}>
              <button className="Edit-button">
                {t('product_edit_button')}
              </button>
            </Link>
            <button className="Delete-button" onClick={handleDelete}>
              {t('product_delete_button')}
            </button>
          </>
        ) : (
          <>
            <button
              className="Add-to-Cart-button"
              onClick={addToCart}
              disabled={!product.availability}
            >
              {t('product_add_to_cart')}
            </button>
            {!product.availability && (
              <p style={{ color: 'red', marginTop: '5px' }}>
                {' '}
                {t('product_out_of_stock')}
              </p>
            )}
          </>
        )}
      </>
    )
  }

  return (
    <div className="one-product-box">
      <h1 className="h1-Product-Details">{t('product_details_title')}</h1>{' '}
      <br />
      {product ? (
        <div className="one-product-in-a-page">
          <img src={product.image} alt={product.name} />
          <div className="product-details">
            <h2>{product.name}</h2>
            <h3>
              {t('product_price')}: ${product.price}
            </h3>
            <p>
              {t('product_category')}: {product.category}
            </p>
            <p>{product.description}</p>
            <p>{buttons_auth(product.availability)}</p>
          </div>
        </div>
      ) : (
        <div className="wait-message">
          <h1>{t('wait_message')}</h1>
        </div>
      )}
      <div>
        <ProductReview
          setReviews={setReviews}
          reviews={reviews}
          productId={productId}
          user={user}
        />
      </div>
    </div>
  )
}

export default Product
