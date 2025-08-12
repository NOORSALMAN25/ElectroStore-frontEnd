import { useState, useEffect } from 'react'
import axios from 'axios'
const ProductReview = ({ productId, user, reviews, setReviews }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // When you fetch reviews (on page load)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!comment || rating < 0 || rating > 5) {
      alert('Please fill all fields correctly')
      return
    }

    try {
      setLoading(true)
      setError(null)
      await axios.post(`${backendUrl}/products/${productId}/reviews`, {
        comment: comment,
        rating: Number(rating),
        user: user.id
      })

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
      await axios.delete(`${backendUrl}/products/${productId}/reviews/${id}`)
      setReviews(reviews.filter((r) => r._id !== id))
    } catch (error) {
      alert('Failed to delete review')
    }
  }

  return (
    <div className="review-section">
      <h2>Add Review </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="rating">Rating </label>
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
          placeholder="Comment"
          required
          rows={4}
        />

        <button type="submit" disabled={loading}>
          Submit
        </button>
      </form>
      <h2>Reviews</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!loading && reviews.length === 0 && <p>No reviews yet.</p>}
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
              <button onClick={() => handleDelete(rev._id)}>Delete</button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductReview
