import { useRef, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
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

const AddProduct = () => {
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
    const res = await axios.post(`${backendUrl}/products`, data)
    nameRef.current.value = ''
    priceRef.current.value = 0
    categoryRef.current.value = ''
    descriptionRef.current.value = ''
    imageRef.current.value = ''
    setAvailability(true)
  }
  return (
    <>
      <section className="booking-container">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            ref={nameRef}
            placeholder="Product Name"
            required
          />
          <input
            type="number"
            ref={priceRef}
            placeholder="Price"
            required
            min="0"
            step="1"
          />
          <select ref={categoryRef} defaultValue={categories[0]} required>
            {categories.map((categorie) => (
              <option key={categorie} value={categorie}>
                {categorie}
              </option>
            ))}
          </select>
          <textarea
            ref={descriptionRef}
            placeholder="Description"
            required
          ></textarea>
          <input type="text" ref={imageRef} placeholder="Image URL" required />
          <label>
            <input
              type="checkbox"
              checked={availability}
              onChange={(e) => setAvailability(e.target.checked)}
            />
            Available
          </label>
          <Link to="/Products">
            <button type="submit">Add Product</button>
          </Link>
        </form>
      </section>
    </>
  )
}

export default AddProduct
