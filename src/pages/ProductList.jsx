import { useSearchParams } from 'react-router'
import { fetchProducts } from '../api/productsApi'
import ProductCard from '../components/ProductCard'
import { useFetch } from '../hooks/useFetch'

export default function ProductList() {
  const [params, setParams] = useSearchParams()
  const { loading, error, data } = useFetch(fetchProducts)
  const query = params.get('q') ?? ''
  const category = params.get('category') ?? ''

  function updateFilter(key, value) {
    const next = new URLSearchParams(params)
    if (value) {
      next.set(key, value)
    } else {
      next.delete(key)
    }
    setParams(next, { replace: true })
  }

  if (loading) return <p role="status">Loading products…</p>
  if (error) return <p role="alert">{error.message}</p>

  const categories = [...new Set(data.map(product => product.category))].sort()
  const search = query.trim().toLowerCase()
  const products = data.filter(product =>
    product.title.toLowerCase().includes(search) &&
    (!category || product.category === category)
  )

  return (
    <>
      <h1>Products</h1>
      <label>
        Search products{' '}
        <input value={query} onChange={event => updateFilter('q', event.target.value)} />
      </label>
      {' '}
      <label>
        Category{' '}
        <select value={category} onChange={event => updateFilter('category', event.target.value)}>
          <option value="">All categories</option>
          {category && !categories.includes(category) &&
            <option value={category}>{category}</option>}
          {categories.map(name => <option key={name} value={name}>{name}</option>)}
        </select>
      </label>
      {products.length === 0 ? (
        <p>No matching products.</p>
      ) : (
        <ul className="product-grid">{products.map(product => <ProductCard key={product.id} product={product} />)}</ul>
      )}
    </>
  )
}
