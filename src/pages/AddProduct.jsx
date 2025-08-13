import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Client from '../services/api'
const backendUrl = import.meta.env.VITE_BACKEND_URL

const categories = [
  'smartphones',
  'laptops',
  'tablets',
  'headphones',
  'wearables',
  'gaming',
  'cameras',
  'accessories'
]

const initialFormValues = {
  name: '',
  price: 0,
  category: categories[0],
  description: '',
  image: '',
  availability: true
}

const AddProduct = () => {
  const navigate = useNavigate()
  const nameRef = useRef(null)
  const priceRef = useRef(null)
  const categoryRef = useRef(null)
  const descriptionRef = useRef(null)
  const imageRef = useRef(null)
  const [availability, setAvailability] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      name: nameRef.current.value,
      price: priceRef.current.value,
      category: categoryRef.current.value,
      description: descriptionRef.current.value,
      image: imageRef.current.value,
      availability: availability
    }
    const res = await Client.post(`${backendUrl}/products`, data)

    nameRef.current.value = ''
    priceRef.current.value = 0
    categoryRef.current.value = ''
    descriptionRef.current.value = ''
    imageRef.current.value = ''
    setAvailability(true)
    navigate('/products')
  }
  return (
    <>
      <section className="booking-container">
        <h1 className="h1-edit-title">Add New Product</h1>
        <form onSubmit={handleSubmit} className="add-product-form">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            ref={nameRef}
            placeholder="Product Name"
            required
          />

          <label htmlFor="price">Price</label>
          <input
            type="number"
            ref={priceRef}
            placeholder="Price"
            required
            min="0"
            step="1"
          />

          <label htmlFor="category">Category</label>
          <select ref={categoryRef} defaultValue={categories[0]} required>
            {categories.map((categorie) => (
              <option key={categorie} value={categorie}>
                {categorie}
              </option>
            ))}
          </select>

          <label htmlFor="description">Description</label>
          <textarea
            ref={descriptionRef}
            placeholder="Description"
            required
          ></textarea>

          <label htmlFor="image">Image URL</label>
          <input type="text" ref={imageRef} placeholder="Image URL" required />

          <label className="availability-label" htmlFor="availability">
            <input
              type="checkbox"
              checked={availability}
              onChange={(e) => setAvailability(e.target.checked)}
            />
            Available
          </label>
          <button type="submit" className="add-button">
            Add Product
          </button>
        </form>
      </section>
    </>
  )
}

export default AddProduct
