import { BrowserRouter, Link, NavLink, Outlet, Route, Routes } from 'react-router'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider, useAuth } from './context/AuthContext'
import Cart from './pages/Cart'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import ProductList from './pages/ProductList'
import { useCart } from './store/cartStore'
import { useEffect } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import './App.css'
import './theme.css'

function Layout() {
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

function NotFound() {
  return (
    <>
      <h1>Page not found</h1>
      <Link to="/">Back to home</Link>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<h1>Turkish Bazzaar</h1>} />
            <Route path="products">
              <Route index element={<ProductList />} />
              <Route path=":id" element={<ProductDetail />} />
            </Route>
            <Route path="cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
