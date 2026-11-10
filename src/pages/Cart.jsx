import { Link } from 'react-router'
import { useCart } from '../store/cartStore'

export default function Cart() {
  const items = useCart(state => state.items)
  const setQuantity = useCart(state => state.setQuantity)
  const removeItem = useCart(state => state.removeItem)
  const clear = useCart(state => state.clear)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <>
      <h1>Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty. <Link to="/products">Browse products</Link></p>
      ) : (
        <>
          <ul>
            {items.map(item => (
              <li key={item.id}>
                {item.title} · ${item.price.toFixed(2)} ·{' '}
                <button type="button" aria-label={`Decrease quantity of ${item.title}`}
                  onClick={() => setQuantity(item.id, item.quantity - 1)}>−</button>
                {' '}{item.quantity}{' '}
                <button type="button" aria-label={`Increase quantity of ${item.title}`}
                  onClick={() => setQuantity(item.id, item.quantity + 1)}>+</button>
                {' '}
                <button type="button" onClick={() => removeItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <p>Total: ${total.toFixed(2)}</p>
          <button type="button" onClick={clear}>Clear cart</button>
        </>
      )}
    </>
  )
}
