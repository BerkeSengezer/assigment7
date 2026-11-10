import { BrowserRouter, Link, NavLink, Outlet, Route, Routes } from 'react-router'
import './App.css'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'

function Layout() {
  return (
    <>
      <nav aria-label="Main navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        <NavLink to="/login">Login</NavLink>
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
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<h1>Shop</h1>} />
          <Route path="products">
            <Route index element={<ProductList />} />
            <Route path=":id" element={<ProductDetail />} />
          </Route>
          <Route path="cart" element={<h1>Cart</h1>} />
          <Route path="login" element={<h1>Login</h1>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
