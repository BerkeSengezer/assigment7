import { Link } from 'react-router'

export default function Home() {
  return (
    <section className="shop-welcome">
      <h1>Turkish Bazzaar</h1>
      <p>Find pantry staples, fresh produce, and more in our catalog.</p>
      <Link className="browse-catalog" to="/products">Browse products</Link>
    </section>
  )
}
