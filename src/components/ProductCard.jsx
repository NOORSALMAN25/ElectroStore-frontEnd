import ProductReview from './ProductReview'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
    <>
      <Link to={`/products/${product._id}`}>
        <div className="product-card">
          <h3>{product.name}</h3>
          <img src={product.image} alt={product.name} />
          <p>Category: {product.category}</p>
          <p>Price: ${product.price.toFixed(2)}</p>
        </div>
      </Link>
      <ProductReview />
    </>
  )
}

export default ProductCard
