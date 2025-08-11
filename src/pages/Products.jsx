import { useState, useEffect } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'
const backendUrl = import.meta.env.VITE_BACKEND_URL
const Products = () => {
  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/products`)
        setProducts(response.data)
        setFilteredProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchProducts()
  }, [])

  const getSearchResults = (e) => {
    e.preventDefault()
    let results = products

    if (searchQuery.trim()) {
      results = results.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    if (category) {
      results = results.filter((p) => p.category === category)
    }

    setFilteredProducts(results)
    setSearchQuery('')
  }

  return (
    <div>
      <div className="search-bar">
        <form onSubmit={getSearchResults}>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
            <option value="">All Categories</option>
            <option value="smartphones">Smartphones</option>
            <option value="laptops">Laptops</option>
            <option value="tablets">Tablets</option>
            <option value="headphones">Headphones</option>
            <option value="wearables">Wearables</option>
            <option value="gaming">Gaming</option>
            <option value="cameras">Cameras</option>
            <option value="accessories">Accessories</option>
          </select>

          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>

      <div className="products-list">
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  )
}

export default Products
