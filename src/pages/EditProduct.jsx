import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Client from '../services/api'

const backendUrl = import.meta.env.VITE_BACKEND_URL

const EditProduct = () => {
  const { productId } = useParams()
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: ''
  })

  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await Client.get(`${backendUrl}/products/${productId}`)
        setProduct(response.data)
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }
    fetchProduct()
  }, [productId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await Client.put(`${backendUrl}/products/${productId}`, product)
      setUpdated(true)
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }

  return (
    <>
      <h1 className="h1-edit-title">Edit Product</h1>
      <form className="edit-product-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <label htmlFor="image">Image URL</label>
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
        />
        <label className="availability-label" htmlFor="availability">
          <input
            type="checkbox"
            name="availability"
            checked={product.availability}
            onChange={(e) =>
              setProduct({ ...product, availability: e.target.checked })
            }
          />
          Available
        </label>
        <button type="submit" className="update-button">
          Update Product
        </button>
        {updated && (
          <Link to={`/Products/${productId}`}>
            <button type="submit" className="details-button">
              Go to Product Details
            </button>
          </Link>
        )}
      </form>
    </>
  )
}

export default EditProduct
