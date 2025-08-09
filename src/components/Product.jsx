const Product = ({ product }) => {
  return (
    <a
      key={product._id}
      href={`/products/${product._id}`}
      className="product-item"
    >
      <h3>{product.name}</h3>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
    </a>
  )
}

export default Product
