import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router'
import { fetchProduct } from '../api/productsApi'
import { useFetch } from '../hooks/useFetch'

function ProductDetails({ id }) {
  const navigate = useNavigate()
  const inputs = useMemo(() => [id], [id])
  const { loading, error, data: product } = useFetch(fetchProduct, inputs)

  return (
    <>
      <button type="button" onClick={() => navigate('/products')}>Back to products</button>
      {loading && <p role="status">Loading product…</p>}
      {error && <p role="alert">{error.message}</p>}
      {product && (
        <article>
          <h1>{product.title}</h1>
          <img src={product.thumbnail} alt={product.title} width="240" />
          <p>{product.description}</p>
          <p>Category: {product.category}</p>
          <p>Price: ${product.price.toFixed(2)}</p>
        </article>
      )}
    </>
  )
}

export default function ProductDetail() {
  const { id } = useParams()
  return <ProductDetails key={id} id={id} />
}
