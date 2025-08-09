import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const backendUrl = import.meta.env.VITE_BACKEND_URL

const Product = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${backendUrl}/products/${id}`)
        setProduct(response.data)
      } catch (error) {
        console.error('Error in fetching one product:', error)
      }
    }
    fetchProduct()
  }, [id, backendUrl])

  return (
    <div className="">
      {product ? (
        <div className="one-product-in-a-page">
          <h2>{product.name}</h2>
          <img src={product.image} alt={product.name} />
          <h3>Price: ${product.price}</h3>
          <p>Category: {product.category}</p>
          <p>{product.description}</p>
        </div>
      ) : (
        <div className="">
          <h1> Wait a second ... </h1>
        </div>
      )}
    </div>
  )
}

export default Product
