import { useState, useEffect } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import Client from '../services/api'
const ProductReview = ({ productId, user, reviews, setReviews }) => {
  const { t, i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // When you fetch reviews (on page load)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!comment || rating < 0 || rating > 5) {
      return
    }

    try {
      setLoading(true)
      setError(null)
      const res = await Client.post(
        `${backendUrl}/products/${productId}/reviews`,
        {
          comment: comment,
          rating: Number(rating),
          user: user.id
        }
      )
      console.log(res)

      let reviewsCopy = [...reviews]
      reviewsCopy.push(res.data)
      setReviews(reviewsCopy)

      setComment('')
      setRating(0)
    } catch (error) {
      setError('Failed to add review')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await Client.delete(`${backendUrl}/products/${productId}/reviews/${id}`)
      setReviews(reviews.filter((r) => r._id !== id))
    } catch (error) {}
  }

  return (
    <div className="review-section">
      <h2>{t('review_add_title')}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="rating">{t('review_rating_label')}</label>
            <input
              id="rating"
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min="0"
              max="5"
              required
            />
          </div>
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={t('review_comment_placeholder')}
          required
          rows={4}
        />

        <button type="submit" disabled={loading}>
          {t('review_submit_button')}
        </button>
      </form>

      <h2>{t('review_list_title')}</h2>
      {loading && <p>{t('review_loading')}</p>}
      {error && (
        <p>
          {t('review_error')}: {error}
        </p>
      )}

      {!loading && reviews.length === 0 && <p>{t('review_no_reviews')}</p>}

      <div className="review-list">
        {reviews.map((rev) => (
          <div key={rev._id}>
            <header>
              <div>
                {Array.from({ length: rev.rating }, (_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
            </header>

            <p>{rev.comment}</p>
            {user && rev.user === user.id && (
              <button onClick={() => handleDelete(rev._id)}>
                {t('review_delete_button')}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductReview
