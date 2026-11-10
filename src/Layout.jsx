import { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router'
import { useAuth } from './context/AuthContext'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useCart } from './store/cartStore'

export default function Layout() {
  const [theme, setTheme] = useLocalStorage('assignment7-theme', 'light')
  const dark = theme === 'dark'

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  }, [dark])

  const { user, dispatch } = useAuth()
  const count = useCart(state =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  )

  return (
    <>
      <nav aria-label="Main navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/cart">Cart ({count})</NavLink>
        {user ? (
          <>
            <span>{user.username}</span>
            <button type="button" onClick={() => dispatch({ type: 'LOGGED_OUT' })}>
              Logout
            </button>
          </>
        ) : <NavLink to="/login">Login</NavLink>}
        <button type="button" onClick={() => setTheme(dark ? 'light' : 'dark')}>
          {dark ? 'Light mode' : 'Dark mode'}
        </button>
      </nav>
      <main><Outlet /></main>
      <footer>Assignment 7</footer>
    </>
  )
}
