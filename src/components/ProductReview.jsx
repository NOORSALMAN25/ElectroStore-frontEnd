import { useState, useEffect } from 'react'
import axios from 'axios'
const ProductReview = ({ productId }) => {
  const [reviews, setReviews] = useState([])
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (productId) return
    setLoading(true)
    setError(null)
    axios
      .get(`http://localhost:3000/products/${productId}/reviews`)
      .then((res) => setReviews(res.data))
      .catch((err) => setError('Failed to load reviews'))
      .finally(() => setLoading(false))
  }, [productId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!comment || rating < 0 || rating > 5) {
      alert('Please fill all fields correctly')
      return
    }

    try {
      setLoading(true)
      setError(null)
      await axios.post(`http://localhost:3000/products/${productId}/reviews`, {
        comment,
        rating: Number(rating)
      })

      const updated = await axios.get(
        `http://localhost:3000/products/${productId}/reviews`
      )
      setReviews(updated.data)
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
      await axios.delete(
        `http://localhost:3000/products/${productId}/reviews/${id}`
      )
      setReviews(reviews.filter((r) => r._id !== id))
    } catch (error) {
      alert('Failed to delete review')
    }
  }

  return (
    <div>
      <h2>Reviews</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!loading && reviews.length === 0 && <p>No reviews yet.</p>}
      <div>
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
            <button onClick={() => handleDelete(rev._id)}>Delete</button>
          </div>
        ))}
      </div>

      <h3>Add Comment</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="rating">Rating (0–5)</label>
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
    </div>
  )
}

export default ProductReview
