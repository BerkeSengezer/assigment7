import { Link } from 'react-router'

export default function ProductCard({ product }) {
  return (
    <li>
      <img src={product.thumbnail} alt="" width="80" height="80" />
      <Link to={`/products/${product.id}`}>{product.title}</Link>
      {' · '}${product.price.toFixed(2)}
    </li>
  )
}
